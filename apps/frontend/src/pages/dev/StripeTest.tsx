import React from 'react';
import { StripePaymentForm } from '../../components/payment';
import { HiOutlineCreditCard } from 'react-icons/hi2';

const StripeTest: React.FC = () => {
  const handlePaymentSuccess = (paymentResult: any) => {
    console.log('Test Payment Success:', paymentResult);
    alert('Betaling vellykket! Se konsoll for detaljer.');
  };

  const handlePaymentError = (error: string) => {
    console.error('Test Payment Error:', error);
    alert(`Betalingsfeil: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HiOutlineCreditCard className="w-10 h-10 text-sage" />
          </div>
          <h1 className="text-4xl font-serif text-charcoal mb-4">Stripe Elements Test</h1>
          <p className="text-charcoal/70">Test av Stripe betalingsintegrasjon</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Payment Form */}
          <div className="bg-white organic-border minimal-shadow p-8">
            <h2 className="text-2xl font-serif text-charcoal mb-6">Test Betaling</h2>
            
            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <h3 className="font-medium text-blue-700 mb-2">Test Kortnumre:</h3>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• 4242 4242 4242 4242 (Visa)</li>
                <li>• 5555 5555 5555 4444 (Mastercard)</li>
                <li>• Utløpsdato: Enhver fremtidig dato</li>
                <li>• CVC: Enhver 3-siffer kode</li>
              </ul>
            </div>

            <StripePaymentForm
              orderId="test_order_123"
              amount={1000}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </div>

          {/* Info Panel */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white organic-border minimal-shadow p-8">
              <h3 className="text-xl font-serif text-charcoal mb-4">Test Ordre</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Test Produkt</span>
                  <span className="text-charcoal">800 kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Frakt</span>
                  <span className="text-charcoal">200 kr</span>
                </div>
                <div className="border-t-2 border-stone pt-3 flex justify-between font-bold text-lg">
                  <span className="text-charcoal">Total</span>
                  <span className="text-sage">1 000 kr</span>
                </div>
              </div>
            </div>

            {/* Technical Info */}
            <div className="bg-sage/10 border-2 border-sage/20 rounded-xl p-6">
              <h3 className="font-medium text-sage mb-3">Teknisk Info</h3>
              <ul className="text-sm text-charcoal/70 space-y-2">
                <li>• Stripe Elements integrasjon</li>
                <li>• React Stripe JS bibliotek</li>
                <li>• PCI DSS kompatibel</li>
                <li>• Sikker tokenisering</li>
                <li>• Real-time validering</li>
              </ul>
            </div>

            {/* Status */}
            <div className="bg-terracotta/10 border-2 border-terracotta/20 rounded-xl p-6">
              <h3 className="font-medium text-terracotta mb-3">Status</h3>
              <div className="text-sm text-charcoal/80">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-sage rounded-full"></div>
                  Stripe Provider: Aktiv
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-sage rounded-full"></div>
                  Payment Service: Koblet til
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sage rounded-full"></div>
                  Elements: Lastet
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Notes */}
        <div className="mt-12 bg-white organic-border minimal-shadow p-8">
          <h3 className="text-xl font-serif text-charcoal mb-4">Utviklernotater</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-charcoal/70">
            <div>
              <h4 className="font-medium text-charcoal mb-3">Implementerte Features:</h4>
              <ul className="space-y-1">
                <li>• Stripe Elements UI komponenter</li>
                <li>• Real-time kortvalidering</li>
                <li>• Custom styling med brand farger</li>
                <li>• Error handling og brukermelding</li>
                <li>• Loading states og UX feedback</li>
                <li>• Abonnement støtte (setup_future_usage)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-charcoal mb-3">Neste Steg:</h4>
              <ul className="space-y-1">
                <li>• Koble til ekte backend payment intent</li>
                <li>• Webhook håndtering for bekreftelse</li>
                <li>• 3D Secure støtte</li>
                <li>• Saved cards administrasjon</li>
                <li>• Detaljerte error meldinger</li>
                <li>• Payment Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeTest;