import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PartyPopper, 
  MessageCircle, 
  Sparkles, 
  Wand2, 
  ArrowRight, 
  Gamepad2, 
  Castle, 
  Baby, 
  ChefHat, 
  Utensils, 
  Cake, 
  Users, 
  Snowflake, 
  Accessibility, 
  Star, 
  MapPin, 
  CalendarClock 
} from 'lucide-react';

// --- TYPES ---
interface ThemeOption {
  id: string;
  label: string;
  image: string;
  color: string;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  stars: number;
}

// --- CONSTANTS ---
const WHATSAPP_LINK = "https://wa.me/5515999999999?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20disponibilidade%20para%20uma%20festa%20no%20Buffet.";

const PARTY_THEMES: ThemeOption[] = [
  { 
    id: 'heroes', 
    label: 'Super Heróis', 
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-blue-500'
  },
  { 
    id: 'princess', 
    label: 'Princesas Encantadas', 
    image: 'https://images.unsplash.com/photo-1516641396056-0ce60a85184e?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-pink-400'
  },
  { 
    id: 'safari', 
    label: 'Safari Baby', 
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-green-500'
  },
  { 
    id: 'space', 
    label: 'Aventura Espacial', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-indigo-600'
  },
  { 
    id: 'circus', 
    label: 'Circo Mágico', 
    image: 'https://images.unsplash.com/photo-1577243003027-fa4e68e4c194?q=80&w=1000&auto=format&fit=crop',
    color: 'bg-red-500'
  }
];

const TESTIMONIALS: TestimonialProps[] = [
  {
    name: "Ana Paula",
    role: "Mãe Festeira",
    content: "A melhor festa que já fizemos! O atendimento é impecável e as crianças não queriam ir embora.",
    stars: 5
  },
  {
    name: "Marcos",
    role: "Pai de 2",
    content: "Buffet nota 10 no Wanel Ville. Comida farta e quentinha. Super recomendo para quem quer tranquilidade e diversão.",
    stars: 5
  }
];

const ATTRACTIONS_DATA: FeatureProps[] = [
  {
    icon: <Castle size={40} />,
    title: "Brinquedão",
    description: "Nosso brinquedão gigante conta com luz negra e cores neon para uma experiência futurista e segura.",
    color: "bg-party-purple"
  },
  {
    icon: <Baby size={40} />,
    title: "Área Baby",
    description: "Um espaço lúdico e protegido, projetado especialmente para os pequenos exploradores brincarem com total tranquilidade.",
    color: "bg-party-pink"
  },
  {
    icon: <Gamepad2 size={40} />,
    title: "Arena Games",
    description: "O paraíso dos gamers! Consoles de última geração para garantir o entretenimento dos mais velhos.",
    color: "bg-party-cyan"
  }
];

// --- COMPONENTS ---

