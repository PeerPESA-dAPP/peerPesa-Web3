import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const currency = searchParams.get('currency');

    if (!currency) {
      return NextResponse.json(
        { success: false, error: 'Currency parameter is required' },
        { status: 400 }
      );
    }

    // Mock fee structure - replace with actual fee calculation
    const fees: Record<string, any> = {
      'CELO': {
        network_fee: '0.01',
        processing_fee: '0.005',
        total_fee: '0.015',
        min_amount: '10.00',
        max_amount: '10000.00',
      },
      'USDT': {
        network_fee: '0.02',
        processing_fee: '0.01',
        total_fee: '0.03',
        min_amount: '5.00',
        max_amount: '50000.00',
      },
      'USDC': {
        network_fee: '0.02',
        processing_fee: '0.01',
        total_fee: '0.03',
        min_amount: '5.00',
        max_amount: '50000.00',
      },
    };

    const feeData = fees[currency.toUpperCase()] || {
      network_fee: '0.01',
      processing_fee: '0.005',
      total_fee: '0.015',
      min_amount: '10.00',
      max_amount: '10000.00',
    };

    return NextResponse.json({
      success: true,
      data: {
        currency: currency.toUpperCase(),
        ...feeData,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch withdrawal fees' },
      { status: 500 }
    );
  }
} 