import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { CATEGORIES } from '../constants';
import { useDistros } from '../hooks/useDistros';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';

const defaultTranslations = {
  pt: {
    heroTitle: "Portal de distros Linux",
    heroSubtitle: "Encontre e baixe a sua",
    searchPlaceholder: "Pesquise por distros Linux...",
    searchButton: "Buscar",
    beginnerText: "É iniciante no Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "Uma ferramenta que te ajuda na escolha da melhor distro.",
    postDownloadTitle: "O que fazer depois de baixar sua distros?",
    viewArticle: "Ver artigo",
    distroListTitle: "Encontre e baixe a sua distro Linux",
    moreDistrosText: "Para ver mais distros, pesquise na barra de busca ou use os filtros no topo do site.",
    backToTop: "Voltar ao topo",
    allDistros: "Todas as distros",
    learnMore: "Conhecer e Baixar",
    categories: {
      "Todas as distros": "Todas as distros",
      "Pc antigo": "PC antigo",
      "Brasileira": "Brasileira",
      "Hacking": "Hacking",
      "Jogos": "Jogos",
      "Educação": "Educacional",
      "Raspberry": "Raspberry Pi",
      "Design": "Design",
      "Servidor": "Servidor",
      "Cinnamon": "Cinnamon",
      "Gnome": "Gnome",
      "KDE": "KDE",
      "LXDE": "LXDE",
      "LXQt": "LXQt",
      "Mate": "Mate",
      "Pantheon": "Pantheon",
      "Plasma": "Plasma",
      "Unity": "Unity",
      "XFCE": "XFCE",
      "Multimidia": "Multimídia"
    }
  },
  en: {
    heroTitle: "Linux Distro Portal",
    heroSubtitle: "Find and download yours",
    searchPlaceholder: "Search for Linux distros...",
    searchButton: "Search",
    beginnerText: "New to Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "A tool that helps you choose the best distro.",
    postDownloadTitle: "What to do after downloading your distro?",
    viewArticle: "View article",
    distroListTitle: "Find and download your Linux distro",
    moreDistrosText: "To see more distros, search in the search bar or use the filters at the top of the site.",
    backToTop: "Back to top",
    allDistros: "All distros",
    learnMore: "Learn and Download",
    categories: {
      "Todas as distros": "All distros",
      "Pc antigo": "Old PC",
      "Brasileira": "Brazilian",
      "Hacking": "Hacking",
      "Jogos": "Gaming",
      "Educação": "Education",
      "Raspberry": "Raspberry Pi",
      "Design": "Design",
      "Servidor": "Server",
      "Cinnamon": "Cinnamon",
      "Gnome": "Gnome",
      "KDE": "KDE",
      "LXDE": "LXDE",
      "LXQt": "LXQt",
      "Mate": "Mate",
      "Pantheon": "Pantheon",
      "Plasma": "Plasma",
      "Unity": "Unity",
      "XFCE": "XFCE",
      "Multimidia": "Multimedia"
    }
  },
  es: {
    heroTitle: "Portal de distros Linux",
    heroSubtitle: "Encuentra y descarga la tuya",
    searchPlaceholder: "Busca distros Linux...",
    searchButton: "Buscar",
    beginnerText: "¿Eres nuevo en Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "Una herramienta que te ayuda a elegir la mejor distro.",
    postDownloadTitle: "¿Qué hacer después de descargar tu distro?",
    viewArticle: "Ver artículo",
    distroListTitle: "Encuentra y descarga tu distro Linux",
    moreDistrosText: "Para ver más distros, busca en la barra de búsqueda o usa los filtros en la parte superior del sitio.",
    backToTop: "Volver arriba",
    allDistros: "Todas las distros",
    learnMore: "Conocer y Descargar",
    categories: {
      "Todas as distros": "Todas las distros",
      "Pc antigo": "PC antiguo",
      "Brasileira": "Brasileña",
      "Hacking": "Hacking",
      "Jogos": "Juegos",
      "Educação": "Educación",
      "Raspberry": "Raspberry Pi",
      "Design": "Diseño",
      "Servidor": "Servidor",
      "Cinnamon": "Cinnamon",
      "Gnome": "Gnome",
      "KDE": "KDE",
      "LXDE": "LXDE",
      "LXQt": "LXQt",
      "Mate": "Mate",
      "Pantheon": "Pantheon",
      "Plasma": "Plasma",
      "Unity": "Unity",
      "XFCE": "XFCE",
      "Multimidia": "Multimedia"
    }
  }
};

