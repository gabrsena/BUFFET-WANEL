
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
  Lock
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
    content: "Buffet nota 10 no Wanel Ville. Comida farta e quentinha. Super recoendo para quem quer tranquilidade e diversão.",
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
    description: "Diversão que faz os olhinhos brilharem!",
    color: "bg-party-purple",
    glow: "shadow-neon-purple",
    borderColor: "border-party-purple"
  },
  {
    icon: <Baby size={40} />,
    title: "Área Baby",
    description: "Um espaço lúdico e protegido, projetado especialmente para os pequenos exploradores brilharem com total tranquilidade.",
    color: "bg-party-pink",
    glow: "shadow-neon-pink",
    borderColor: "border-party-pink"
  },
  {
    icon: <Gamepad2 size={40} />,
    title: "Arena Games",
    description: "O paraíso dos gamers! Consoles de última geração para garantir o entretenimento dos mais velhos.",
    color: "bg-party-cyan",
    glow: "shadow-neon-cyan",
    borderColor: "border-party-cyan"
  }
];

// --- INTERNAL COMPONENTS ---

// 0. Horizontal Moving Clouds Component - Refined for Ethereal feel
const MovingClouds: React.FC<{ zIndex: number, count?: number, speedMultiplier?: number }> = ({ zIndex, count = 5, speedMultiplier = 1 }) => {
  const clouds = Array.from({ length: count }).map((_, i) => {
    const isDense = Math.random() > 0.75;
    const isVerySlow = Math.random() > 0.8;
    return {
      id: i,
      top: `${Math.random() * 95}%`,
      delay: Math.random() * 40,
      duration: ((Math.random() * 40 + 40) / (isVerySlow ? 0.5 : 1)) / speedMultiplier,
      size: isDense ? Math.random() * 160 + 120 : Math.random() * 100 + 70,
      opacity: isDense ? Math.random() * 0.3 + 0.35 : Math.random() * 0.15 + 0.05,
      blur: isDense ? 'blur-[2px]' : 'blur-[5px]',
      yAmplitude: Math.random() * 30 + 10,
      floatDelay: Math.random() * 5
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex }}>
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ x: "-40vw", opacity: 0 }}
          animate={{ 
            x: "120vw", 
            opacity: [0, cloud.opacity, cloud.opacity, 0],
            y: [0, cloud.yAmplitude, -cloud.yAmplitude, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{
            x: { duration: cloud.duration, repeat: Infinity, delay: cloud.delay, ease: "linear" },
            opacity: { duration: cloud.duration, repeat: Infinity, delay: cloud.delay, times: [0, 0.2, 0.8, 1], ease: "linear" },
            y: { duration: 10 + Math.random() * 10, repeat: Infinity, ease: "easeInOut", delay: cloud.floatDelay },
            scale: { duration: 15 + Math.random() * 10, repeat: Infinity, ease: "easeInOut", delay: cloud.floatDelay }
          }}
          style={{ 
            position: 'absolute', 
            top: cloud.top,
          }}
        >
          <Cloud 
            size={cloud.size} 
            className={`text-white fill-white filter drop-shadow-sm ${cloud.blur}`} 
            style={{ opacity: 1 }} // Controlled by parent motion.div
          />
        </motion.div>
      ))}
    </div>
  );
};

// 2. Global Balloons (Parallax Effect)
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

