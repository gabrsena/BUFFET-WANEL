
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';
import { 
  PartyPopper, 
  MessageCircle, 
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
  CalendarClock,
  Music,
  Zap,
  X,
  Search,
  Cloud,
  Menu,
  Rocket,
  Upload,
  ImagePlus,
  Camera,
  Wand2,
  Crown,
  ShieldCheck,
  Heart,
  Instagram,
  Sparkles,
  Lock,
  Plus,
  ChevronDown,
  Waves,
  Trees,
  Palette,
  CalendarDays,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- TYPES ---
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  glow: string;
  borderColor: string;
}

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  stars: number;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

// --- CONSTANTS ---
const WHATSAPP_LINK = "https://wa.me/5515999999999?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20disponibilidade%20para%20uma%20festa%20no%20Buffet.";

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
  },
  {
    name: "Juliana Mendes",
    role: "Mãe do Miguel",
    content: "A equipe de monitores é fantástica! Fiquei super tranquila enquanto as crianças se divertiam no brinquedão.",
    stars: 5
  }
];

const ATTRACTIONS_DATA: FeatureProps[] = [
  {
    icon: <Castle size={40} />,
    title: "Brinquedos Incríveis",
    description: "Diversão que faz os olhinhos brilharem com o nosso super brinquedão neon!",
    color: "bg-party-purple",
    glow: "shadow-neon-purple",
    borderColor: "border-party-purple"
  },
  {
    icon: <Baby size={40} />,
    title: "Área Baby",
    description: "Um espaço lúdico e protegido para os pequenos exploradores brilharem seguros.",
    color: "bg-party-pink",
    glow: "shadow-neon-pink",
    borderColor: "border-party-pink"
  },
  {
    icon: <Gamepad2 size={40} />,
    title: "Arena Games",
    description: "O paraíso dos gamers! Consoles de última geração para os maiores.",
    color: "bg-party-cyan",
    glow: "shadow-neon-cyan",
    borderColor: "border-party-cyan"
  },
  {
    icon: <Rocket size={40} />,
    title: "Tirolesa",
    description: "Uma aventura inesquecível pelo ar com total segurança para os pequenos aventureiros.",
    color: "bg-party-orange",
    glow: "shadow-neon-orange",
    borderColor: "border-party-orange"
  },
  {
    icon: <Waves size={40} />,
    title: "Piscina Gigante",
    description: "Milhares de bolinhas coloridas em uma piscina gigante que é pura alegria.",
    color: "bg-party-yellow",
    glow: "shadow-neon-yellow",
    borderColor: "border-party-yellow"
  },
  {
    icon: <Trees size={40} />,
    title: "Arvorismo",
    description: "Circuito de cordas indoor para desafiar o equilíbrio e a coragem.",
    color: "bg-party-purple",
    glow: "shadow-neon-purple",
    borderColor: "border-party-purple"
  },
  {
    icon: <Palette size={40} />,
    title: "Oficina Slime",
    description: "Momento de criatividade e diversão tátil que as crianças simplesmente amam!",
    color: "bg-party-pink",
    glow: "shadow-neon-pink",
    borderColor: "border-party-pink"
  },
  {
    icon: <Crown size={40} />,
    title: "Camarim Fashion",
    description: "Pintura facial e adereços para transformar cada convidado em uma estrela.",
    color: "bg-party-cyan",
    glow: "shadow-neon-cyan",
    borderColor: "border-party-cyan"
  }
];

const FAQ_DATA: FAQItemProps[] = [
  {
    question: "Qual é a duração padrão das festas?",
    answer: "Nossas festas têm duração padrão de 4 horas, com 30 minutos de tolerância para a saída dos convidados. Oferecemos também a opção de horas adicionais, caso deseje estender a diversão!"
  },
  {
    question: "O que está incluso no pacote de gastronomia?",
    answer: "Nossos pacotes incluem salgados premium fritos na hora, doces artesanais, bolo temático, além de bebidas (sucos, refrigerantes e água) servidas à vontade durante todo o evento."
  },
  {
    question: "Qual a capacidade máxima do buffet?",
    answer: "Conseguimos acomodar confortavelmente até 120 convidados, garantindo espaço amplo para circulação, mesas bem distribuídas e total segurança nas áreas de brinquedos."
  },
  {
    question: "Como funciona a reserva da data?",
    answer: "Para garantir sua data, solicitamos um sinal de 30% do valor total. O restante pode ser parcelado no cartão de crédito ou quitado até 10 dias antes do evento."
  },
  {
    question: "Vocês oferecem monitores para as crianças?",
    answer: "Sim! Temos uma equipe de monitores altamente treinados que acompanham as crianças em todos os brinquedos, garantindo diversão segura enquanto os pais aproveitam a festa."
  }
];

