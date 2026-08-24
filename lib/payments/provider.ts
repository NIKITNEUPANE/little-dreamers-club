export interface PaymentResult {
  success: boolean;
  transactionId: string;
  paymentStatus: 'Paid' | 'Pending' | 'COD' | 'Failed' | 'Refunded';
  message: string;
  gatewayResponse?: any;
}

export interface PaymentProvider {
  id: string;
  name: string;
  description: string;
  iconName?: string;
  createPayment(params: {
    orderNumber: string;
    amount: number;
    currency: string;
    customerEmail: string;
    customerPhone?: string;
    metadata?: Record<string, any>;
  }): Promise<PaymentResult>;

  verifyPayment(transactionId: string): Promise<PaymentResult>;
  refundPayment(transactionId: string, amount: number): Promise<PaymentResult>;
}

export class CashOnDeliveryProvider implements PaymentProvider {
  id = 'cod';
  name = 'Cash on Delivery';
  description = 'Pay with cash or local QR on receipt of your package.';

  async createPayment(params: {
    orderNumber: string;
    amount: number;
    currency: string;
  }): Promise<PaymentResult> {
    return {
      success: true,
      transactionId: `COD-${params.orderNumber}`,
      paymentStatus: 'COD',
      message: 'Order placed with Cash on Delivery.',
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentResult> {
    return {
      success: true,
      transactionId,
      paymentStatus: 'COD',
      message: 'Cash on delivery verified upon courier delivery.',
    };
  }

  async refundPayment(transactionId: string, amount: number): Promise<PaymentResult> {
    return {
      success: true,
      transactionId,
      paymentStatus: 'Refunded',
      message: `Cash refund of ${amount} initiated.`,
    };
  }
}

export class MockOnlineCardProvider implements PaymentProvider {
  id = 'card';
  name = 'Credit / Debit Card';
  description = 'Instant secure payment via Visa, Mastercard, AMEX.';

  async createPayment(params: {
    orderNumber: string;
    amount: number;
    currency: string;
    customerEmail: string;
  }): Promise<PaymentResult> {
    // In production, this interacts securely with Stripe or Payment Gateway server API
    return {
      success: true,
      transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      paymentStatus: 'Paid',
      message: 'Payment authorized and captured successfully.',
      gatewayResponse: {
        last4: '4242',
        brand: 'visa',
      },
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentResult> {
    return {
      success: true,
      transactionId,
      paymentStatus: 'Paid',
      message: 'Card payment verified with gateway.',
    };
  }

  async refundPayment(transactionId: string, amount: number): Promise<PaymentResult> {
    return {
      success: true,
      transactionId,
      paymentStatus: 'Refunded',
      message: `Refund of Rs. ${amount} processed.`,
    };
  }
}

export class DigitalWalletProvider implements PaymentProvider {
  id = 'digital_wallet';
  name = 'Digital Wallet (eSewa / Khalti / Fonepay)';
  description = 'Seamless 1-click checkout with your preferred digital wallet.';

  async createPayment(params: {
    orderNumber: string;
    amount: number;
    currency: string;
  }): Promise<PaymentResult> {
    return {
      success: true,
      transactionId: `WAL-${Date.now()}`,
      paymentStatus: 'Paid',
      message: 'Wallet transaction authorized.',
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentResult> {
    return {
      success: true,
      transactionId,
      paymentStatus: 'Paid',
      message: 'Wallet verified.',
    };
  }

  async refundPayment(transactionId: string, amount: number): Promise<PaymentResult> {
    return {
      success: true,
      transactionId,
      paymentStatus: 'Refunded',
      message: `Wallet refund of ${amount} completed.`,
    };
  }
}

export const paymentProviders: Record<string, PaymentProvider> = {
  cod: new CashOnDeliveryProvider(),
  card: new MockOnlineCardProvider(),
  digital_wallet: new DigitalWalletProvider(),
};

export function getPaymentProvider(providerId: string): PaymentProvider {
  return paymentProviders[providerId] || paymentProviders.cod;
}
