import { createHmac } from "node:crypto";
import { DexPayError } from "@dexchangepay/node";
import { type NextRequest, NextResponse } from "next/server";

interface WebhookCustomer {
  name: string;
  phone: string;
  email: string;
}

interface WebhookPayload {
  event: string;
  reference: string;
  checkout_session_id: string;
  transaction_id: string;
  status: string;
  amount: number;
  currency: string;
  payment_url?: string;
  payment_attempt_id?: string;
  operator?: string;
  payment_method?: string;
  customer?: WebhookCustomer;
  error_message?: string;
  cancellation_reason?: string;
  timestamp: string;
  metadata: {
    order_id?: string;
    user_email?: string;
  };
}

function verifyWebhookSignature(
  payload: WebhookPayload,
  signature: string,
  secret: string,
): boolean {
  const hmac = createHmac("sha256", secret);
  hmac.update(JSON.stringify(payload));
  const expectedSignature = hmac.digest("hex");
  return signature === expectedSignature;
}

async function processWebhook(event: string, payload: WebhookPayload) {
  switch (event) {
    case "checkout.completed":
      console.log("✅ Paiement complété:", payload.reference);
      console.log("Détails:", {
        amount: payload.amount,
        currency: payload.currency,
        operator: payload.operator,
        payment_method: payload.payment_method,
        customer: payload.customer,
      });
      // TODO: Mettre à jour la base de données, envoyer email de confirmation, etc.
      break;

    case "checkout.failed":
      console.log("❌ Paiement échoué:", payload.reference);
      console.log("Erreur:", payload.error_message);
      // TODO: Logger l'échec, notifier l'utilisateur, etc.
      break;

    case "checkout.cancelled":
      console.log("🚫 Paiement annulé:", payload.reference);
      console.log("Raison:", payload.cancellation_reason);
      // TODO: Restaurer le stock, notifier l'utilisateur, etc.
      break;

    case "checkout.initiated":
      console.log("🔄 Transaction initiée:", payload.reference);
      console.log("URL de paiement:", payload.payment_url);
      // TODO: Logger l'initialisation, préparer le suivi, etc.
      break;

    default:
      console.log("ℹ️ Événement non géré:", event);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WebhookPayload;

    // Récupérer les headers du webhook
    const signature = request.headers.get("x-webhook-signature");
    const event = request.headers.get("x-webhook-event");
    const timestamp = request.headers.get("x-webhook-timestamp");

    console.log("🔔 Webhook reçu:", {
      event,
      timestamp,
      receivedAt: new Date().toISOString(),
    });

    // Vérifier la signature
    const secret =
      process.env.DEXPAY_API_SECRET ||
      process.env.NEXT_PUBLIC_DEXPAY_API_SECRET ||
      "";

    if (!secret) {
      console.error("❌ Secret webhook non configuré");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 },
      );
    }

    if (!signature || !verifyWebhookSignature(body, signature, secret)) {
      console.error("❌ Signature webhook invalide");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Répondre rapidement pour éviter les timeouts
    const response = NextResponse.json({ received: true }, { status: 200 });

    // Traiter en arrière-plan
    if (event) {
      processWebhook(event, body).catch((error) => {
        console.error("❌ Erreur traitement webhook async:", error);

        // Gestion spécifique des erreurs DexPay
        if (error instanceof DexPayError) {
          console.error("Erreur DexPay webhook:", {
            message: error.message,
            statusCode: error.statusCode,
            code: error.code,
          });
        }
      });
    }

    return response;
  } catch (error) {
    console.error("❌ Erreur webhook:", error);

    // Gestion spécifique des erreurs DexPay
    if (error instanceof DexPayError) {
      console.error("Erreur DexPay webhook:", {
        message: error.message,
        statusCode: error.statusCode,
        code: error.code,
      });

      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Erreur traitement webhook" },
      { status: 500 },
    );
  }
}
