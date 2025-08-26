import api from './api';

export interface PaymentIntent {
  paymentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface PaymentStatus {
  id: string;
  status: string;
  amount: number;
  currency: string;
  provider: string;
  createdAt: string;
  confirmedAt?: string;
  orderId: string;
}

export interface PaymentService {
  createPaymentIntent: (orderId: string, provider?: string) => Promise<PaymentIntent>;
  confirmPayment: (paymentId: string) => Promise<{ success: boolean; status: string; transactionId: string }>;
  getPaymentStatus: (paymentId: string) => Promise<PaymentStatus>;
}

class PaymentServiceImpl implements PaymentService {
  async createPaymentIntent(orderId: string, provider: string = 'stripe'): Promise<PaymentIntent> {
    const response = await api.post('/payments/create-intent', {
      orderId,
      provider
    });

    const data = response.data as any;
    if (!data.success) {
      throw new Error(data.message || 'Feil ved opprettelse av betaling');
    }

    return data.data;
  }

  async confirmPayment(paymentId: string): Promise<{ success: boolean; status: string; transactionId: string }> {
    const response = await api.post(`/payments/${paymentId}/confirm`, {});

    const data = response.data as any;
    if (!data.success && !data.data) {
      throw new Error(data.message || 'Feil ved bekreftelse av betaling');
    }

    return {
      success: data.success,
      status: data.data?.status,
      transactionId: data.data?.transactionId
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const response = await api.get(`/payments/${paymentId}/status`);

    const data = response.data as any;
    if (!data.success) {
      throw new Error(data.message || 'Feil ved henting av betalingsstatus');
    }

    return data.data;
  }
}

export const paymentService = new PaymentServiceImpl();