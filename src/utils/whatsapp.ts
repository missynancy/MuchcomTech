import type { CartItem, CustomerDetails, AppConfig } from '../types';
import { formatCurrency } from './formatters';

export function buildWhatsAppOrderMessage(
  cartItems: CartItem[],
  customer: CustomerDetails,
  config: AppConfig,
  totalAmount: number
): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  let message = `🛒 *NEW ORDER FROM muchcomtech*\n`;
  message += `📅 Date: ${dateStr}\n`;
  message += `-----------------------------------\n\n`;

  message += `👤 *Customer Details:*\n`;
  message += `• Name: ${customer.name}\n`;
  message += `• Phone: ${customer.phone}\n`;
  if (customer.email) message += `• Email: ${customer.email}\n`;
  message += `• Delivery Address: ${customer.address}, ${customer.city}\n`;
  if (customer.notes) message += `• Order Notes: ${customer.notes}\n`;

  message += `\n📦 *Order Summary:* \n`;
  cartItems.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   Qty: ${item.quantity} × ${formatCurrency(item.product.price, config.currencyCode, config.currencySymbol)} = ${formatCurrency(itemTotal, config.currencyCode, config.currencySymbol)}\n`;
  });

  message += `\n-----------------------------------\n`;
  message += `💰 *TOTAL AMOUNT: ${formatCurrency(totalAmount, config.currencyCode, config.currencySymbol)}*\n`;
  message += `-----------------------------------\n\n`;
  message += `Please confirm my order and send payment/delivery instructions! Thank you.`;

  return message;
}

export function openWhatsAppCheckout(
  cartItems: CartItem[],
  customer: CustomerDetails,
  config: AppConfig,
  totalAmount: number
): void {
  const messageText = buildWhatsAppOrderMessage(cartItems, customer, config, totalAmount);
  // Clean phone number format for wa.me link
  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(messageText);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  window.open(waUrl, '_blank');
}
