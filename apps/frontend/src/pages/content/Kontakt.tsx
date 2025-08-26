import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button, Input, Select, Card } from '../../components/design-system';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

const Kontakt: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Generell henvendelse',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo: ContactInfo[] = [
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: 'E-post',
      details: ['kundeservice@helseriet.no', 'Vi svarer innen 24 timer']
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: 'Telefon',
      details: ['+47 123 45 678', 'Man-Fre: 09:00-17:00']
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: 'Adresse',
      details: ['Helseveien 123', '0123 Oslo', 'Norge']
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      ),
      title: 'Live Chat',
      details: ['Tilgjengelig hverdager', '09:00-16:00']
    }
  ];

  const subjectOptions = [
    'Generell henvendelse',
    'Produktspørsmål',
    'Bestilling og levering',
    'Retur og refusjon',
    'Teknisk support',
    'Samarbeid og partnerskap',
    'Presse og media'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', form);
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Generell henvendelse',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Hero Section */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Kontakt oss
            </h1>
            <p className="text-responsive-body text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Vi er her for å hjelpe deg på din reise mot bedre helse og velvære
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 card-gap">
            {/* Contact Form */}
            <div>
              <div className="bg-white minimal-shadow organic-border card-inner backdrop-blur-sm">
                <h2 className="text-responsive-h2 text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Send oss en melding
                </h2>
                
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                      Takk for din henvendelse!
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed">Vi vil kontakte deg så snart som mulig.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 card-gap">
                      <Input
                        label="Fornavn"
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                      <Input
                        label="Etternavn"
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                        required
                        fullWidth
                      />
                    </div>
                    
                    <Input
                      label="E-post"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Telefon"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="+47 123 45 678"
                      fullWidth
                    />
                    
                    <Select
                      label="Emne"
                      name="subject"
                      value={form.subject}
                      onChange={handleInputChange}
                      options={subjectOptions.map(option => ({ value: option, label: option }))}
                      required
                      fullWidth
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Melding *
                      </label>
                      <textarea 
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50 resize-none"
                        placeholder="Beskriv din henvendelse..."
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      fullWidth
                      rightIcon={
                        !isSubmitting ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                          </svg>
                        ) : undefined
                      }
                    >
                      {isSubmitting ? 'Sender melding...' : 'Send melding'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Kontaktinformasjon
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} variant="organic" hover className="stagger-item will-animate" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-charcoal mb-2">{info.title}</h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-charcoal/70 leading-relaxed">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Opening Hours */}
              <Card variant="organic">
                <h3 className="text-2xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Åpningstider
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-sage/10">
                    <span className="text-charcoal">Mandag - Fredag</span>
                    <span className="font-medium text-sage">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-sage/10">
                    <span className="text-charcoal">Lørdag</span>
                    <span className="font-medium text-sage">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal">Søndag</span>
                    <span className="font-medium text-charcoal/70">Stengt</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card variant="organic">
                <h3 className="text-2xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Rask hjelp
                </h3>
                <div className="grid grid-cols-2 card-gap">
                  <Link to="/faq" className="group bg-stone_light/30 hover:bg-sage/10 rounded-2xl p-6 text-center subtle-hover focus-ring">
                    <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-sage/20 transition-colors duration-300">
                      <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-charcoal group-hover:text-sage transition-colors duration-300">FAQ</div>
                  </Link>
                  <button className="group bg-stone_light/30 hover:bg-sage/10 rounded-2xl p-6 text-center subtle-hover focus-ring">
                    <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-sage/20 transition-colors duration-300">
                      <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-charcoal group-hover:text-sage transition-colors duration-300">Spor ordre</div>
                  </button>
                  <button className="group bg-stone_light/30 hover:bg-sage/10 rounded-2xl p-6 text-center subtle-hover focus-ring">
                    <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-sage/20 transition-colors duration-300">
                      <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-charcoal group-hover:text-sage transition-colors duration-300">Retur</div>
                  </button>
                  <button className="group bg-stone_light/30 hover:bg-sage/10 rounded-2xl p-6 text-center subtle-hover focus-ring">
                    <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-sage/20 transition-colors duration-300">
                      <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-charcoal group-hover:text-sage transition-colors duration-300">Live Chat</div>
                  </button>
                </div>
              </Card>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 border border-terracotta/20 rounded-2xl card-inner backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-terracotta">Medisinsk nødsituasjon?</h3>
                </div>
                <p className="text-charcoal/70 text-sm mb-4 leading-relaxed">
                  Ved alvorlige bivirkninger eller medisinsk nødssituasjon, kontakt:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-charcoal font-medium">
                    <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span>Legevakt: 116 117</span>
                  </div>
                  <div className="flex items-center gap-3 text-charcoal font-medium">
                    <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                    <span>Akuttmedisin: 113</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-light text-charcoal mb-12 text-center" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Finn oss
          </h2>
          <Card variant="organic" className="text-center">
            <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
            </div>
            <h3 className="text-2xl font-light text-charcoal mb-2" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Helseriet hovedkontor
            </h3>
            <p className="text-charcoal/70 mb-8 leading-relaxed">Helseveien 123, 0123 Oslo, Norge</p>
            <Button 
              variant="ghost"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              }
            >
              Åpne i kart
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Kontakt;