const WhatsAppButton: React.FC = () => {
  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer border-4 border-white"
        whileHover={{ scale: 1.1 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        <MessageCircle size={32} fill="white" />
      </motion.div>
    </a>
  );
};

const Header: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b-4 border-party-purple/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
              <PartyPopper className="text-party-pink h-8 w-8" />
            </motion.div>
            <span className="font-fredoka text-2xl text-party-purple font-bold">
              Buffet Infantil <span className="text-party-yellow">🎈</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 font-sora font-semibold text-gray-600">
            <a href="#hero" className="hover:text-party-pink transition-colors">Início</a>
            <a href="#atracoes" className="hover:text-party-pink transition-colors">Atrações</a>
            <a href="#gastronomia" className="hover:text-party-pink transition-colors">Cardápio</a>
            <a href="#depoimentos" className="hover:text-party-pink transition-colors">Depoimentos</a>
          </div>

          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-party-pink text-white px-6 py-2 rounded-full font-fredoka font-bold shadow-lg border-b-4 border-pink-800 active:border-b-0 active:mt-1 transition-all"
          >
            Reservar Agora
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loadingText, setLoadingText] = useState('Iniciando magia...');

  const handleSimulate = () => {
    if (!name || !selectedThemeId) return;
    
    setLoading(true);
    setShowResult(false);
    
    // Simulation steps
    const steps = [
      "Convocando os heróis...",
      "Assando as coxinhas...",
      "Enchendo os balões...",
      "Aplicando pó de pirlimpimpim..."
    ];

    let step = 0;
    const interval = setInterval(() => {
      setLoadingText(steps[step]);
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setLoading(false);
        setShowResult(true);
      }
    }, 800);
  };

  const selectedTheme = PARTY_THEMES.find(t => t.id === selectedThemeId);

  return (
    <section id="hero" className="pt-28 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-party-yellow/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-party-cyan/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-block bg-party-yellow/30 px-4 py-2 rounded-full text-party-purple font-bold font-fredoka text-sm mb-2 border-2 border-party-yellow">
            ✨ Sorocaba e Região
          </div>
          <h1 className="text-5xl md:text-6xl font-fredoka font-bold text-gray-900 leading-tight">
            Onde a imaginação ganha cores e a diversão <span className="text-party-pink">não tem limites!</span>
          </h1>
          <p className="text-xl text-gray-600 font-sora leading-relaxed">
            No Buffet Infantil transformamos o aniversário do seu filho em uma experiência mágica, cardápio premium e segurança total em Sorocaba.
          </p>
          <div className="flex gap-4">
            <motion.a 
              href={WHATSAPP_LINK}
              target="_blank"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-party-purple text-white border-2 border-party-purple rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              QUERO GARANTIR MINHA DATA 🚀
            </motion.a>
          </div>
        </motion.div>

        {/* Right Content: AI Simulator Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative floating elements */}
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-10 -right-10 text-6xl">🎪</motion.div>
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -bottom-10 -left-10 text-6xl">🎨</motion.div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-8 border-party-purple/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-party-purple via-party-pink to-party-yellow" />
            
            {!showResult ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <Wand2 className="text-party-purple w-6 h-6" />
                  <h3 className="text-2xl font-fredoka font-bold text-gray-800">Veja a mágica acontecer! ✨</h3>
                </div>
                
                <p className="text-gray-500 text-sm font-sora">
                  Use nosso Simulador Mágico de Festas e tenha uma prévia de como a mesa do bolo ficará. É rápido, fácil e encantador!
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2 ml-2">Nome do Aniversariante</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Joãozinho"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-gray-200 focus:border-party-purple focus:outline-none transition-colors text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2 ml-2">Escolha o Tema Mágico</label>
                    <div className="grid grid-cols-2 gap-3">
                      {PARTY_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedThemeId(theme.id)}
                          className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center text-center text-sm font-bold ${
                            selectedThemeId === theme.id 
                              ? 'border-party-pink bg-pink-50 text-party-pink scale-105 shadow-md' 
                              : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
                          }`}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={handleSimulate}
                    disabled={!name || !selectedThemeId || loading}
                    whileHover={(!name || !selectedThemeId || loading) ? {} : { scale: 1.02 }}
                    whileTap={(!name || !selectedThemeId || loading) ? {} : { scale: 0.98 }}
                    className={`w-full py-4 rounded-2xl font-fredoka font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                      (!name || !selectedThemeId) 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-party-purple text-white hover:bg-purple-700'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="animate-spin" /> {loadingText}
                      </span>
                    ) : (
                      <>VER PRÉVIA MÁGICA ✨</>
                    )}
                  </motion.button>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-center"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-video shadow-inner">
                    <img 
                      src={selectedTheme?.image} 
                      alt={selectedTheme?.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div className="text-white text-left">
                        <p className="font-fredoka text-xl">Festa de {selectedTheme?.label}</p>
                        <h3 className="font-fredoka text-3xl font-bold">Parabéns, {name}! 🎉</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border-2 border-green-100 text-green-800 text-sm">
                    <p><strong>IA Sugere:</strong> Para o tema {selectedTheme?.label}, recomendamos nossa decoração Premium com arco de balões desconstruído!</p>
                  </div>

                  <div className="flex gap-3 flex-col">
                    <motion.a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      whileHover={{ scale: 1.03 }}
                      className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold font-fredoka shadow-lg border-b-4 border-green-700 active:border-b-0 active:mt-1 flex items-center justify-center gap-2"
                    >
                      ORÇAR ESSA FESTA AGORA <ArrowRight size={20} />
                    </motion.a>
                    <button 
                      onClick={() => setShowResult(false)}
                      className="text-gray-400 text-sm hover:text-gray-600 underline"
                    >
                      Criar outra simulação
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const Attractions: React.FC = () => {
  return (
    <section id="atracoes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-gray-800 mb-4">
            Diversão que faz os <span className="text-party-pink">olhinhos brilharem!</span>
          </h2>
          <p className="text-xl text-gray-500 font-sora max-w-2xl mx-auto">
            Atrações pensadas para todas as idades, garantindo sorrisos do início ao fim.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ATTRACTIONS_DATA.map((attr, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-slate-50 rounded-[2rem] p-8 border-2 border-gray-100 hover:border-party-cyan/50 hover:shadow-xl transition-all group"
            >
              <div className={`w-20 h-20 rounded-2xl ${attr.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {attr.icon}
              </div>
              <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-3">{attr.title}</h3>
              <p className="text-gray-600 font-sora leading-relaxed">
                {attr.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gastronomy: React.FC = () => {
  return (
    <section id="gastronomia" className="py-20 bg-party-purple overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop" className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" alt="Salgados" />
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop" className="rounded-3xl shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500 mt-12" alt="Bolo" />
              <img src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=600&auto=format&fit=crop" className="rounded-3xl shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500" alt="Doces" />
              <img src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=600&auto=format&fit=crop" className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 mt-12" alt="Bebidas" />
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-party-yellow font-bold font-fredoka text-sm mb-4 border border-white/20">
              😋 Qualidade Garantida
            </div>
            <h2 className="text-4xl md:text-5xl font-fredoka font-bold mb-6">
              Uma festa deliciosa <br/>
              <span className="text-party-yellow">do início ao fim!</span>
            </h2>
            <p className="text-lg font-sora text-purple-100 mb-8 leading-relaxed">
              Esqueça salgadinhos frios. Aqui, a qualidade é nossa marca registrada. Tudo preparado com carinho para encantar seus convidados.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <ChefHat className="text-party-yellow w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl font-fredoka mb-1">Salgados Gourmet</h4>
                  <p className="text-purple-200 text-sm">Fritos e assados na hora, crocantes e suculentos.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Utensils className="text-party-pink w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl font-fredoka mb-1">Doces Artesanais</h4>
                  <p className="text-purple-200 text-sm">Brigadeiros de verdade e doces finos que encantam o paladar.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Cake className="text-party-cyan w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl font-fredoka mb-1">Bolo de Confeitaria</h4>
                  <p className="text-purple-200 text-sm">O centro das atenções, feito com ingredientes premium e muito carinho.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBadge: React.FC = () => {
  return (
    <section className="py-12 bg-party-cyan/10 border-y-2 border-party-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-fredoka font-bold text-gray-800">
            Você aproveita a festa, <span className="text-party-pink">nós cuidamos de tudo!</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <Users className="text-party-cyan w-12 h-12 shrink-0" />
            <div>
              <h4 className="font-bold font-fredoka text-gray-800 text-lg">Monitores</h4>
              <p className="text-sm text-gray-500">Equipe de recreação treinada e apaixonada por cuidar de crianças.</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <Snowflake className="text-party-cyan w-12 h-12 shrink-0" />
            <div>
              <h4 className="font-bold font-fredoka text-gray-800 text-lg">Climatização</h4>
              <p className="text-sm text-gray-500">Salão 100% climatizado para o conforto de todos os convidados.</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <Accessibility className="text-party-cyan w-12 h-12 shrink-0" />
            <div>
              <h4 className="font-bold font-fredoka text-gray-800 text-lg">Acessibilidade</h4>
              <p className="text-sm text-gray-500">Espaço amplo, plano e acessível para todos aproveitarem cada segundo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-fredoka font-bold text-gray-800 mb-4">
            Pais Felizes, <span className="text-party-purple">Festas Incríveis</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] relative">
              <div className="absolute -top-6 left-8 bg-party-yellow text-white w-12 h-12 flex items-center justify-center rounded-full text-4xl shadow-md font-serif">
                "
              </div>
              <div className="flex gap-1 mb-4 text-party-yellow mt-4">
                {[...Array(t.stars)].map((_, idx) => (
                  <Star key={idx} fill="currentColor" size={20} />
                ))}
              </div>
              <p className="text-gray-600 font-sora italic mb-6">"{t.content}"</p>
              <div>
                <h5 className="font-bold font-fredoka text-gray-900">{t.name}</h5>
                <span className="text-sm text-gray-500 font-sora">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl grid md:grid-cols-2">
          <div className="p-10 flex flex-col justify-center bg-party-pink">
            <h2 className="text-3xl font-fredoka font-bold text-white mb-6">
              Venha nos visitar! 📍
            </h2>
            <p className="text-white/90 font-sora text-lg mb-8">
              Estamos localizados em um ponto estratégico no Wanel Ville. Agende uma visita e venha tomar um café com a gente!
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-white">
                <MapPin className="shrink-0" />
                <p>Av. Paulo Emanuel de Almeida, 123<br/>Wanel Ville, Sorocaba - SP</p>
              </div>
              <button className="bg-white text-party-pink px-6 py-3 rounded-full font-bold font-fredoka hover:bg-gray-100 transition-colors shadow-lg self-start">
                Ver no Waze/Maps
              </button>
            </div>
          </div>
          <div className="h-96 md:h-auto bg-gray-200 relative group cursor-pointer">
            {/* Placeholder for Google Maps */}
            <img 
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              alt="Mapa"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-xl font-bold text-gray-600 shadow-lg">
                 Mapa Interativo (Wanel Ville)
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-party-pink to-purple-600 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')]"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-party-yellow font-bold font-fredoka text-lg mb-6 border border-white/20">
          ⚠️ Vagas Limitadas
        </div>
        
        <h2 className="text-4xl md:text-6xl font-fredoka font-bold mb-8 leading-tight">
          Não deixe para a <br/><span className="text-party-yellow">última hora!</span>
        </h2>
        
        <p className="text-xl md:text-2xl font-sora text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
          Nossa agenda no Wanel Ville costuma lotar com meses de antecedência. Garanta agora a data do dia mais importante do ano para o seu filho.
        </p>
        
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-party-yellow text-party-purple px-8 py-5 rounded-full font-fredoka font-extrabold text-lg md:text-xl shadow-2xl hover:shadow-white/20 border-b-4 border-yellow-600 active:border-b-0 active:mt-1 transition-all"
        >
          <CalendarClock className="w-6 h-6" />
          CONSULTAR DISPONIBILIDADE NO WHATSAPP 🎈
        </motion.a>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 text-center font-sora">
       <div className="max-w-7xl mx-auto px-4">
         <h2 className="text-2xl font-fredoka font-bold mb-4">Buffet Infantil 🎈</h2>
         <p className="text-gray-400 text-sm mb-8">
           © {new Date().getFullYear()} Todos os direitos reservados. Feito com magia e carinho.
         </p>
         <div className="flex justify-center gap-6 text-sm text-gray-500">
           <a href="#" className="hover:text-party-pink">Instagram</a>
           <a href="#" className="hover:text-party-pink">Facebook</a>
           <a href="#" className="hover:text-party-pink">Termos de Uso</a>
         </div>
       </div>
    </footer>
  );
};

// --- MAIN APP ---

function App() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <TrustBadge />
        <Attractions />
        <Gastronomy />
        <Testimonials />
        <Location />
        <CallToAction />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// --- RENDER ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
