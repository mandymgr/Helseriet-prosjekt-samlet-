export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-light text-charcoal mb-3" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Laster admin-panel
          </h2>
          <p className="text-charcoal/60">
            Starter avanserte administrasjonsverktøy...
          </p>
          <div className="mt-6">
            <div className="bg-stone_light/30 rounded-full h-2 overflow-hidden">
              <div className="bg-sage h-full rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}