// 4. Confetti Component
const ContinuousConfetti: React.FC = () => {
  const pieces = Array.from({ length: 40 });
  const colors = ['#9333ea', '#db2777', '#facc15', '#a5f3fc', '#ffffff'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-30 h-full">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{ 
            top: "105%", 
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 360 + Math.random() * 360],
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{ 
            duration: Math.random() * 15 + 10,
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 20
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            width: Math.random() * 8 + 6,
            height: Math.random() * 8 + 6,
            backgroundColor: colors[i % colors.length],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

// 6. Section Title
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
  const height = useTransform(scrollY, [0, 50], ["6rem", "4.5rem"]); 

  const navColors = [
      'text-party-purple hover:text-party-pink', 
      'text-party-orange hover:text-party-pink', 
      'text-party-cyan hover:text-party-orange', 
      'text-party-yellow hover:text-party-purple',
      'text-party-purple hover:text-party-pink',
      'text-party-cyan hover:text-party-yellow',
  ];

  const menuItems = ["Início", "Atrações", "Cardápio", "Segurança", "Depoimentos", "Localização"];

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
      className="fixed top-0 left-0 right-0 z-40 border-b border-transparent transition-all duration-300 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 group cursor-pointer z-50">
          </div>
          
          <div className="hidden md:flex items-center space-x-8 font-fredoka font-bold text-lg">
            {menuItems.map((item, index) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`} 
                className={`${navColors[index % navColors.length]} transition-all transform hover:scale-110 hover:rotate-3 drop-shadow-sm`}
              >
                {item}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden z-50 p-2 text-party-purple bg-party-purple/10 rounded-xl backdrop-blur-sm border border-party-purple/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

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

  const xContent = useTransform(mouseX, [-1, 1], [-20, 20]);
  const yContentMouse = useTransform(mouseY, [-1, 1], [-20, 20]);
  const xBlobs = useTransform(mouseX, [-1, 1], [30, -30]);
  const yBlobsMouse = useTransform(mouseY, [-1, 1], [30, -30]);

  const springConfig = { damping: 25, stiffness: 150 };
  const xContentSpring = useSpring(xContent, springConfig);
  const yContentSpring = useSpring(yContentMouse, springConfig);
  const xBlobsSpring = useSpring(xBlobs, springConfig);
  const yBlobsSpring = useSpring(yBlobsMouse, springConfig);

  const yBlobsScroll = useTransform(scrollY, [0, 1000], [0, 400]);
  const yContentScroll = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section 
      id="inicio" 
      className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 perspective-1000"
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        style={{ y: yBlobsScroll, x: xBlobsSpring, translateY: yBlobsSpring }} 
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-20 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-party-orange/10 rounded-full blur-[60px] md:blur-[80px] animate-pulse mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-party-yellow/20 rounded-full blur-[60px] md:blur-[100px] animate-float mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-party-cyan/30 rounded-full blur-[100px]" />
      </motion.div>
      
      {/* Background Clouds (Behind Mascot) - Dense & Ethereal setup */}
      <MovingClouds zIndex={5} count={40} speedMultiplier={0.7} />

      <motion.div 
        style={{ y: yContentScroll, x: xContentSpring, translateY: yContentSpring }} 
        className="max-w-6xl mx-auto w-full flex flex-col items-center relative z-10 text-center"
      >
        <div className="flex flex-col items-center relative w-full">
            
            {/* Foreground Clouds (In front of Mascot) - Dense & Ethereal setup */}
            <MovingClouds zIndex={30} count={30} speedMultiplier={1.5} />

            {/* Hero Image - Optimized for focus, moved up on Desktop to reveal buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full flex justify-center mb-8 md:mb-2 md:-mt-32 relative z-20"
            >
              <img 
                src="https://i.imgur.com/i1z4W2C.png" 
                alt="Mascote Ateliê Kids" 
                className="w-[90%] h-auto drop-shadow-2xl"
              />
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4, type: "spring" }}
               className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full max-w-lg mx-auto relative z-40 md:-mt-6"
            >
                 <motion.a 
                   href={WHATSAPP_LINK}
                   whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(249, 115, 22, 0.6)" }}
                   whileTap={{ scale: 0.95 }}
                   animate={{ scale: [1, 1.03, 1] }}
                   transition={{ scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                   className="flex-1 py-4 md:py-5 px-6 md:px-8 bg-gradient-to-r from-party-orange to-party-yellow text-white rounded-2xl font-bold text-lg md:text-xl shadow-[0_10px_25px_-5px_rgba(249,115,22,0.4)] flex items-center justify-center gap-3 transition-all border-2 border-white/30"
                 >
                    <MessageCircle size={24} /> Fazer Orçamento
                 </motion.a>
                 <motion.a 
                    href="#atracoes"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-4 md:py-5 px-6 md:px-8 bg-white/80 text-gray-800 border-4 border-party-cyan rounded-2xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 hover:bg-party-cyan/20 shadow-md transition-all hover:shadow-[0_10px_25px_-5px_rgba(165,243,252,0.4)] backdrop-blur-sm"
                 >
                    <Wand2 className="animate-spin-slow text-party-orange" size={24} /> Ver Atrações
                 </motion.a>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const GastronomySection: React.FC = () => {
  const menuItems = [
    { name: "Salgados Premium", icon: <ChefHat size={32} />, desc: "Coxinhas, quibes, risoles e muito mais, tudo frito na hora!" },
    { name: "Doces Artesanais", icon: <Cake size={32} />, desc: "Brigadeiros gourmet, beijinhos e doces finos que derretem na boca." },
    { name: "Bebidas", icon: <Utensils size={32} />, desc: "Sucos naturais, refrigerantes e água servidos à vontade." }
  ];

  return (
    <section id="cardapio" className="py-20 relative bg-white">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-3xl border-4 border-party-yellow/20 hover:border-party-yellow transition-colors shadow-lg hover:shadow-neon-yellow group"
            >
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                 className="w-16 h-16 bg-party-yellow/20 rounded-full flex items-center justify-center text-party-orange mb-6 mx-auto"
               >
                 {item.icon}
               </motion.div>
               <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-3 text-center">{item.name}</h3>
               <p className="text-gray-600 font-sora text-center">{item.desc}</p>
            </motion.div>
          ))}
       </div>
    </section>
  );
};

const AttractionsSection: React.FC = () => {
    return (
        <section id="atracoes" className="py-20 bg-slate-50 relative overflow-hidden">
            <PartySectionTitle 
              title="Atrações Incríveis" 
              subtitle="Diversão garantida para todas as idades" 
              subtitleClassName="font-fredoka text-transparent bg-clip-text bg-gradient-to-r from-party-cyan via-party-purple to-party-pink font-bold"
            />
            
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {ATTRACTIONS_DATA.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                        className={`bg-white rounded-[2rem] p-8 border-4 ${feature.borderColor} shadow-xl hover:${feature.glow} transition-all duration-300 relative overflow-hidden group`}
                    >
                        <div className={`absolute -right-10 -top-10 w-40 h-40 ${feature.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                        
                        <motion.div 
                            animate={{ 
                                y: [0, -8, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: index * 0.3
                            }}
                            className={`w-20 h-20 ${feature.color} bg-opacity-20 rounded-2xl flex items-center justify-center text-${feature.color.replace('bg-', '')} mb-6`}
                        >
                           <div className={feature.title === "Brinquedos Incríveis" ? "text-party-purple" : feature.title === "Área Baby" ? "text-party-pink" : "text-party-cyan"}>
                               {feature.icon}
                           </div>
                        </motion.div>
                        
                        <h3 className="text-2xl font-fredoka font-bold text-gray-800 mb-4">{feature.title}</h3>
                        <p className="text-gray-600 font-sora leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
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
                  Buffet dos Sonhos
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
          <p>© {new Date().getFullYear()} Buffet dos Sonhos. Todos os direitos reservados.</p>
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
