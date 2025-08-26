import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

interface Specialist {
  id: string;
  name: string;
  title: string;
  experience: string;
  status: 'available' | 'busy' | 'offline';
  statusText: string;
  avatar: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'specialist';
  content: string;
  timestamp: Date;
  isProduct?: boolean;
  productInfo?: {
    name: string;
    description: string;
    price: number;
  };
}

const Ekspertrad: React.FC = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('1');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'specialist',
      content: 'Hei! Velkommen til Helseriet 👋\n\nJeg er Rose Kristin Gjervik, ernæringsfysiolog med spesialisering innen kosttilskudd og naturlig helse.\n\nHva kan jeg hjelpe deg med i dag?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const specialists: Specialist[] = [
    {
      id: '1',
      name: 'Rose Kristin Gjervik',
      title: 'Ernæringsfysiolog',
      experience: '15 års erfaring',
      status: 'available',
      statusText: 'Tilgjengelig',
      avatar: '👩‍⚕️'
    },
    {
      id: '2',
      name: 'Per Hansen',
      title: 'Naturterapeut',
      experience: '12 års erfaring',
      status: 'busy',
      statusText: 'Opptatt (5 min)',
      avatar: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Maria Olsen',
      title: 'Kostholdsveileder',
      experience: '18 års erfaring',
      status: 'offline',
      statusText: 'Utilgjengelig',
      avatar: '👩‍⚕️'
    }
  ];

  const quickTopics = [
    'Immunforsvar og vitaminer',
    'Søvnproblemer', 
    'Stress og energi',
    'Fordøyelse',
    'Trening og restitusjon',
    'Vektregulering'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateSpecialistResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('søvn')) {
      return 'Jeg forstår frustrasjonen din. Søvnproblemer kan påvirke hele livskvaliteten. La meg gi deg noen anbefalinger:\n\n🌙 **For bedre søvn anbefaler jeg:**\n• **Magnesium** - 300-400mg før sengetid\n• **L-Teanin** - 200mg for avslapning  \n• **Ashwagandha** - reduserer stress\n\nHar du prøvd noen av disse før, eller er det andre faktorer som kan påvirke søvnen din?';
    }
    
    if (lowerMessage.includes('stress')) {
      return 'Stress påvirker både kropp og sjel. Her er min anbefaling:\n\n🎯 **Stresshjelp-pakken:**\n• **Ashwagandha KSM-66** - Reduserer kortisol\n• **Magnesium Glycinate** - Muskelavslapping\n• **B-Complex** - Støtter nervesystemet\n\nStart gjerne med Ashwagandha - det har best dokumentasjon på stressreduksjon. Hvor lenge har du opplevd stress?';
    }
    
    if (lowerMessage.includes('energi') || lowerMessage.includes('trøtt')) {
      return 'Lav energi kan ha mange årsaker. La meg hjelpe deg:\n\n⚡ **For bedre energi:**\n• **Jern + C-vitamin** - Ved jernmangel\n• **B12** - Spesielt viktig for vegetarianere\n• **CoQ10** - Cellulær energiproduksjon\n• **Rhodiola** - Naturlig energi uten stimulanter\n\nHar du tatt blodprøver nylig? Jernmangel er vanlig årsak til tretthet.';
    }
    
    if (lowerMessage.includes('immunforsvar') || lowerMessage.includes('forkjølelse')) {
      return 'Immunforsvaret trenger riktig næring for å fungere optimalt:\n\n🛡️ **Immunstøtte:**\n• **Vitamin D3** - Viktigst for immunforsvar (50-100μg)\n• **Vitamin C** - 1000mg daglig\n• **Sink** - 15mg, ikke på tom mage\n• **Echinacea** - Ved første tegn på forkjølelse\n\nVitamin D er absolutt viktigst - 80% av nordmenn har for lite! Blir du ofte syk?';
    }

    const responses = [
      'Takk for spørsmålet! Kan du fortelle meg litt mer om situasjonen din, så kan jeg gi deg mer målrettet rådgivning?',
      'Det er et godt spørsmål. For å gi deg best mulig råd, kan du beskrive symptomene eller utfordringene dine mer detaljert?',
      'Jeg ser at du er opptatt av din helse - det er flott! La meg høre mer om hva du opplever, så finner vi de beste løsningene sammen.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    sendMessage(inputValue);
    setInputValue('');
  };

  const sendMessage = (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate specialist response delay
    setTimeout(() => {
      const specialistMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'specialist',
        content: simulateSpecialistResponse(message),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, specialistMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const handleQuickTopic = (topic: string) => {
    sendMessage(`Jeg har spørsmål om ${topic.toLowerCase()}`);
  };

  const currentSpecialist = specialists.find(s => s.id === selectedSpecialist) || specialists[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600';
      case 'busy': return 'text-yellow-600';
      case 'offline': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Prat med våre spesialister
          </h1>
          <p className="text-lg text-charcoal/70">
            Få personlig veiledning fra våre erfarne helsekonsulenter
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Specialists Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Specialists List */}
            <div className="bg-warm_white organic-border minimal-shadow p-6">
              <h2 className="text-xl font-bold text-charcoal mb-6">Våre spesialister</h2>
              
              <div className="space-y-4">
                {specialists.map((specialist) => (
                  <div
                    key={specialist.id}
                    onClick={() => setSelectedSpecialist(specialist.id)}
                    className={`
                      bg-gradient-to-r from-stone_light/30 to-sage/10 organic-border p-4 cursor-pointer transition-all duration-200
                      ${selectedSpecialist === specialist.id 
                        ? 'ring-2 ring-sage shadow-lg' 
                        : 'hover:shadow-md hover:from-stone_light/50 hover:to-sage/20'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-full flex items-center justify-center text-xl">
                        {specialist.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-charcoal">{specialist.name}</h3>
                        <p className="text-sm text-charcoal/70 mb-1">{specialist.title}</p>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(specialist.status)}`}></span>
                          <span className={`text-xs ${getStatusTextColor(specialist.status)}`}>
                            {specialist.statusText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Topics */}
            <div className="bg-warm_white organic-border minimal-shadow p-6">
              <h3 className="font-bold text-charcoal mb-4">Populære emner</h3>
              <div className="space-y-2">
                {quickTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickTopic(topic)}
                    className="w-full text-left px-4 py-3 bg-gradient-to-r from-stone_light/50 to-sage/10 hover:from-sage/20 hover:to-terracotta/20 organic-border text-sm transition-colors rounded-xl"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-warm_white organic-border minimal-shadow h-full flex flex-col" style={{minHeight: '600px'}}>
              {/* Chat Header */}
              <div className="border-b border-stone_light p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-full flex items-center justify-center text-xl">
                    {currentSpecialist.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg">{currentSpecialist.name}</h3>
                    <p className="text-charcoal/70">{currentSpecialist.title} • {currentSpecialist.experience}</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-lg p-4 rounded-2xl
                          ${message.type === 'user'
                            ? 'bg-gradient-to-br from-sage to-sage_dark text-warm_white ml-12'
                            : 'bg-gradient-to-br from-stone_light to-terracotta/20 text-charcoal mr-12'
                          }
                        `}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-3 opacity-70 ${message.type === 'user' ? 'text-warm_white/80' : 'text-charcoal/60'}`}>
                          {message.timestamp.toLocaleTimeString('nb-NO', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-br from-stone_light to-terracotta/20 text-charcoal p-4 rounded-2xl mr-12">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-charcoal/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-stone_light p-6">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Skriv din melding her..."
                    className="flex-1 px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="btn-organic px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Send
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </button>
                </form>
                <p className="text-xs text-charcoal/50 mt-3">
                  Svar innen 1-2 minutter • Åpent man-fre 09:00-17:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-warm_white organic-border minimal-shadow p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎓</span>
            </div>
            <h3 className="font-bold text-charcoal mb-3 text-lg">Sertifiserte eksperter</h3>
            <p className="text-charcoal/70 leading-relaxed">
              Alle våre spesialister har relevant utdanning og minst 10 års erfaring
            </p>
          </div>
          
          <div className="bg-warm_white organic-border minimal-shadow p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="font-bold text-charcoal mb-3 text-lg">100% konfidensielt</h3>
            <p className="text-charcoal/70 leading-relaxed">
              Alle samtaler er private og behandles med full taushetsplikt
            </p>
          </div>
          
          <div className="bg-warm_white organic-border minimal-shadow p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="font-bold text-charcoal mb-3 text-lg">Rask respons</h3>
            <p className="text-charcoal/70 leading-relaxed">
              Gjennomsnittlig svartid under 2 minutter i åpningstiden
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-sage/10 to-terracotta/10 organic-border p-8">
            <h3 className="text-xl font-bold text-charcoal mb-4">
              Har du spørsmål om produktene våre?
            </h3>
            <p className="text-charcoal/70 mb-6 leading-relaxed max-w-2xl mx-auto">
              Våre spesialister kan også hjelpe deg med å finne de riktige produktene 
              basert på dine individuelle behov og mål.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/produkter" className="btn-organic">
                Se våre produkter
              </Link>
              <Link to="/ai-chat" className="btn-ghost">
                Prøv AI-assistenten
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ekspertrad;