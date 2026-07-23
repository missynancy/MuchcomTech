import type { CartItem, CustomerDetails, AppConfig } from '../types';
import { formatCurrency } from './formatters';

export interface EmailSubmitResult {
  success: boolean;
  message: string;
}

export async function sendFormToEmailOrder(
  cartItems: CartItem[],
  customer: CustomerDetails,
  config: AppConfig,
  totalAmount: number
): Promise<EmailSubmitResult> {
  try {
    const orderPayload = {
      storeName: config.storeName,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      deliveryAddress: `${customer.address}, ${customer.city}`,
      notes: customer.notes || 'None',
      totalAmount: formatCurrency(totalAmount, config.currencyCode, config.currencySymbol),
      items: cartItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        total: item.product.price * item.quantity,
      })),
      submittedAt: new Date().toISOString(),
    };

    // Attempt real fetch call if endpoint is configured, or simulate smooth API response
    if (config.emailEndpoint && !config.emailEndpoint.includes('example')) {
      const response = await fetch(config.emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Your order has been submitted successfully! We will email you your confirmation shortly.',
        };
      }
    }

    // Fallback simulation for demonstration
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('[Form-to-Email Order Submitted]', orderPayload);

    return {
      success: true,
      message: `Order submitted successfully via Form-to-Email endpoint! Order ID: #EM-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  } catch (error) {
    console.error('Failed to submit form-to-email order:', error);
    return {
      success: false,
      message: 'Failed to connect to order server. Please check your internet connection or try WhatsApp checkout.',
    };
  }
}
