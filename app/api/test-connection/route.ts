import DexPay, { DexPayError } from "@dexchangepay/node";
import { NextResponse } from "next/server";

const dexpay = new DexPay({
  apiKey:
    process.env.DEXPAY_API_KEY || process.env.NEXT_PUBLIC_DEXPAY_API_KEY || "",
  apiSecret:
    process.env.DEXPAY_API_SECRET ||
    process.env.NEXT_PUBLIC_DEXPAY_API_SECRET ||
    "",
  sandbox: process.env.NODE_ENV !== "production",
});

export async function GET() {
  try {
    const apiKey =
      process.env.DEXPAY_API_KEY || process.env.NEXT_PUBLIC_DEXPAY_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "API Key non configurée",
      });
    }

    console.log("🔑 API Key présente:", `${apiKey.substring(0, 10)}...`);

    // Utilisation du SDK DexPay pour lister les sessions
    const sessions = await dexpay.checkoutSessions.list({
      page: 1,
      limit: 10,
    });

    console.log("📥 Sessions récupérées:", sessions);

    return NextResponse.json({
      success: true,
      status: 200,
      data: sessions,
      apiKeyPrefix: apiKey.substring(0, 10),
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);

    // Gestion spécifique des erreurs DexPay
    if (error instanceof DexPayError) {
      console.error("Erreur DexPay:", {
        message: error.message,
        statusCode: error.statusCode,
        code: error.code,
      });

      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        statusCode: error.statusCode,
      });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
