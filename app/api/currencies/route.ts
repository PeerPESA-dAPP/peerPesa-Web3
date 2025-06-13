import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock currency data - replace with actual API call
    const currencies = [
      {
        id: "usdt",
        name: "Tether",
        symbol: "USDT",
        balance: "350.75",
        fiatValue: "$350.75",
        icon: "/uploads/tether-usdt-logo.png",
        color: "#26A17B"
      },
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        balance: "425.50",
        fiatValue: "$425.50",
        icon: "/uploads/usd-coin-usdc-logo.png",
        color: "#2775CA"
      },
      {
        id: "cusd",
        name: "Celo Dollar",
        symbol: "cUSD",
        balance: "210.25",
        fiatValue: "$210.25",
        icon: "/uploads/cusd-logo.png",
        color: "#35D07F"
      },
      {
        id: "celo",
        name: "Celo",
        symbol: "CELO",
        balance: "45.75",
        fiatValue: "$68.63",
        icon: "/uploads/celo-celo-logo.png",
        color: "#FBCC5C"
      }
    ];

    return NextResponse.json({
      success: true,
      data: currencies
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch currencies' },
      { status: 500 }
    );
  }
} 