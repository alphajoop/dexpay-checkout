import DexPay, {
  type CreateCheckoutSessionParams,
  DexPayError,
} from "@dexchangepay/node";
import { type NextRequest, NextResponse } from "next/server";

const dexpay = new DexPay({
  apiKey:
    process.env.DEXPAY_API_KEY || process.env.NEXT_PUBLIC_DEXPAY_API_KEY || "",
  apiSecret:
    process.env.DEXPAY_API_SECRET ||
    process.env.NEXT_PUBLIC_DEXPAY_API_SECRET ||
    "",
  sandbox: process.env.NODE_ENV !== "production",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données
    if (!body.reference || !body.item_name || !body.amount || !body.currency) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 },
      );
    }

    // Construction de l'URL de base
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutData: CreateCheckoutSessionParams = {
      reference: body.reference,
      item_name: body.item_name,
      amount: Number(body.amount),
      currency: body.currency,
      success_url: `${baseUrl}/success`,
      failure_url: `${baseUrl}/failure`,
      webhook_url: `${baseUrl}/api/webhook`,
      metadata: {
        order_id: body.reference,
        user_email: body.metadata?.customer_email || body.customer?.email,
      },
    };

    console.log("🚀 Création checkout session avec SDK:", checkoutData);

    // Utilisation du SDK DexPay
    const session = await dexpay.checkoutSessions.create(checkoutData);

    console.log("📥 Réponse SDK:", session);

    // En mode sandbox, utiliser sandbox_payment_url
    const paymentUrl =
      session.data?.sandbox_payment_url || session.data?.payment_url;

    return NextResponse.json({
      payment_url: paymentUrl,
      reference: session.data?.reference,
      session,
    });
  } catch (error) {
    console.error("❌ Erreur SDK checkout:", error);

    // Gestion spécifique des erreurs DexPay
    if (error instanceof DexPayError) {
      console.error("Erreur DexPay:", {
        message: error.message,
        statusCode: error.statusCode,
        code: error.code,
      });

      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          statusCode: error.statusCode,
        },
        { status: error.statusCode },
      );
    }

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
