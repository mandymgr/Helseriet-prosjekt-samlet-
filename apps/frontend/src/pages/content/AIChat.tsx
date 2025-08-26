import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface QuickAction {
  text: string;
  message: string;
  icon: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hei! Jeg er Helseriet AI-assistent. Jeg kan hjelpe deg med å finne de riktige kosttilskuddene for dine behov. Hva kan jeg hjelpe deg med i dag? 😊',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    { text: 'Hei!', message: 'Hei! Kan du hjelpe meg?', icon: '👋' },
    { text: 'Vitamin D', message: 'Jeg leter etter vitamin D produkter', icon: '💊' },
    { text: 'Frakt', message: 'Hva koster frakt?', icon: '📦' },
    { text: 'Søvn', message: 'Kan du anbefale kosttilskudd for bedre søvn?', icon: '😴' },
    { text: 'Fokus', message: 'Har dere noe for bedre konsentrasjon?', icon: '🧠' },
    { text: 'Trening', message: 'Kosttilskudd for trening og restitusjon?', icon: '💪' }
  ];

  const healthConcerns = [
    { text: 'Søvnproblemer', message: 'Jeg har søvnproblemer. Kan du anbefale kosttilskudd som kan hjelpe?', icon: '😴' },
    { text: 'Stress og uro', message: 'Jeg har stress og uro. Kan du anbefale kosttilskudd som kan hjelpe?', icon: '😰' },
    { text: 'Lav energi', message: 'Jeg har lav energi. Kan du anbefale kosttilskudd som kan hjelpe?', icon: '⚡' },
    { text: 'Immunforsvar', message: 'Jeg vil styrke immunforsvaret. Kan du anbefale kosttilskudd?', icon: '🛡️' },
    { text: 'Leddsmerter', message: 'Jeg har leddsmerter. Kan du anbefale kosttilskudd som kan hjelpe?', icon: '🦴' },
    { text: 'Fordøyelse', message: 'Jeg har dårlig fordøyelse. Kan du anbefale kosttilskudd som kan hjelpe?', icon: '🍃' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hei') || lowerMessage.includes('hallo')) {
      return 'Hei! Hyggelig å høre fra deg. Jeg er her for å hjelpe deg med å finne de beste kosttilskuddene for dine behov. Har du noen spesielle helsemål eller utfordringer jeg kan hjelpe deg med? 🌟';
    }
    
    if (lowerMessage.includes('vitamin d')) {
      return 'Vitamin D er superviking! 🌞 Vi har flere utmerkede alternativer:\n\n• **Vitamin D3** - 50μg kapsler (100 stk) - 199 kr\n• **Vitamin D3 Høydose** - 100μg kapsler (60 stk) - 279 kr\n• **D3 + K2 Kompleks** - Optimal absorpsjon - 349 kr\n\nVitamin D er essensielt for ben, tenner og immunforsvar. Anbefaler D3-formen da den absorberes best. Vil du vite mer om noen av disse?';
    }
    
    if (lowerMessage.includes('frakt')) {
      return '📦 Våre fraktpriser:\n\n• **Standard frakt**: 59 kr (2-4 virkedager)\n• **Ekspress**: 129 kr (1-2 virkedager)\n• **Gratis frakt** ved kjøp over 599 kr! 🎉\n\nVi sender med Posten Norge og du får SMS-varsling når pakken er klar. Har du andre spørsmål om levering?';
    }
    
    if (lowerMessage.includes('søvn')) {
      return '😴 For bedre søvn anbefaler jeg:\n\n• **Magnesium Glycinat** - Avslappende, 249 kr\n• **Melatonin** - Naturlig søvnhormon, 199 kr\n• **Søvn Kompleks** - Kombinasjon av urter og mineraler, 349 kr\n• **L-Theanin** - Fra grønn te, fremmer ro, 279 kr\n\nMagnesium og melatonin er mest populære. Magnesium virker muskelavslappende, mens melatonin regulerer døgnrytmen. Hva høres best ut for deg?';
    }
    
    if (lowerMessage.includes('fokus') || lowerMessage.includes('konsentrasjon')) {
      return '🧠 For bedre fokus og konsentrasjon:\n\n• **Omega-3 Premium** - EPA/DHA for hjernen, 449 kr\n• **B-Vitamin Kompleks** - Energi til nervesystemet, 229 kr\n• **Ginkgo Biloba** - Forbedrer sirkulasjon til hjernen, 299 kr\n• **Rhodiola Rosea** - Adaptogen for mental ytelse, 329 kr\n\nOmega-3 har best dokumentasjon for kognitiv funksjon. B-vitaminer gir energi til hjernen. Vil du høre mer om noen av disse?';
    }
    
    if (lowerMessage.includes('trening')) {
      return '💪 For trening og restitusjon:\n\n• **Kreatin Monohydrat** - Styrke og power, 299 kr\n• **BCAA** - Muskelgjenoppbygging, 349 kr\n• **Magnesium** - Muskelrestitusjon, 249 kr\n• **Protein Pulver** - Komplette aminosyrer, 399 kr\n• **Omega-3** - Anti-inflammatorisk, 449 kr\n\nKreatin er mest dokumentert for styrketrening. BCAA hjelper med restitusjon. Hva slags trening driver du mest med?';
    }
    
    if (lowerMessage.includes('stress')) {
      return '😰 For stress og uro anbefaler jeg:\n\n• **Magnesium** - Naturlig avslappende, 249 kr\n• **Ashwagandha** - Adaptogen som reduserer kortisol, 329 kr\n• **L-Theanin** - Ro uten tretthet, 279 kr\n• **B-Vitamin Kompleks** - Støtter nervesystemet, 229 kr\n\nAshwagandha er spesielt effektiv mot kronisk stress. Magnesium virker raskt og trygt. Opplever du mest fysisk eller mental stress?';
    }
    
    if (lowerMessage.includes('energi')) {
      return '⚡ For mer energi prøv:\n\n• **B-Vitamin Kompleks** - Energimetabolisme, 229 kr\n• **Jern + C-Vitamin** - Ved jernmangel, 199 kr\n• **CoQ10** - Cellulær energiproduksjon, 399 kr\n• **Rhodiola Rosea** - Adaptogen for utholdenhet, 329 kr\n\nB-vitaminer er grunnleggende for energi. Jernmangel er vanlig årsak til tretthet, spesielt hos kvinner. Har du tatt blodprøver nylig?';
    }
    
    if (lowerMessage.includes('immunforsvar') || lowerMessage.includes('immun')) {
      return '🛡️ For sterkt immunforsvar:\n\n• **Vitamin D3** - Viktigst for immunforsvar, 199 kr\n• **Vitamin C** - Klassisk antioksidant, 149 kr\n• **Sink** - Essensielt mineral, 179 kr\n• **Immunforsvar Kompleks** - Kombinasjon, 349 kr\n\nVitamin D er absolut viktigst, spesielt i mørke måneder. Sink er kritisk for immunfunksjon. Blir du ofte forkjølet?';
    }
    
    if (lowerMessage.includes('fordøyelse') || lowerMessage.includes('mage')) {
      return '🍃 For bedre fordøyelse:\n\n• **Probiotika** - Gode bakterier, 299 kr\n• **Fordøyelsesenzymer** - Hjelper nedbrytning, 249 kr\n• **L-Glutamin** - Reparerer tarmveggen, 279 kr\n• **Fiber Supplement** - Støtter tarmflora, 199 kr\n\nProbiotika er best dokumentert for tarmhelse. Enzymer hjelper hvis du har problemer med å fordøye mat. Hva slags fordøyelsesproblemer har du?';
    }
    
    if (lowerMessage.includes('ledd')) {
      return '🦴 For leddhelse:\n\n• **Glukosamin + Kondroitin** - Klassisk kombinasjon, 349 kr\n• **Omega-3** - Anti-inflammatorisk, 449 kr\n• **Kurkumin** - Naturlig antiinflammatorisk, 299 kr\n• **MSM** - Svovel for bruskveev, 229 kr\n\nOmega-3 har best dokumentasjon for inflammasjon. Glukosamin støtter bruskveev. Er det spesielle ledd som plager deg?';
    }
    
    // Default responses
    const defaultResponses = [
      'Det er et interessant spørsmål! Kan du fortelle meg litt mer om dine spesifikke behov, så kan jeg gi deg bedre anbefalinger? 🤔',
      'Jeg forstår! For å gi deg de beste rådene, kan du beskrive situasjonen din litt mer detaljert? Alder, kjønn og livsstil påvirker hvilke kosttilskudd som passer best. 💭',
      'Det høres ut som noe jeg kan hjelpe med! Kan du være litt mer spesifikk, så kan jeg finne de beste produktene for akkurat dine behov? 🎯'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    sendMessage(inputValue);
    setInputValue('');
  };

  const sendMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: simulateAIResponse(message),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            🤖 Helseriet AI-assistent
          </h1>
          <p className="text-charcoal/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Få personlige anbefalinger for kosttilskudd basert på dine behov. 
            Vår AI kjenner alle produktene våre og kan hjelpe deg finne det som passer best.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-warm_white organic-border minimal-shadow">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-xs lg:max-w-md px-4 py-3 rounded-2xl
                    ${message.type === 'user'
                      ? 'bg-gradient-to-br from-sage to-sage_dark text-warm_white'
                      : 'bg-gradient-to-br from-stone_light to-terracotta/20 text-charcoal'
                    }
                  `}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-warm_white/80' : 'text-charcoal/60'}`}>
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
                <div className="bg-gradient-to-br from-stone_light to-terracotta/20 text-charcoal px-4 py-3 rounded-2xl">
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

          {/* Quick Actions */}
          <div className="border-t border-stone_light p-6">
            <h3 className="font-semibold text-charcoal mb-3">Hurtig start:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="bg-sage/10 hover:bg-sage/20 text-charcoal px-3 py-2 rounded-full text-sm transition-colors flex items-center gap-2"
                >
                  <span>{action.icon}</span>
                  {action.text}
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-charcoal mb-3">Helsebehov:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              {healthConcerns.map((concern, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(concern)}
                  className="bg-terracotta/10 hover:bg-terracotta/20 text-charcoal px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 justify-center"
                >
                  <span>{concern.icon}</span>
                  {concern.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t border-stone_light p-6">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Skriv din melding..."
                className="flex-1 px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="btn-organic px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gradient-to-r from-terracotta/10 to-sage/10 organic-border p-6">
          <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
            <span className="text-xl">ℹ️</span>
            Viktig informasjon
          </h3>
          <div className="text-sm text-charcoal/70 space-y-2 leading-relaxed">
            <p>
              • Denne AI-assistenten gir generelle råd basert på vårt produktutvalg
            </p>
            <p>
              • Rådene erstatter ikke medisinsk behandling eller diagnose
            </p>
            <p>
              • Konsulter lege før du starter nye kosttilskudd, spesielt ved sykdom eller medisinbruk
            </p>
            <p>
              • For personlig rådgivning, <Link to="/kontakt" className="text-sage hover:text-sage_dark underline">kontakt våre eksperter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;