// --- INTERNAL COMPONENTS ---

const MagicSparkles: React.FC = () => {
  const sparkles = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    color: ['#a5f3fc', '#facc15', '#ffffff', '#db2777', '#9333ea'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            borderRadius: '50%',
            boxShadow: `0 0 10px ${s.color}`
          }}
        />
      ))}
    </div>
  );
};

const MonthGrid: React.FC<{ year: number; month: number }> = ({ year, month }) => {
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const isDateAvailable = (day: number) => {
    const d = new Date(year, month, day);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (d < today) return false;
    if (d.getDay() === 0 || d.getDay() === 6) return (day + month) % 5 === 0;
    return (day + month) % 3 !== 0;
  };

  return (
    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 h-full">
      <h4 className="font-fredoka font-bold text-lg text-party-purple mb-4 text-center">
        {monthNames[month]}
      </h4>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
          <div key={d} className="text-[10px] font-bold text-slate-400">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const available = isDateAvailable(day);
          return (
            <div
              key={day}
              className={`
                aspect-square flex items-center justify-center rounded-lg font-bold text-[10px] md:text-xs transition-all
                ${available 
                  ? 'bg-party-cyan/30 text-party-purple shadow-sm' 
                  : 'bg-white text-slate-200 border border-slate-50'}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-lg"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] shadow-3xl border-4 border-party-purple flex flex-col overflow-hidden"
          >
            <div className="bg-party-purple p-8 text-white text-center relative shrink-0">
              <button onClick={onClose} className="absolute right-6 top-1/2 -translate-y-1/2 hover:rotate-90 transition-transform bg-white/20 p-2 rounded-full">
                <X size={24} />
              </button>
              <div className="flex flex-col items-center">
                <CalendarDays size={40} className="mb-2" />
                <h3 className="text-3xl md:text-4xl font-fredoka font-bold">Agenda {currentYear}</h3>
                <p className="text-sm md:text-base opacity-90 font-sora mt-1">Consulte a disponibilidade para o ano inteiro</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {months.map(m => (
                  <MonthGrid key={m} year={currentYear} month={m} />
                ))}
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-sm font-sora text-slate-600">
                  <div className="w-5 h-5 bg-party-cyan/40 rounded-lg shadow-sm" /> Disponível
                </div>
                <div className="flex items-center gap-2 text-sm font-sora text-slate-600">
                  <div className="w-5 h-5 bg-white border border-slate-200 rounded-lg" /> Indisponível
                </div>
              </div>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-party-purple via-party-pink to-party-orange text-white text-center rounded-2xl font-fredoka font-bold text-lg shadow-xl shadow-party-purple/30 hover:shadow-party-purple/50 transition-all transform hover:-translate-y-1"
              >
                Garantir Minha Data Agora
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const GlobalBalloons: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const balloons = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}vw`,
    color: i % 3 === 0 ? '#9333ea' : i % 3 === 1 ? '#f97316' : '#a5f3fc',
    size: Math.random() * 40 + 30,
    top: `${Math.random() * 100}vh`,
    speed: Math.random() * 0.5 + 0.2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden max-w-[100vw]">
       {balloons.map((b) => (
         <motion.div
            key={b.id}
            style={{ 
              position: 'absolute',
              left: b.left,
              top: b.top,
              y: useTransform(scrollYProgress, [0, 1], [0, -1000 * b.speed]) 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
         >
           <svg 
            width={b.size} 
            height={b.size * 1.2} 
            viewBox="0 0 24 30" 
            fill={b.color}
            className="drop-shadow-lg opacity-80"
           >
             <path d="M12 0C5.373 0 0 5.373 0 12c0 5.09 3.197 9.426 7.686 11.196L7.5 25h9l-.186-1.804C20.803 21.426 24 17.09 24 12c0-6.627-5.373-12-12-12zm0 28c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z" />
             <path d="M16 6c-1-1-3-2-5-1" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
           </svg>
         </motion.div>
       ))}
    </div>
  );
};

const ContinuousConfetti: React.FC = () => {
  const pieces = Array.from({ length: 80 });
  const colors = ['#9333ea', '#db2777', '#facc15', '#a5f3fc', '#ffffff', '#f97316'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-30 h-full">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{ 
            top: "105%", 
            opacity: [0, 0.8, 0.8, 0],
            rotateX: [0, 360, 720],
            rotateY: [0, 720, 360],
            rotateZ: [0, 360 + Math.random() * 360],
            x: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{ 
            duration: Math.random() * 12 + 6,
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            backgroundColor: colors[i % colors.length],
            borderRadius: Math.random() > 0.6 ? '50%' : '2px',
            transformStyle: 'preserve-3d'
          }}
        />
      ))}
    </div>
  );
};

