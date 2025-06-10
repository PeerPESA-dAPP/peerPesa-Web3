import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Example API call to external service
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      data: data.rates 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quote_coin } = body;
    
    // Your API logic here
    const mockRates = [
      { symbol: 'CELO', price: { amount: '0.05' } },
      { symbol: 'USDT', price: { amount: '1.00' } }
    ];
    
    return NextResponse.json({ 
      success: true, 
      data: mockRates 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
} 