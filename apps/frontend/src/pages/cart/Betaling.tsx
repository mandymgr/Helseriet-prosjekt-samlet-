import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { cartService } from '../../services/api';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import { HiArrowLeft, HiShoppingCart, HiExclamationTriangle } from 'react-icons/hi2';
import type { Cart } from '../../services/api';

const Betaling = () => {
  const navigate = useNavigate();
  
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.get();
      if (response.success && response.data) {
        setCart(response.data);
      } else {
        setError('Kunne ikke laste handlekurv');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Feil ved lasting av handlekurv');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (orderId: string) => {
    navigate('/ordrebekreftelse', { state: { orderId, success: true } });
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Calculate total amount
  const totalAmount = cart?.items.reduce((sum, item) => {
    return sum + (Number(item.product?.price) || 0) * item.quantity;
  }, 0) || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
          <p className="text-charcoal/60">Laster betalingsinformasjon...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="page-header text-center mb-8">
              <h1 className="text-responsive-h1 text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Betaling
              </h1>
            </div>

            {/* Empty Cart Message */}
            <div className="organic-border bg-gradient-to-br from-warm_white to-cream border-stone_light/50">
              <div className="card-inner text-center py-12">
                <HiShoppingCart className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
                <h2 className="text-responsive-h2 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Handlekurven er tom
                </h2>
                <p className="text-responsive-body text-charcoal/60 mb-6">
                  Du må legge til produkter i handlekurven før du kan gjennomføre betaling.
                </p>
                <button
                  onClick={() => navigate('/produkter')}
                  className="px-6 py-3 organic-border bg-gradient-to-r from-sage to-sage/80 hover:from-sage/80 hover:to-sage text-white font-medium transition-all duration-300"
                >
                  Utforsk Produkter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="page-header mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate('/handlekurv')}
                className="p-2 organic-border bg-warm_white hover:bg-stone_light/50 text-charcoal transition-colors flex items-center justify-center"
              >
                <HiArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-responsive-h1 text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Betaling
              </h1>
            </div>
            <p className="text-responsive-body text-charcoal/70">
              Fullfør bestillingen din med sikker betaling
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="organic-border bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800 mb-8">
              <div className="card-inner">
                <div className="flex items-center gap-3">
                  <HiExclamationTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="font-semibold">Feil ved betaling</h3>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 px-4 py-2 bg-red-600 text-white organic-border hover:bg-red-700 transition-colors text-sm"
                >
                  Lukk
                </button>
              </div>
            </div>
          )}

          {/* Checkout Form */}
          <CheckoutForm
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            amount={totalAmount}
            cartItems={cart.items}
          />
        </div>
      </div>
    </div>
  );
};

export default Betaling;