// Simple mapping for distro subtitles and descriptions that need translation
// In a real app, these would be in a CMS or a more robust translation file
const distroTranslations = {
  en: {
    'ubuntu-linux': { subtitle: 'A powerful distro for beginners and intermediate users.', description: 'Ubuntu is one of the most popular and widely used Linux distributions. Developed by Canonical, Ubuntu aims to provide an intuitive, friendly, and accessible desktop experience for users of all skill levels.' },
    'kali-linux': { subtitle: 'Kali Linux is an essential distro for security and penetration testing.', description: 'Kali Linux is a Linux distribution specialized in security and penetration testing. Designed for cybersecurity professionals and enthusiasts, Kali Linux offers a wide range of tools and features for security analysis, vulnerability exploration, and network auditing.' },
    'arch-linux': { subtitle: 'Arch Linux is a customizable distro aimed at advanced users.', description: 'Arch Linux is a lightweight and flexible Linux distribution, focused on simplicity, minimalism, and "Do It Yourself" (DIY) architecture. Designed for advanced users who want total control over their Linux experience, Arch Linux allows you to customize and build a tailored system, meeting individual needs.' },
    'opensuse': { subtitle: 'Stability and powerful tools for professionals.', description: 'openSUSE is a robust distribution, famous for the YaST configuration tool.' },
    'linux-mint': { subtitle: 'Definitive Guide 2026 — Simplicity and Classic Desktop', description: 'Linux Mint is the reference for simplicity and comfort for users seeking a familiar alternative to Windows. In 2026, it remains one of the most recommended distros for beginners, focusing on an "out-of-the-box" experience with elegance and stability based on Ubuntu LTS.' },
    'fedora-linux': { subtitle: 'Definitive Guide 2026 — Innovation, Desktop and Servers', description: 'Fedora Linux is Red Hat\'s technology laboratory, where the innovations of the future are tested today. In 2026, it remains the distro of choice for developers seeking the latest technologies in a polished and secure environment. It serves as the foundation for Red Hat Enterprise Linux (RHEL), balancing innovation with quality.' },
    'debian-linux': { subtitle: 'Definitive Guide 2026 — Stability, Servers and Ecosystem Base', description: 'Debian Linux is synonymous with extreme stability and an absolute commitment to free software. Created in 1993, it is the technical foundation for hundreds of other distros, such as Ubuntu. In 2026, it continues to support a huge portion of the internet infrastructure and critical global systems through its rigorous community development model.' },
    'manjaro': { subtitle: 'The power of Arch Linux in a simple and friendly way.', description: 'Manjaro brings the flexibility of Arch with easy installers and pre-configured drivers.' },
    'deepin': { subtitle: 'Beauty and elegance with a unique interface.', description: 'Deepin is famous for its extremely polished and beautiful desktop environment (DDE).' },
    'xubuntu': { subtitle: 'Lightness and elegance with the XFCE environment.', description: 'Xubuntu combines the solid base of Ubuntu with the XFCE desktop, ideal for machines with fewer resources.' },
    'elementary-os': { subtitle: 'Simplicity, focus and a macOS-inspired design.', description: 'Elementary OS focuses on a cohesive and minimalist user experience with its Pantheon desktop.' },
    'zorin-os': { subtitle: 'The perfect alternative to Windows and macOS.', description: 'Zorin OS is designed to be easy, allowing you to change the appearance to look like Windows or Mac.' },
    'mx-linux': { subtitle: 'Stability, useful tools and high performance.', description: 'MX Linux is a mid-weight distro that combines an elegant desktop with simple configuration.' },
    'slackware': { subtitle: 'The oldest Linux distribution still in activity.', description: 'Slackware focuses on stability and simplicity in the Unix style.' },
    'bodhi': { subtitle: 'Minimalism and the Moksha desktop.', description: 'Bodhi is a minimalist distro that uses the Moksha environment (fork of Enlightenment).' },
    'big-linux': { subtitle: 'One of the best Brazilian distros, focused on ease.', description: 'Big Linux is a Brazilian project that focuses on offering a complete and easy-to-use system.' },
    'lubuntu': { subtitle: 'Fast and light, perfect for old computers.', description: 'Lubuntu uses the LXQt environment to provide a functional system on limited hardware.' },
    'linux-lite': { subtitle: 'Simple, fast and free.', description: 'Linux Lite is designed to facilitate the transition from Windows to Linux.' },
    'pop-os': { subtitle: 'Developed for creators, developers and gamers.', description: 'Pop!_OS is the System76 distro, focused on productivity and workflow.' },
    'sparkylinux': { subtitle: 'Light, fast and customizable.', description: 'SparkyLinux offers several editions for different needs, from minimalist to complete.' },
    'mageia': { subtitle: 'Stable, secure and easy to use.', description: 'Mageia is a community fork of Mandriva Linux.' },
    'tails': { subtitle: 'Privacy and anonymity anywhere.', description: 'Tails is a live system that forces all connections through the Tor network.' },
    'parrot-os': { subtitle: 'Security, privacy and development.', description: 'Parrot OS is an alternative to Kali Linux, with a focus on security and development.' },
    'solus': { subtitle: 'A modern system for modern computers.', description: 'Solus is an independent distro that focuses on home use and multimedia.' },
    'edubuntu': { subtitle: 'Linux for education.', description: 'Edubuntu is the version of Ubuntu focused on schools and educational institutions.' },
    'kubuntu': { subtitle: 'Ubuntu with the power of KDE Plasma.', description: 'Kubuntu combines the Ubuntu base with the KDE Plasma desktop, highly customizable.' },
    'ubuntu-studio': { subtitle: 'A workstation for multimedia creators.', description: 'Ubuntu Studio comes pre-configured for audio, video and image editing.' },
    'ubuntu-cinnamon': { subtitle: 'Ubuntu with the Cinnamon desktop.', description: 'Ubuntu Cinnamon offers the Cinnamon desktop experience over the Ubuntu base.' },
    'ubuntu-kylin': { subtitle: 'The Chinese edition of Ubuntu.', description: 'Ubuntu Kylin is adapted for the Chinese market with the UKUI desktop.' },
    'ubuntu-mate': { subtitle: 'Classic retrospective with modern technologies.', description: 'Ubuntu MATE uses the MATE desktop, a continuation of the classic GNOME 2.' },
    'ubuntu-unity': { subtitle: 'The return of the Unity interface.', description: 'Ubuntu Unity brings back the Unity environment that was standard in Ubuntu for years.' },
    'regata-os': { subtitle: 'Focused on games and productivity, made in Brazil.', description: 'Regata OS is a Brazilian distro optimized for gamers and creators.' },
    'tiger-os': { subtitle: 'Focus on productivity and companies.', description: 'Tiger OS is a Brazilian distro focused on the corporate market and productivity.' },
    'mauna': { subtitle: 'Simplicity and beauty.', description: 'Mauna Linux is a Brazilian project that seeks to offer a polished and easy system.' },
    'steam-os': { subtitle: 'The Steam Deck system, focused on games.', description: 'SteamOS is designed to offer the best possible gaming experience.' },
    'endless-os': { subtitle: 'Knowledge for all, even without internet.', description: 'Endless OS comes with hundreds of pre-installed apps for offline use.' },
    'br-os': { subtitle: 'The Brazilian system for everyday life.', description: 'Br OS focuses on being a complete and familiar system for Brazilians.' },
    'chrome-os-flex': { subtitle: 'Turn your old PC into a Chromebook.', description: 'Chrome OS Flex is Google\'s version for old PCs and Macs.' },
    'fyde-os': { subtitle: 'ChromeOS with support for Android apps.', description: 'FydeOS is a fork of Chromium OS that adds support for Android and Linux apps.' },
    'red-hat': { subtitle: 'The corporate standard for servers and cloud.', description: 'RHEL is the leading commercial distribution for companies.' },
    'gentoo': { subtitle: 'Total customization through compilation.', description: 'Gentoo is a distro where the user compiles almost everything for their specific hardware.' },
    'antix': { subtitle: 'Extreme lightness without systemd.', description: 'AntiX is designed to be fast and light on very old computers.' },
    'alpine': { subtitle: 'Security, simplicity and efficiency in containers.', description: 'Alpine is a distro focused on security and small size, widely used in Docker.' },
    'void': { subtitle: 'An independent and stable distro.', description: 'Void Linux uses the runit init system and focuses on stability and simplicity.' },
    'raspberry-pi-os': { subtitle: 'The official system for the Raspberry Pi.', description: 'Raspberry Pi OS is optimized for Raspberry Pi hardware.' },
    'black-arch': { subtitle: 'Hacking and security based on Arch.', description: 'BlackArch contains thousands of tools for security testing.' },
    'backbox': { subtitle: 'Penetration testing and security assessment.', description: 'BackBox is a Ubuntu-based distro focused on forensics and security.' },
    'tuxedo-os': { subtitle: 'Optimized for TUXEDO hardware and more.', description: 'Tuxedo OS is a polished Ubuntu-based distro with KDE Plasma.' }
  },
  es: {
    'ubuntu-linux': { subtitle: 'Una poderosa distro para usuarios principiantes e intermedios.', description: 'Ubuntu es una de las distribuciones Linux más populares y ampliamente utilizadas. Desarrollado por la empresa Canonical, Ubuntu tiene como objetivo ofrecer una experiencia de escritorio intuitiva, amigável y accesible para usuarios de todos los niveles de habilidad.' },
    'kali-linux': { subtitle: 'Kali Linux es uma distro esencial para pruebas de seguridad y penetración.', description: 'Kali Linux es una distribución de Linux especializada en seguridad y pruebas de penetración. Diseñado para profesionales y entusiastas de la ciberseguridad, Kali Linux ofrece una amplia gama de herramientas y funciones para el análisis de seguridad, la exploración de vulnerabilidades y la auditoría de redes.' },
    'arch-linux': { subtitle: 'Arch Linux es una distro personalizable y dirigida a usuarios avanzados.', description: 'Arch Linux es una distribución de Linux ligera y flexible, centrada en la simplicidad, el minimalismo y la arquitectura "Hazlo tú mismo" (DIY). Diseñado para usuarios avanzados que desean un control total sobre su experiencia con Linux, Arch Linux le permite personalizar y construir un sistema a medida, satisfaciendo las necesidades individuales.' },
    'opensuse': { subtitle: 'Estabilidad y herramientas poderosas para profesionales.', description: 'openSUSE es una distribución robusta, famosa por la herramienta de configuración YaST.' },
    'linux-mint': { subtitle: 'Guía Definitiva 2026 — Simplicidad y Escritorio Clásico', description: 'Linux Mint es la referencia en simplicidad y comodidad para los usuarios que buscan una alternativa familiar a Windows. En 2026, sigue siendo una de las distros más recomendadas para principiantes, centrándose en una experiencia "lista para usar" con elegancia y estabilidad basada en Ubuntu LTS.' },
    'fedora-linux': { subtitle: 'Guía Definitiva 2026 — Innovación, Escritorio y Servidores', description: 'Fedora Linux es el laboratorio tecnológico de Red Hat, donde las innovaciones del futuro se prueban hoy. En 2026, sigue siendo la distro preferida por los desarrolladores que buscan las últimas tecnologías en un entorno pulido y seguro. Sirve como base para Red Hat Enterprise Linux (RHEL), equilibrando la innovación con la calidad.' },
    'debian-linux': { subtitle: 'Guía Definitiva 2026 — Estabilidad, Servidores y Base del Ecosistema', description: 'Debian Linux es sinónimo de estabilidad extrema y compromiso absoluto con el software libre. Creado en 1993, es la base técnica de cientos de otras distros, como Ubuntu. En 2026, continúa sustentando gran parte de la infraestructura de internet y sistemas críticos mundiales a través de su riguroso modelo de desarrollo comunitario.' },
    'manjaro': { subtitle: 'El poder de Arch Linux de forma sencilla y amigable.', description: 'Manjaro aporta la flexibilidad de Arch con instaladores fáciles y controladores preconfigurados.' },
    'deepin': { subtitle: 'Belleza y elegancia con una interfaz única.', description: 'Deepin es famoso por su entorno de escritorio (DDE) extremadamente pulido y hermoso.' },
    'xubuntu': { subtitle: 'Ligereza y elegancia con el entorno XFCE.', description: 'Xubuntu combina la base sólida de Ubuntu con el escritorio XFCE, ideal para máquinas con menos recursos.' },
    'elementary-os': { subtitle: 'Simplicidad, enfoque y un diseño inspirado en macOS.', description: 'Elementary OS se centra en una experiencia de usuario cohesiva y minimalista con su escritorio Pantheon.' },
    'zorin-os': { subtitle: 'La alternativa perfecta a Windows y macOS.', description: 'Zorin OS está diseñado para ser fácil, permitiendo cambiar la apariencia para parecerse a Windows o Mac.' },
    'mx-linux': { subtitle: 'Estabilidad, herramientas útiles y alto rendimiento.', description: 'MX Linux es una distro de peso medio que combina un escritorio elegante con una configuración sencilla.' },
    'slackware': { subtitle: 'La distribución Linux más antigua todavía en actividad.', description: 'Slackware se centra en la estabilidad y la simplicidade al estilo Unix.' },
    'bodhi': { subtitle: 'Minimalismo y el escritorio Moksha.', description: 'Bodhi es una distro minimalista que utiliza el entorno Moksha (fork de Enlightenment).' },
    'big-linux': { subtitle: 'Una de las mejores distros brasileñas, enfocada en la facilidad.', description: 'Big Linux es un proyecto brasileño que se centra en ofrecer un sistema completo y fácil de usar.' },
    'lubuntu': { subtitle: 'Rápido y ligero, perfecto para ordenadores antiguos.', description: 'Lubuntu utiliza el entorno LXQt para proporcionar un sistema funcional en hardware limitado.' },
    'linux-lite': { subtitle: 'Simple, rápido y gratuito.', description: 'Linux Lite está diseñado para facilitar la transición de Windows a Linux.' },
    'pop-os': { subtitle: 'Desarrollado para creadores, desarrolladores y gamers.', description: 'Pop!_OS es la distro de System76, enfocada en la productividad y el flujo de trabajo.' },
    'sparkylinux': { subtitle: 'Ligero, rápido y personalizable.', description: 'SparkyLinux ofrece varias ediciones para diferentes necesidades, desde minimalistas hasta completas.' },
    'mageia': { subtitle: 'Estable, seguro y fácil de usar.', description: 'Mageia es un fork comunitario de Mandriva Linux.' },
    'tails': { subtitle: 'Privacidad y anonimato en cualquier lugar.', description: 'Tails es un sistema live que fuerza todas las conexiones a través de la red Tor.' },
    'parrot-os': { subtitle: 'Seguridad, privacidad y desarrollo.', description: 'Parrot OS es una alternativa a Kali Linux, con un enfoque en la seguridad y el desarrollo.' },
    'solus': { subtitle: 'Un sistema moderno para ordenadores modernos.', description: 'Solus es una distro independiente que se centra en el uso doméstico y multimedia.' },
    'edubuntu': { subtitle: 'Linux para la educación.', description: 'Edubuntu es la versión de Ubuntu centrada en escuelas e instituciones educativas.' },
    'kubuntu': { subtitle: 'Ubuntu con el poder de KDE Plasma.', description: 'Kubuntu combina la base de Ubuntu con el escritorio KDE Plasma, altamente personalizable.' },
    'ubuntu-studio': { subtitle: 'Una estación de trabajo para creadores multimedia.', description: 'Ubuntu Studio viene preconfigurado para la edición de audio, vídeo e imagen.' },
    'ubuntu-cinnamon': { subtitle: 'Ubuntu con el escritorio Cinnamon.', description: 'Ubuntu Cinnamon ofrece la experiencia del escritorio Cinnamon sobre la base de Ubuntu.' },
    'ubuntu-kylin': { subtitle: 'La edición china de Ubuntu.', description: 'Ubuntu Kylin está adaptado para el mercado chino con el escritorio UKUI.' },
    'ubuntu-mate': { subtitle: 'Retrospectiva clásica con tecnologías modernas.', description: 'Ubuntu MATE utiliza el escritorio MATE, continuación do clásico GNOME 2.' },
    'ubuntu-unity': { subtitle: 'El regreso de la interfaz Unity.', description: 'Ubuntu Unity trae de vuelta el entorno Unity que fue estándar en Ubuntu durante años.' },
    'regata-os': { subtitle: 'Enfocado en juegos y productividad, hecho en Brasil.', description: 'Regata OS es una distro brasileña optimizada para gamers y creadores.' },
    'tiger-os': { subtitle: 'Enfoque en productividad y empresas.', description: 'Tiger OS es una distro brasileña centrada en el mercado corporativo y la productividad.' },
    'mauna': { subtitle: 'Simplicidad y belleza.', description: 'Mauna Linux es un proyecto brasileño que busca ofrecer un sistema pulido y fácil.' },
    'steam-os': { subtitle: 'El sistema de la Steam Deck, enfocado en juegos.', description: 'SteamOS está diseñado para ofrecer la mejor experiencia de juego posible.' },
    'endless-os': { subtitle: 'Conocimiento para todos, incluso sin internet.', description: 'Endless OS viene con cientos de aplicaciones preinstaladas para uso offline.' },
    'br-os': { subtitle: 'El sistema brasileño para el día a día.', description: 'Br OS se centra en ser un sistema completo y familiar para los brasileños.' },
    'chrome-os-flex': { subtitle: 'Convierte tu PC antiguo en un Chromebook.', description: 'Chrome OS Flex es la versión de Google para PCs y Macs antiguos.' },
    'fyde-os': { subtitle: 'ChromeOS con soporte para apps Android.', description: 'FydeOS es un fork de Chromium OS que añade soporte para apps Android y Linux.' },
    'red-hat': { subtitle: 'El estándar corporativo para servidores y la nube.', description: 'RHEL es la distribución comercial líder para empresas.' },
    'gentoo': { subtitle: 'Personalización total a través de la compilación.', description: 'Gentoo es una distro donde el usuario compila casi todo para su hardware específico.' },
    'antix': { subtitle: 'Ligereza extrema sin systemd.', description: 'AntiX está diseñado para ser rápido y ligero en ordenadores muy antiguos.' },
    'alpine': { subtitle: 'Seguridad, simplicidad y eficiencia en contenedores.', description: 'Alpine es una distro centrada en la seguridad y el tamaño reducido, muy utilizada en Docker.' },
    'void': { subtitle: 'Una distro independiente y estable.', description: 'Void Linux utiliza el sistema de init runit y se centra en la estabilidad y la simplicidad.' },
    'raspberry-pi-os': { subtitle: 'El sistema oficial para la Raspberry Pi.', description: 'Raspberry Pi OS está optimizado para el hardware de Raspberry Pi.' },
    'black-arch': { subtitle: 'Hacking y seguridad basada en Arch.', description: 'BlackArch contiene miles de herramientas para pruebas de seguridad.' },
    'backbox': { subtitle: 'Pruebas de penetración y evaluación de seguridad.', description: 'BackBox es una distro basada en Ubuntu centrada en el análisis forense y la seguridad.' },
    'tuxedo-os': { subtitle: 'Optimizado para hardware TUXEDO y más.', description: 'Tuxedo OS es una distro pulida basada en Ubuntu con KDE Plasma.' }
  }
};

