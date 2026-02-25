import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, Globe, Cpu, Box, HardDrive, Info, ArrowRight, Database, X } from 'lucide-react';
import { useDistros } from '../hooks/useDistros';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedGrid } from '../components/AnimatedGrid';

const translations = {
  pt: {
    notFound: "Distro não encontrada",
    backHome: "Voltar para o início",
    about: "Sobre o",
    desktopEnvironments: "Ambientes de desktop disponíveis:",
    mainFeatures: "Principais recursos:",
    packageManager: "Gerenciador de pacotes:",
    preInstalledSoftware: "Software pré-instalado:",
    hardwareCompatibility: "Compatibilidade de hardware:",
    communitySupport: "Comunidade e suporte:",
    comparison: "Comparação com outras distribuições:",
    flavors: "Conheça também os sabores do",
    quickInfo: "Informações Rápidas",
    basedOn: "Baseado em",
    country: "País",
    architecture: "Arquitetura",
    isoFile: "Arquivo ISO",
    downloadOfficial: "Baixar no site oficial"
  },
  en: {
    notFound: "Distro not found",
    backHome: "Back to home",
    about: "About",
    desktopEnvironments: "Available desktop environments:",
    mainFeatures: "Main features:",
    packageManager: "Package manager:",
    preInstalledSoftware: "Pre-installed software:",
    hardwareCompatibility: "Hardware compatibility:",
    communitySupport: "Community and support:",
    comparison: "Comparison with other distributions:",
    flavors: "Also check out the flavors of",
    quickInfo: "Quick Info",
    basedOn: "Based on",
    country: "Country",
    architecture: "Architecture",
    isoFile: "ISO File",
    downloadOfficial: "Download on official site"
  },
  es: {
    notFound: "Distro no encontrada",
    backHome: "Volver al inicio",
    about: "Sobre",
    desktopEnvironments: "Entornos de escritorio disponibles:",
    mainFeatures: "Principales características:",
    packageManager: "Gestor de paquetes:",
    preInstalledSoftware: "Software preinstalado:",
    hardwareCompatibility: "Compatibilidad de hardware:",
    communitySupport: "Comunidad y soporte:",
    comparison: "Comparación con otras distribuciones:",
    flavors: "Conoce también los sabores de",
    quickInfo: "Información Rápida",
    basedOn: "Basado en",
    country: "País",
    architecture: "Arquitectura",
    isoFile: "Archivo ISO",
    downloadOfficial: "Descargar en el sitio oficial"
  }
};

// Reuse the same distro translations mapping
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
    'ubuntu-linux': { subtitle: 'Una poderosa distro para usuarios principiantes e intermedios.', description: 'Ubuntu es una de las distribuciones Linux más populares y ampliamente utilizadas. Desarrollado por la empresa Canonical, Ubuntu tiene como objetivo ofrecer una experiencia de escritorio intuitiva, amigable y accesible para usuarios de todos los niveles de habilidad.' },
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

export const DistroDetail = () => {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const t = translations[lang];
  const DISTROS = useDistros();
  const distro = DISTROS.find(d => d.id === id);

  if (!distro) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="text-4xl font-bold mb-4">{t.notFound}</h1>
        <Link to="/" className="text-primary font-bold">{t.backHome}</Link>
      </div>
    );
  }

  const getTranslatedDistro = (d: typeof DISTROS[0]) => {
    if (lang === 'pt') return d;
    const trans = distroTranslations[lang as 'en' | 'es']?.[d.id];
    if (!trans) return d;
    return {
      ...d,
      subtitle: trans.subtitle,
      description: trans.description
    };
  };

  const translatedDistro = getTranslatedDistro(distro);

  React.useEffect(() => {
    if (distro) {
      document.title = `${distro.name} - Meu Linux`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', translatedDistro.description.substring(0, 160));
      }

      // Special case for Ubuntu as requested
      if (distro.id === 'ubuntu-linux' && lang === 'pt') {
        document.title = "Ubuntu - Uma poderosa distro para usuários iniciantes e intermediários";
        if (metaDescription) {
          metaDescription.setAttribute('content', "O Ubuntu é uma das distribuições Linux mais populares e amplamente utilizadas. Desenvolvido pela Canonical, oferece uma experiência intuitiva e amigável.");
        }
      }

      // Kali Linux SEO
      if (distro.id === 'kali-linux' && lang === 'pt') {
        document.title = "Kali Linux: Guia Definitivo de Segurança e Pentest (2026)";
        if (metaDescription) {
          metaDescription.setAttribute('content', "Kali Linux explicado em profundidade. História, filosofia, ferramentas, pentest, segurança, requisitos e uso profissional atualizados para 2026.");
        }
      }

      // Arch Linux SEO
      if (distro.id === 'arch-linux' && lang === 'pt') {
        document.title = "Arch Linux: Guia Definitivo 2026 — Rolling Release, Pacman, AUR e Controle Total";
        if (metaDescription) {
          metaDescription.setAttribute('content', "Arch Linux explicado em profundidade. Filosofia KISS, rolling release, pacman, AUR, requisitos, vantagens e desafios atualizados para 2026.");
        }
      }

      // Debian SEO
      if (distro.id === 'debian-linux' && lang === 'pt') {
        document.title = "Debian Linux: Guia Definitivo 2026 — Estabilidade, Servidores e Base do Ecossistema";
        if (metaDescription) {
          metaDescription.setAttribute('content', "Debian Linux explicado em profundidade. História, filosofia, estabilidade, versões, servidores, requisitos e comparações atualizadas para 2026.");
        }
      }

      // Fedora SEO
      if (distro.id === 'fedora-linux' && lang === 'pt') {
        document.title = "Fedora Linux: Guia Definitivo 2026 — Inovação, Desktop e Servidores";
        if (metaDescription) {
          metaDescription.setAttribute('content', "Fedora Linux explicado em profundidade. Filosofia, inovação, desktop, servidores, Red Hat e requisitos atualizados para 2026.");
        }
      }

      // Linux Mint SEO
      if (distro.id === 'linux-mint' && lang === 'pt') {
        document.title = "Linux Mint: Guia Definitivo 2026 — Simplicidade e Desktop Clássico";
        if (metaDescription) {
          metaDescription.setAttribute('content', "Linux Mint explicado em profundidade. História, filosofia, desktop Cinnamon, requisitos e comparações atualizadas para 2026.");
        }
      }
    }
  }, [distro, translatedDistro, lang]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-32 w-32 bg-white distro-card rounded-3xl p-4 flex items-center justify-center shadow-2xl" aria-hidden="true">
              <img src={distro.logo} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-display font-bold mb-4"
              >
                {distro.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-white/70"
              >
                {translatedDistro.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="distro-info-heading">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <article className="bg-white distro-card p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                <h2 id="distro-info-heading" className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Info className="text-primary" aria-hidden="true" /> {t.about} {distro.name}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{translatedDistro.description}</p>
                
                <h3 className="text-xl font-bold mb-4">{t.desktopEnvironments}</h3>
                <p className="text-gray-600 mb-8">{distro.desktopEnvironments}</p>

                <h3 className="text-xl font-bold mb-4">{t.mainFeatures}</h3>
                <p className="text-gray-600 mb-8">{distro.mainFeatures}</p>

                <h3 className="text-xl font-bold mb-4">{t.packageManager}</h3>
                <p className="text-gray-600 mb-8">{distro.packageManager}</p>

                <h3 className="text-xl font-bold mb-4">{t.preInstalledSoftware}</h3>
                <p className="text-gray-600 mb-8">{distro.preInstalledSoftware}</p>

                <h3 className="text-xl font-bold mb-4">{t.hardwareCompatibility}</h3>
                <div className="text-gray-600 mb-8">
                  {distro.hardwareCompatibility.includes('Requisitos mínimos:') ? (
                    <>
                      <p className="mb-6">{distro.hardwareCompatibility.split('Requisitos mínimos:')[0].trim()}</p>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner">
                        <p className="font-bold mb-4 text-gray-900 flex items-center gap-2">
                          <Info size={18} className="text-primary" />
                          Requisitos mínimos:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {distro.hardwareCompatibility.split('Requisitos mínimos:')[1].split(',').map((req, idx) => {
                            const cleanReq = req.trim().replace(/\.$/, '');
                            if (cleanReq.toLowerCase().includes('processador')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <Cpu size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Processador</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/processador/i, '').trim()}</p>
                                </div>
                              );
                            }
                            if (cleanReq.toLowerCase().includes('hd/ssd')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <HardDrive size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">HD/SSD</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/hd\/ssd/i, '').trim()}</p>
                                </div>
                              );
                            }
                            if (cleanReq.toLowerCase().includes('memória')) {
                              return (
                                <div key={idx} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2 text-primary mb-1">
                                    <Database size={14} />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Memória</span>
                                  </div>
                                  <p className="text-sm font-bold text-gray-900">{cleanReq.replace(/memória/i, '').trim()}</p>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-primary mb-1">
                                  <Info size={14} />
                                  <span className="text-[10px] uppercase font-bold tracking-wider">Info</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">{cleanReq}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>{distro.hardwareCompatibility}</p>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-4">{t.communitySupport}</h3>
                <p className="text-gray-600 mb-8">{distro.communitySupport}</p>

                <h3 className="text-xl font-bold mb-4">{t.comparison}</h3>
                <p className="text-gray-600 mb-8">{distro.comparison}</p>

              </article>

              {/* Gallery Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {distro.id === 'ubuntu-linux' ? (
                  <>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2024/07/ubuntu-24-04-lts-ja-esta-disponivel-para-download-1.webp")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2024/07/ubuntu-24-04-lts-ja-esta-disponivel-para-download-1.webp" 
                        alt="Ubuntu 24.04 LTS" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2024/07/eLSmVDqt3i7nrLCnc3GRHbNPJpTr0oJ8Z_mcWwSpFCMJXs-ezgNTwdW5MHiBADgmvFsYRQsPbhYzRFvhxvNABcrB5HnduaGpcRHqzYdx3my0dU8918z-_rOiYIBazNkOGr3vw5uYK3vmgIMd8g8DK9o.webp")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2024/07/eLSmVDqt3i7nrLCnc3GRHbNPJpTr0oJ8Z_mcWwSpFCMJXs-ezgNTwdW5MHiBADgmvFsYRQsPbhYzRFvhxvNABcrB5HnduaGpcRHqzYdx3my0dU8918z-_rOiYIBazNkOGr3vw5uYK3vmgIMd8g8DK9o.webp" 
                        alt="Ubuntu Desktop" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </>
                ) : distro.id === 'kali-linux' ? (
                  <>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2024/07/kali-2024-1-desktop.jpg")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2024/07/kali-2024-1-desktop.jpg" 
                        alt="Kali Linux 2024.1" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2024/07/desktop.png")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2024/07/desktop.png" 
                        alt="Kali Linux Desktop" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </>
                ) : distro.id === 'arch-linux' ? (
                  <>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2023/04/Arch-Linux.webp")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2023/04/Arch-Linux.webp" 
                        alt="Arch Linux" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2023/04/Arch-Linux.webp")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2023/04/Arch-Linux.webp" 
                        alt="Arch Linux Desktop" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </>
                ) : distro.id === 'opensuse' ? (
                  <>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2023/05/OpenSUSE_Leap_15.4_GNOME_Applications_en.png")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2023/05/OpenSUSE_Leap_15.4_GNOME_Applications_en.png" 
                        alt="openSUSE Leap 15.4" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage("https://meulinux.com.br/wp-content/uploads/2023/05/opensuse-leap-15-5-beta-esta-disponivel-para-teste.webp")}
                    >
                      <img 
                        src="https://meulinux.com.br/wp-content/uploads/2023/05/opensuse-leap-15-5-beta-esta-disponivel-para-teste.webp" 
                        alt="openSUSE Leap 15.5" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </>
                ) : (
                  [1, 2].map(i => (
                    <div 
                      key={i} 
                      className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(`https://picsum.photos/seed/${distro.id}${i}/1200/800`)}
                    >
                      <img 
                        src={`https://picsum.photos/seed/${distro.id}${i}/800/450`} 
                        alt="Screenshot" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white distro-card p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
                <h3 className="text-xl font-bold mb-6">{t.quickInfo}</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Box size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.basedOn}</p>
                      <p className="font-bold">{distro.basedOn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Globe size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.country}</p>
                      <p className="font-bold">{distro.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Cpu size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.architecture}</p>
                      <p className="font-bold">{distro.architecture}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><HardDrive size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">{t.isoFile}</p>
                      <p className="font-bold">{distro.isoSize}</p>
                    </div>
                  </div>
                </div>

                <a 
                  href={distro.officialSite} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full mt-8 bg-primary text-white py-4 rounded-[6px] font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg"
                >
                  <Download size={20} /> {t.downloadOfficial}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Download Section */}
      <section className="py-4 bg-primary text-white">
        <div className="container mx-auto px-4 flex items-center justify-center gap-6">
          <h2 className="text-lg md:text-xl font-bold">
            {lang === 'pt' ? 'O que fazer depois de baixar sua distros?' : 
             lang === 'en' ? 'What to do after downloading your distro?' : 
             '¿Qué hacer después de descargar tu distro?'}
          </h2>
          <Link 
            to="/pos-instalacao"
            className="border-2 border-white text-white px-6 py-2 rounded-[6px] hover:bg-white hover:text-primary transition-all text-sm md:text-base whitespace-nowrap font-normal"
          >
            {lang === 'pt' ? 'Ver artigo' : lang === 'en' ? 'View article' : 'Ver artículo'}
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage} 
            alt="Full size view" 
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};
