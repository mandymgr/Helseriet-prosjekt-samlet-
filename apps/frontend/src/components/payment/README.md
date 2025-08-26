# Stripe Payment Integration

## Overview
Denne mappen inneholder Stripe Elements integrasjon for Helseriet e-commerce platform.

## Components

### StripeProvider.tsx
- Wrapper komponent som initialiserer Stripe med publishable key
- Konfigurerer custom appearance med brand farger (sage)
- Setter opp Element options for hele applikasjonen

### StripeCardElement.tsx  
- Card Element komponent for kortsdata input
- Håndterer real-time validering og feilmeldinger
- Støtter lagring av kort for abonnement (setup_future_usage)
- Custom styling som matcher design system

### StripePaymentForm.tsx
- Komplett betalingsskjema med loading states
- Oppretter payment intent via backend service
- Håndterer success/error callbacks
- Inkluderer sikkerhetsindikatorer og brukerguiding

## Usage

```tsx
import { StripePaymentForm } from '../../components/payment';

const CheckoutPage = () => {
  const handleSuccess = (paymentResult) => {
    // Handle successful payment
    navigate('/confirmation');
  };

  const handleError = (error) => {
    // Handle payment error  
    setError(error);
  };

  return (
    <StripePaymentForm
      orderId="order_123"
      amount={1000}
      onPaymentSuccess={handleSuccess}
      onPaymentError={handleError}
    />
  );
};
```

## Configuration

### Environment Variables
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend Integration
Krever følgende endpoints:
- `POST /api/payments/create-intent` - Opprett payment intent
- `POST /api/payments/{id}/confirm` - Bekreft betaling
- `GET /api/payments/{id}/status` - Hent betalingsstatus

## Features

✅ **Implementert:**
- Stripe Elements UI komponenter
- Real-time kortvalidering  
- Custom brand styling (sage theme)
- Error handling og brukermelding
- Loading states og UX feedback
- Abonnement støtte (saved cards)
- PCI DSS compliant tokenization

🚧 **Mangler (future enhancement):**
- 3D Secure support
- Webhook event handling
- Payment method management
- Multiple currency support
- Detailed analytics

## Testing

Test kortnummer for development:
- **Visa:** 4242 4242 4242 4242
- **Mastercard:** 5555 5555 5555 4444  
- **Utløpsdato:** Enhver fremtidig dato
- **CVC:** Enhver 3-siffer kode

Tilgjengelig på `/stripe-test` for testing.

## Security

- Alle kortdata håndteres av Stripe Elements (ingen PCI compliance påkrevd)
- Kommunikasjon via HTTPS/TLS
- Client-side tokenization før API kall
- Sensitive data aldri lagret i frontend state