const PartySectionTitle: React.FC<{ title: string, subtitle?: string, subtitleClassName?: string, glitch?: boolean }> = ({ title, subtitle, subtitleClassName, glitch = false }) => {
  const glitchVariants: Variants = {
    normal: { skewX: 0, x: 0, opacity: 1 },
    glitch: {
      skewX: [0, 10, -10, 0],
      x: [0, -2, 2, 0],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4 + Math.random() * 4,
      }
    }
  };

  return (
    <div className="text-center mb-16 md:mb-24 flex flex-col items-center px-4 relative z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-party-purple via-party-pink to-party-yellow opacity-100 rounded-[2rem] blur-lg animate-pulse"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-party-cyan via-party-purple to-party-pink rounded-[2rem] opacity-70 blur-md"></div>
        
        <div className="relative bg-gradient-to-br from-party-purple via-party-pink to-party-cyan px-8 py-4 md:px-14 md:py-6 rounded-[2rem] shadow-[0_0_50px_rgba(147,51,234,0.4)] border-4 border-white/30 overflow-hidden group">
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-fredoka font-bold text-white leading-tight flex flex-wrap justify-center gap-x-2 drop-shadow-md"
              variants={glitch ? glitchVariants : {}}
              animate={glitch ? "glitch" : "normal"}
            >
                {title.split(" ").map((word, wIndex) => (
                   <span key={wIndex} className="inline-block whitespace-nowrap">
                      {word.split("").map((char, cIndex) => (
                        <motion.span
                            key={`${wIndex}-${cIndex}`}
                            initial={{ y: 0, rotate: 0 }}
                            animate={{ 
                                y: [0, -5, 0],
                                rotate: [0, 2, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random(),
                                repeat: Infinity,
                                delay: (wIndex + cIndex) * 0.1,
                                ease: "easeInOut"
                            }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                      ))}
                   </span>
                ))}
            </motion.h2>
        </div>
      </motion.div>

      {subtitle && (
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="relative mt-8"
        >
             <div className="absolute inset-0 bg-white/50 blur-xl rounded-full"></div>
             <p className={`relative text-lg md:text-xl max-w-3xl mx-auto leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm ${subtitleClassName || "text-gray-800 font-sora font-bold"}`}>
                {subtitle}
            </p>
        </motion.div>
      )}
    </div>
  );
};

const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ 
                opacity: 1, 
                y: 0, 
                scale: [1, 1.05, 1],
            }}
            transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                default: { duration: 0.3 }
            }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.8)] flex items-center justify-center cursor-pointer border-4 border-white ring-4 ring-[#25D366]/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            >
              <MessageCircle size={32} className="md:w-10 md:h-10" fill="white" />
            </motion.div>
          </motion.div>
        </a>
      )}
    </AnimatePresence>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const bg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]);
  const backdrop = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(16px)"]);
  const shadow = useTransform(scrollY, [0, 50], ["0 0 0 rgba(0,0,0,0)", "0 10px 30px -5px rgba(0, 0, 0, 0.1)"]);
  const border = useTransform(scrollY, [0, 50], ["rgba(147, 51, 234, 0)", "rgba(147, 51, 234, 0.1)"]);
  const height = useTransform(scrollY, [0, 50], ["6.5rem", "5rem"]); 

  const navColors = [
      'text-party-purple hover:text-party-pink', 
      'text-party-orange hover:text-party-pink', 
      'text-party-cyan hover:text-party-orange', 
      'text-party-yellow hover:text-party-purple',
      'text-party-purple hover:text-party-pink',
      'text-party-cyan hover:text-party-yellow',
  ];

  const menuItems = ["Início", "Atrações", "Cardápio", "Segurança", "Depoimentos", "Localização", "FAQ"];

  return (
    <motion.nav 
      style={{ 
        backgroundColor: bg,
        backdropFilter: backdrop,
        boxShadow: shadow,
        borderBottomColor: border,
        height: height
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2"></div>
          
          <div className="hidden md:flex items-center space-x-6 font-fredoka font-bold text-base lg:text-lg">
            {menuItems.map((item, index) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`} 
                className={`${navColors[index % navColors.length]} transition-all transform hover:scale-110 drop-shadow-sm`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <motion.a 
               href={WHATSAPP_LINK}
               target="_blank"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-party-orange to-party-yellow text-white rounded-full font-fredoka font-bold shadow-[0_4px_15px_rgba(249,115,22,0.3)] border-2 border-white/20"
             >
               <MessageCircle size={20} /> Orçamento
             </motion.a>

             <button 
               className="md:hidden z-50 p-2 text-party-purple bg-party-purple/10 rounded-xl backdrop-blur-sm border border-party-purple/20"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100vh' }}
                exit={{ opacity: 0, height: 0 }}
                className="fixed inset-0 top-0 left-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col pt-24 px-6 gap-6 md:hidden overflow-hidden"
              >
                {menuItems.map((item, i) => (
                  <motion.a 
                    key={item} 
                    href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`text-3xl font-fredoka font-bold py-4 border-b border-gray-100 ${navColors[i % navColors.length]}`}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero: React.FC = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set((clientX - centerX) / centerX);
    mouseY.set((clientY - centerY) / centerY);
  };

  const xContent = useTransform(mouseX, [-1, 1], [-30, 30]);
  const yContentMouse = useTransform(mouseY, [-1, 1], [-30, 30]);

  const springConfig = { damping: 25, stiffness: 120 };
  const xContentSpring = useSpring(xContent, springConfig);
  const yContentSpring = useSpring(yContentMouse, springConfig);

  const yContentScroll = useTransform(scrollY, [0, 1000], [0, 250]);

  return (
    <section 
      id="inicio" 
      className="pt-32 pb-20 md:pt-40 md:pb-24 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 perspective-1000"
      onMouseMove={handleMouseMove}
    >
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      
      {/* Magic Glow Effects Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-party-purple/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-party-cyan/20 rounded-full blur-[140px]" 
          />
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-party-pink/10 rounded-full blur-[160px]" 
          />
          <MagicSparkles />
      </div>

      <motion.div 
        style={{ y: yContentScroll, x: xContentSpring, translateY: yContentSpring }} 
        className="max-w-6xl mx-auto w-full flex flex-col items-center relative z-10 text-center"
      >
        <div className="flex flex-col items-center relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
              className="w-full flex justify-center mb-4 md:mb-0 md:-mt-40 relative z-20"
            >
              <motion.img 
                src="https://i.imgur.com/Ky6MZL1.png" 
                alt="Mascote Ateliê Kids" 
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[90%] md:w-[80%] lg:w-[70%] h-auto drop-shadow-[0_25px_60px_rgba(0,0,0,0.2)] relative z-10"
              />
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
               className="relative z-40 mt-4 md:mt-0 flex flex-wrap justify-center gap-6 px-4"
            >
                 <motion.a 
                    href="#atracoes"
                    whileHover={{ scale: 1.15, rotate: 3, boxShadow: "0 20px 40px rgba(165,243,252,0.6)" }}
                    whileTap={{ scale: 0.9 }}
                    className="group py-5 px-10 md:py-6 md:px-14 bg-white/95 text-gray-800 border-4 border-party-cyan rounded-full font-fredoka font-bold text-xl md:text-2xl flex items-center justify-center gap-3 backdrop-blur-xl shadow-[0_15px_35px_rgba(165,243,252,0.4)] hover:bg-party-cyan transition-all relative overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
                    <Wand2 className="text-party-orange group-hover:rotate-12 transition-transform" size={32} /> Ver atrações
                 </motion.a>

                 <motion.button 
                    onClick={() => setIsCalendarOpen(true)}
                    whileHover={{ scale: 1.15, rotate: -3, boxShadow: "0 20px 40px rgba(147,51,234,0.6)" }}
                    whileTap={{ scale: 0.9 }}
                    className="group py-5 px-10 md:py-6 md:px-14 bg-gradient-to-r from-party-purple via-party-pink to-party-orange text-white rounded-full font-fredoka font-bold text-xl md:text-2xl flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(147,51,234,0.4)] border-4 border-white/30 relative overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                    <CalendarDays size={32} /> Disponibilidade
                 </motion.button>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-slate-50 relative overflow-hidden">
      <PartySectionTitle 
        title="Dúvidas Frequentes" 
        subtitle="Tudo o que você precisa saber para planejar sua festa"
        subtitleClassName="font-fredoka text-gray-700"
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden ${isOpen ? 'border-party-orange shadow-lg' : 'border-gray-100 hover:border-party-cyan'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 text-left"
                >
                  <span className={`font-fredoka font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-party-orange' : 'text-gray-800'}`}>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-party-orange text-white' : 'bg-party-cyan/20 text-party-cyan'}`}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8">
                        <div className="h-px w-full bg-gray-100 mb-6" />
                        <p className="font-sora text-gray-600 leading-relaxed md:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GastronomySection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { 
      name: "Salgados Premium", 
      icon: <ChefHat size={32} />, 
      desc: "Coxinhas, quibes, risoles e muito mais, tudo frito na hora!",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=600",
      glow: "hover:shadow-neon-orange",
      border: "hover:border-party-orange"
    },
    { 
      name: "Doces Artesanais", 
      icon: <Cake size={32} />, 
      desc: "Brigadeiros gourmet, beijinhos e doces finos que derretem na boca.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600",
      glow: "hover:shadow-neon-pink",
      border: "hover:border-party-pink"
    },
    { 
      name: "Bebidas", 
      icon: <Utensils size={32} />, 
      desc: "Sucos naturais, refrigerantes e água servidos à vontade.",
      image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=600",
      glow: "hover:shadow-neon-cyan",
      border: "hover:border-party-cyan"
    }
  ];

  return (
    <section id="cardapio" className="py-20 relative bg-white overflow-hidden">
       <PartySectionTitle 
         title="Cardápio Delicioso" 
         subtitle="Sabores que encantam crianças e adultos!" 
         glitch={true}
         subtitleClassName="font-fredoka text-transparent bg-clip-text bg-gradient-to-r from-party-purple via-party-pink to-party-orange font-bold"
       />
       
       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`bg-slate-50 p-6 md:p-8 rounded-[2.5rem] border-4 border-slate-100 ${item.border} ${item.glow} transition-all duration-500 shadow-xl group relative overflow-hidden flex flex-col items-center cursor-pointer`}
              whileHover={{ scale: 1.05 }}
            >
               <motion.div 
                 layout
                 className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-800 mb-6 shadow-sm border border-slate-100 group-hover:rotate-12 transition-transform duration-500"
               >
                 {item.icon}
               </motion.div>
               <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-4 text-center group-hover:text-party-orange transition-colors">{item.name}</h3>
               <p className="text-gray-600 font-sora text-center text-sm md:text-base mb-4 leading-relaxed">{item.desc}</p>
               
               <AnimatePresence>
                 {hoveredIndex === index && (
                   <motion.div
                     initial={{ height: 0, opacity: 0, scale: 0.8 }}
                     animate={{ height: 200, opacity: 1, scale: 1 }}
                     exit={{ height: 0, opacity: 0, scale: 0.8 }}
                     transition={{ duration: 0.4, ease: "circOut" }}
                     className="w-full mt-4 rounded-3xl overflow-hidden shadow-inner relative"
                   >
                     <img 
                       src={item.image} 
                       alt={item.name}
                       className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
          ))}
       </div>
    </section>
  );
};

const AttractionsSection: React.FC = () => {
    const extendedAttractions = [...ATTRACTIONS_DATA, ...ATTRACTIONS_DATA];

    return (
        <section id="atracoes" className="py-20 bg-slate-50 relative overflow-hidden">
            <PartySectionTitle 
              title="Atrações Incríveis" 
              subtitle="Diversão garantida para todas as idades com loop infinito de alegria" 
              subtitleClassName="font-fredoka text-transparent bg-clip-text bg-gradient-to-r from-party-cyan via-party-purple to-party-pink font-bold"
            />
            
            <div className="relative w-full overflow-hidden py-10">
                <motion.div 
                    className="flex gap-8 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        duration: 35, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    style={{ width: "fit-content" }}
                >
                    {extendedAttractions.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-[280px] md:w-[350px] bg-white rounded-[2rem] p-8 border-4 ${feature.borderColor} shadow-xl relative overflow-hidden group transition-all hover:scale-105`}
                        >
                            <div className={`absolute -right-10 -top-10 w-40 h-40 ${feature.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                            
                            <div className={`w-20 h-20 ${feature.color} bg-opacity-20 rounded-2xl flex items-center justify-center mb-6`}>
                               <div className="text-gray-800">
                                   {feature.icon}
                               </div>
                            </div>
                            
                            <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 font-sora leading-relaxed text-sm md:text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const TestimonialsSection: React.FC = () => {
    return (
        <section id="depoimentos" className="py-20 bg-white relative">
            <PartySectionTitle 
              title="O Que Dizem" 
              subtitle="A opinião de quem já viveu a experiência" 
              subtitleClassName="font-fredoka text-gray-800 font-medium"
            />
            
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        whileHover={{ rotate: i % 2 === 0 ? 1 : -1, scale: 1.02 }}
                        className="bg-slate-50 p-8 rounded-[2rem] border border-gray-100 shadow-lg relative"
                    >
                        <div className="flex gap-1 mb-4">
                            {[...Array(t.stars)].map((_, si) => (
                                <motion.div
                                   key={si}
                                   animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                                   transition={{ duration: 2, repeat: Infinity, delay: si * 0.2 + i }}
                                >
                                   <Star size={20} className="fill-party-yellow text-party-yellow" />
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-gray-700 font-sora italic mb-6">"{t.content}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-party-purple to-party-pink rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold font-fredoka text-gray-900">{t.name}</h4>
                                <p className="text-sm text-gray-500 font-sora">{t.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const SafetySection: React.FC = () => {
  const safetyFeatures = [
    {
      icon: <Users size={32} />,
      title: "Monitores Treinados",
      desc: "Equipe capacitada para garantir a diversão com total atenção.",
      color: "bg-party-purple",
      border: "border-party-purple"
    },
    {
      icon: <Lock size={32} />,
      title: "Controle de Acesso",
      desc: "Entrada e saída controladas eletronicamente para segurança.",
      color: "bg-party-cyan",
      border: "border-party-cyan"
    },
    {
      icon: <Wand2 size={32} />,
      title: "Brinquedos Certificados",
      desc: "Manutenção preventiva semanal em todas as atrações.",
      color: "bg-party-pink",
      border: "border-party-pink"
    },
    {
      icon: <Sparkles size={32} />,
      title: "Higienização Total",
      desc: "Limpeza constante antes, durante e após cada evento.",
      color: "bg-party-yellow",
      border: "border-party-yellow"
    }
  ];

  return (
    <section id="seguranca" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 -left-10 w-60 h-60 bg-party-purple/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 -right-10 w-60 h-60 bg-party-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <PartySectionTitle 
            title="Diversão com Segurança Total" 
            subtitle="Cuidamos de tudo para você relaxar e aproveitar"
            subtitleClassName="font-fredoka text-gray-700 font-medium"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className={`bg-white p-6 rounded-[2rem] border-2 ${item.border} hover:shadow-lg hover:shadow-${item.color}/20 transition-all group relative overflow-hidden`}
                >
                    <div className={`absolute -right-4 -top-4 w-24 h-24 ${item.color}/10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                    
                    <div className={`relative w-16 h-16 ${item.color}/10 rounded-2xl flex items-center justify-center ${item.color.replace('bg-', 'text-')} mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                        {item.icon}
                    </div>
                    <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2 relative z-10">{item.title}</h3>
                    <p className="font-sora text-sm text-gray-600 leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

const LocationSection: React.FC = () => {
    return (
        <section id="localizacao" className="py-20 bg-party-cyan/5 relative">
            <PartySectionTitle 
              title="Nossa Localização" 
              subtitle="Venha nos fazer uma visita!" 
              subtitleClassName="font-fredoka text-gray-800 font-medium"
            />
            
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 space-y-6"
                >
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <MapPin className="text-party-purple" /> Endereço
                        </h3>
                        <p className="text-gray-600 font-sora text-lg leading-relaxed mb-6">
                            Av. Elias Maluf, Wanel Ville<br/>
                            Sorocaba - SP<br/>
                            CEP: 18000-000
                        </p>
                        <a 
                            href="https://maps.google.com" 
                            target="_blank" 
                            className="inline-flex items-center gap-2 text-party-purple font-bold hover:text-party-pink transition-colors"
                        >
                            Ver no Google Maps <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <CalendarClock className="text-party-orange" /> Horário de Atendimento
                        </h3>
                         <ul className="space-y-2 text-gray-600 font-sora">
                            <li className="flex justify-between">
                                <span>Segunda:</span> <span className="font-bold">Fechado</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Terça a Sexta:</span> <span className="font-bold">13h às 22h</span>
                            </li>
                             <li className="flex justify-between">
                                <span>Sábado e Domingo:</span> <span className="font-bold">10h às 22h</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="flex-1 w-full h-[450px] bg-gray-200 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white"
                >
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0254648900777!2d-47.49578962386128!3d-23.49559255918092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58a640161491f%3A0x1338d82d499385b7!2sWanel%20Ville%2C%20Sorocaba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1709230538964!5m2!1spt-BR!2sbr" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-party-purple via-party-pink to-party-cyan"></div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:col-span-4 gap-12 relative z-10">
            <div className="col-span-1 md:col-span-2">
                <h3 className="text-3xl font-fredoka font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-party-cyan to-party-purple">
                  Festa Total
                </h3>
                <p className="text-gray-400 font-sora max-w-sm mb-8">
                  Criando memórias mágicas e momentos inesquecíveis para você e sua família. O melhor buffet infantil de Sorocaba e região.
                </p>
                <div className="flex gap-4">
                  {[MessageCircle, Instagram, MapPin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-party-cyan transition-colors group">
                      <Icon size={20} className="group-hover:animate-spin-slow" />
                    </a>
                  ))}
                </div>
            </div>
            
            <div>
              <h4 className="text-xl font-fredoka font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-3 font-sora text-gray-400">
                <li><a href="#inicio" className="hover:text-party-cyan transition-colors">Início</a></li>
                <li><a href="#atracoes" className="hover:text-party-cyan transition-colors">Atrações</a></li>
                <li><a href="#cardapio" className="hover:text-party-cyan transition-colors">Cardápio</a></li>
                <li><a href="#depoimentos" className="hover:text-party-cyan transition-colors">Depoimentos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-fredoka font-bold mb-6">Contato</h4>
              <ul className="space-y-3 font-sora text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0 text-party-purple" />
                  <span>Av. Elias Maluf, Wanel Ville<br/>Sorocaba - SP</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle size={20} className="shrink-0 text-party-orange" />
                  <span>(15) 99999-9999</span>
                </li>
                <li className="flex items-center gap-3">
                  <CalendarClock size={20} className="shrink-0 text-party-pink" />
                  <span>Ter - Dom: 13h às 22h</span>
                </li>
              </ul>
            </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 font-sora text-sm">
          <p>© {new Date().getFullYear()} Festa Total. Todos os direitos reservados.</p>
        </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-party-pink selection:text-white">
      <GlobalBalloons />
      <Header />
      <Hero />
      
      <div className="relative">
         <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
            <ContinuousConfetti />
         </div>

         <div className="relative z-20">
            <AttractionsSection />
            <GastronomySection />
            <SafetySection />
            <TestimonialsSection />
            <FAQSection />
            <LocationSection />
         </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
