import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock withdrawal history - replace with actual database query
    const mockHistory = [
      {
        id: 'WD123456789',
        amount: '100.00',
        currency: 'CELO',
        recipientAddress: '0x1234...5678',
        paymentMethod: 'bank-transfer',
        status: 'completed',
        timestamp: '2024-01-15T10:30:00Z',
      },
      {
        id: 'WD987654321',
        amount: '50.00',
        currency: 'USDT',
        recipientAddress: '0x8765...4321',
        paymentMethod: 'mobile-money',
        status: 'pending',
        timestamp: '2024-01-14T15:45:00Z',
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockHistory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch withdrawal history' },
      { status: 500 }
    );
  }
} 