export const Home = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const { lang } = useLanguage();
  const translations = useTranslations('home', defaultTranslations);
  const t = translations[lang];
  const DISTROS = useDistros();
  
  const [selectedCategory, setSelectedCategory] = useState("Todas as distros");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory("Todas as distros");
  }, [lang]);

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setSearch(s);
  }, [searchParams]);

  const filteredDistros = DISTROS.filter(distro => {
    const matchesSearch = distro.name.toLowerCase().includes(search.toLowerCase()) || 
                         distro.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Todas as distros" || distro.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getTranslatedDistro = (distro: typeof DISTROS[0]) => {
    if (lang === 'pt') return distro;
    const trans = distroTranslations[lang as 'en' | 'es']?.[distro.id];
    if (!trans) return distro;
    return {
      ...distro,
      subtitle: trans.subtitle,
      description: trans.description
    };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-dark text-white py-24 overflow-hidden">
        <AnimatedGrid />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl md:text-4xl font-display font-bold mb-1 text-primary"
              >
                {t.heroTitle}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-white mb-8"
              >
                {t.heroSubtitle}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mb-12 max-w-lg"
              >
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-white text-dark rounded-[6px] py-4 px-8 pl-14 pr-32 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 search-input"
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 search-icon" />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-[6px] font-bold hover:bg-primary/90 transition-all"
                  >
                    {t.searchButton}
                  </button>
                </form>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-lg"
              >
                <p className="text-white/80">
                  <strong>{t.beginnerText}</strong> Use o <Link to="/distromatch" className="text-primary font-bold hover:underline" aria-label="Ferramenta Distro Match"><span className="font-normal">Distro</span>Match</Link>
                  <br />
                  {t.beginnerSubtext}
                </p>
              </motion.div>
            </div>

            {/* Right Column: Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <a 
                href="https://iatutor.meulinux.com.br/" 
                target="_blank" 
                rel="noreferrer"
                className="block group relative"
              >
                <img 
                  src="https://meulinux.com.br/wp-content/uploads/2026/02/8888-1.png" 
                  alt="Aprenda Linux e DevOps"
                  className="relative rounded-[6px] shadow-2xl border-2 border-primary hover:scale-[1.02] transition-transform duration-500 w-full"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/linux/800/400';
                  }}
                />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Post-Download Section */}
      <section className="py-4 bg-primary text-white">
        <div className="container mx-auto px-4 flex items-center justify-center gap-6">
          <h2 className="text-lg md:text-xl font-bold">{t.postDownloadTitle}</h2>
          <Link 
            to="/pos-instalacao"
            className="border-2 border-white text-white px-6 py-2 rounded-[6px] hover:bg-white hover:text-primary transition-all text-sm md:text-base whitespace-nowrap font-normal"
          >
            {t.viewArticle}
          </Link>
        </div>
      </section>

      {/* Distro List Section */}
      <section ref={resultsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">{t.distroListTitle}</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-[6px] text-sm font-medium transition-all home-filter-btn ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-lg active' 
                    : 'bg-[#E2E2E2] text-dark hover:bg-gray-300'
                }`}
              >
                {t.categories[cat as keyof typeof t.categories] || cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDistros.map((distro, i) => {
              const translatedDistro = getTranslatedDistro(distro);
              return (
                <motion.div
                  key={distro.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white distro-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100"
                >
                  <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-xl distro-card">
                    <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{distro.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{translatedDistro.subtitle}</p>
                  <Link 
                    to={`/${distro.id}`}
                    className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all"
                  >
                    {t.learnMore} <ArrowRight size={18} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 text-center text-gray-500 flex flex-col items-center gap-4">
            <p>{t.moreDistrosText}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
