import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineHome, HiOutlineMapPin } from 'react-icons/hi2';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
  addedDate: string;
}

const AccountAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Mock addresses data
  useEffect(() => {
    const mockAddresses: Address[] = [
      {
        id: '1',
        name: 'Kari Nordmann',
        street: 'Storgata 123',
        city: 'Oslo',
        postalCode: '0123',
        country: 'Norge',
        phone: '+47 123 45 678',
        isDefault: true,
        type: 'home',
        addedDate: '15. januar 2024'
      },
      {
        id: '2',
        name: 'Kari Nordmann',
        street: 'Kongens gate 45',
        city: 'Bergen',
        postalCode: '5003',
        country: 'Norge',
        phone: '+47 987 65 432',
        isDefault: false,
        type: 'work',
        addedDate: '3. mars 2024'
      },
      {
        id: '3',
        name: 'Per Nordmann',
        street: 'Lilleveien 12',
        city: 'Trondheim',
        postalCode: '7030',
        country: 'Norge',
        isDefault: false,
        type: 'other',
        addedDate: '20. april 2024'
      }
    ];

    setTimeout(() => {
      setAddresses(mockAddresses);
      setLoading(false);
    }, 700);
  }, []);

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  const deleteAddress = (id: string) => {
    if (addresses.find(a => a.id === id)?.isDefault) {
      alert('Du kan ikke slette standardadressen. Velg en annen adresse som standard først.');
      return;
    }
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const getAddressTypeText = (type: string) => {
    switch (type) {
      case 'home': return 'Hjemme';
      case 'work': return 'Jobb';
      case 'other': return 'Annet';
      default: return type;
    }
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <HiOutlineHome className="w-4 h-4" />;
      case 'work': return <HiOutlineMapPin className="w-4 h-4" />;
      case 'other': return <HiOutlineMapPin className="w-4 h-4" />;
      default: return <HiOutlineMapPin className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-stone_light rounded-xl w-1/3"></div>
            <div className="h-4 bg-stone_light rounded-lg w-2/3"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-warm_white organic-border p-6 space-y-4">
                  <div className="h-6 bg-stone_light rounded-lg w-1/2"></div>
                  <div className="h-4 bg-stone_light rounded-lg w-3/4"></div>
                  <div className="h-4 bg-stone_light rounded-lg w-2/3"></div>
                  <div className="h-10 bg-stone_light rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <div className="flex items-center space-x-2 text-charcoal/60">
            <Link to="/" className="hover:text-sage transition-colors">Hjem</Link>
            <span>/</span>
            <Link to="/account" className="hover:text-sage transition-colors">Min konto</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Adresser</span>
          </div>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Mine adresser
            </h1>
            <p className="text-charcoal/70 leading-relaxed">
              Administrer leveringsadressene dine for raskere bestillinger
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-organic flex items-center gap-2 self-start sm:self-center"
          >
            <HiOutlinePlus className="w-4 h-4" />
            Legg til adresse
          </button>
        </div>

        {/* Addresses Grid */}
        {addresses.length === 0 ? (
          <div className="bg-warm_white organic-border minimal-shadow p-12 text-center">
            <div className="w-20 h-20 bg-stone_light rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineMapPin className="w-10 h-10 text-charcoal/40" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              Ingen adresser lagt til
            </h3>
            <p className="text-charcoal/70 mb-6">
              Legg til leveringsadresser for å gjøre bestillingsprosessen raskere og enklere.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-organic"
            >
              Legg til din første adresse
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`
                  bg-warm_white organic-border minimal-shadow p-6 transition-all duration-200 hover:shadow-lg
                  ${address.isDefault ? 'ring-2 ring-sage shadow-lg' : ''}
                `}
              >
                {/* Address Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      ${address.isDefault 
                        ? 'bg-gradient-to-br from-sage to-sage_dark text-warm_white' 
                        : 'bg-stone_light text-charcoal'
                      }
                    `}>
                      {getAddressTypeIcon(address.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-charcoal">{address.name}</h3>
                        <span className="text-xs text-charcoal/60 bg-stone_light/50 px-2 py-1 rounded-full">
                          {getAddressTypeText(address.type)}
                        </span>
                      </div>
                      {address.isDefault && (
                        <span className="text-xs text-sage font-medium bg-sage/10 px-2 py-1 rounded-full">
                          ⭐ Standardadresse
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions Dropdown */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingAddress(address)}
                      className="w-8 h-8 bg-stone_light/50 hover:bg-sage/20 rounded-lg flex items-center justify-center transition-colors"
                      title="Rediger adresse"
                    >
                      <HiOutlinePencil className="w-4 h-4 text-charcoal/70" />
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="w-8 h-8 bg-stone_light/50 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                        title="Slett adresse"
                      >
                        <HiOutlineTrash className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-2 mb-6">
                  <p className="text-charcoal">{address.street}</p>
                  <p className="text-charcoal">{address.postalCode} {address.city}</p>
                  <p className="text-charcoal/70">{address.country}</p>
                  {address.phone && (
                    <p className="text-charcoal/70 text-sm">📞 {address.phone}</p>
                  )}
                </div>

                {/* Address Meta */}
                <div className="flex items-center justify-between text-xs text-charcoal/60 mb-4">
                  <span>Lagt til {address.addedDate}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(address.id)}
                      className="flex-1 btn-ghost text-sm py-2"
                    >
                      Sett som standard
                    </button>
                  )}
                  <button
                    onClick={() => setEditingAddress(address)}
                    className="btn-organic text-sm py-2 px-4"
                  >
                    Rediger
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Address Form Modal */}
        {(showAddForm || editingAddress) && (
          <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center p-4 z-50">
            <div className="bg-warm_white organic-border max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-charcoal">
                    {editingAddress ? 'Rediger adresse' : 'Legg til ny adresse'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAddress(null);
                    }}
                    className="w-8 h-8 bg-stone_light/50 hover:bg-stone_light rounded-lg flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Fullt navn
                      </label>
                      <input
                        type="text"
                        defaultValue={editingAddress?.name || ''}
                        className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                        placeholder="Ola Nordmann"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Type adresse
                      </label>
                      <select
                        defaultValue={editingAddress?.type || 'home'}
                        className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                      >
                        <option value="home">Hjemme</option>
                        <option value="work">Jobb</option>
                        <option value="other">Annet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Gate og husnummer
                    </label>
                    <input
                      type="text"
                      defaultValue={editingAddress?.street || ''}
                      className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                      placeholder="Storgata 123"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Postnummer
                      </label>
                      <input
                        type="text"
                        defaultValue={editingAddress?.postalCode || ''}
                        className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                        placeholder="0123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        By
                      </label>
                      <input
                        type="text"
                        defaultValue={editingAddress?.city || ''}
                        className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                        placeholder="Oslo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Land
                    </label>
                    <select
                      defaultValue={editingAddress?.country || 'Norge'}
                      className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                    >
                      <option value="Norge">Norge</option>
                      <option value="Sverige">Sverige</option>
                      <option value="Danmark">Danmark</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Telefonnummer (valgfritt)
                    </label>
                    <input
                      type="tel"
                      defaultValue={editingAddress?.phone || ''}
                      className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                      placeholder="+47 123 45 678"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-stone_light/30 rounded-xl">
                    <input
                      type="checkbox"
                      id="setDefault"
                      defaultChecked={editingAddress?.isDefault || addresses.length === 0}
                      className="w-4 h-4 text-sage border-stone_light rounded focus:ring-sage/20"
                    />
                    <label htmlFor="setDefault" className="text-sm text-charcoal">
                      Sett som standardadresse for leveringer
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingAddress(null);
                      }}
                      className="flex-1 btn-ghost"
                    >
                      Avbryt
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-organic"
                    >
                      {editingAddress ? 'Oppdater adresse' : 'Legg til adresse'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-sage/10 to-terracotta/10 organic-border p-8">
          <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="text-xl">📍</span>
            Hvorfor lagre adresser?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <h4 className="font-medium text-charcoal mb-2">Raskere bestilling</h4>
              <p className="text-charcoal/70 text-sm">Velg lagret adresse i stedet for å skrive alt på nytt</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">👨‍👩‍👧‍👦</span>
              </div>
              <h4 className="font-medium text-charcoal mb-2">Flere mottakere</h4>
              <p className="text-charcoal/70 text-sm">Send gaver til familie og venner enkelt</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🏠</span>
              </div>
              <h4 className="font-medium text-charcoal mb-2">Hjem og jobb</h4>
              <p className="text-charcoal/70 text-sm">Administrer både private og jobbrelaterte adresser</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-charcoal/70 text-sm">
              Alle adresser krypteres og lagres trygt i henhold til GDPR-reglene.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAddresses;