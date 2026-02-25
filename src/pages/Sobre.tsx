import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, Code, Users, Settings } from 'lucide-react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

const defaultTranslations = {
  pt: {
    hero_title: "Liberdade com Propósito",
    hero_subtitle: "Conheça um pouco mais sobre o projeto",
    main_text: "Criado em 2020 pelo desenvolvedor web e designer gráfico Filipi Hadji, o meuLinux surge com o propósito de simplificar o acesso a diversas distros Linux, permitindo que o usuário encontre facilmente a opção ideal para atender as suas necessidades. Contando com a ajuda de filtros inteligentes e tags eficientes, tornamos a busca por distros Linux mais fácil e simples.",
    quote: "Simplificamos o acesso a diversas distros Linux",
    curation_text: "Realizamos constantemente uma curadoria cuidadosa, destacando as distros que mais se destacam e se adequam a cada usuário.",
    features_title: "Sobre distros Linux",
    features: [
      { title: 'Privacidade', desc: 'Privacidade robusta, código aberto e controle total ao seu alcance.' },
      { title: 'Desenvolvimento', desc: 'Desenvolvedores encontram liberdade, estabilidade e recursos avançados.' },
      { title: 'Comunidade', desc: 'Soluções colaborativas em fóruns, suporte e força na diversidade.' },
      { title: 'Personalização', desc: 'Personalização ilimitada, adapte seu sistema ao seu estilo único.' }
    ],
    footer_title: "Você está pronto para uma experiência verdadeiramente livre e personalizada?",
    footer_text: "Nós acreditamos na privacidade robusta, no código aberto e no controle total ao seu alcance. Explore nosso site e descubra uma variedade de opções. Desenvolvedores, designers, fotógrafos, editores de vídeo, estudantes e usuários no geral encontram estabilidade, recursos avançados e uma comunidade apaixonada disposta a ajudar.",
    footer_join: "Agora junte-se a nós e faça parte de uma jornada mais livre.",
    footer_button: "Acesse nossos Conteúdos Essenciais"
  },
  en: {
    hero_title: "Freedom with Purpose",
    hero_subtitle: "Learn more about the project",
    main_text: "Created in 2020 by web developer and graphic designer Filipi Hadji, meuLinux was born with the purpose of simplifying access to various Linux distros, allowing users to easily find the ideal option to meet their needs. With the help of smart filters and efficient tags, we make searching for Linux distros easy and simple.",
    quote: "We simplify access to various Linux distros",
    curation_text: "We constantly perform careful curation, highlighting the distros that stand out and suit each user.",
    features_title: "About Linux distros",
    features: [
      { title: 'Privacy', desc: 'Robust privacy, open source, and total control at your fingertips.' },
      { title: 'Development', desc: 'Developers find freedom, stability, and advanced features.' },
      { title: 'Community', desc: 'Collaborative solutions in forums, support, and strength in diversity.' },
      { title: 'Customization', desc: 'Unlimited customization, adapt your system to your unique style.' }
    ],
    footer_title: "Are you ready for a truly free and personalized experience?",
    footer_text: "We believe in robust privacy, open source, and total control at your fingertips. Explore our site and discover a variety of options. Developers, designers, photographers, video editors, students, and general users find stability, advanced features, and a passionate community ready to help.",
    footer_join: "Now join us and be part of a freer journey.",
    footer_button: "Access our Essential Content"
  },
  es: {
    hero_title: "Libertad con Propósito",
    hero_subtitle: "Conoce un poco más sobre el proyecto",
    main_text: "Creado en 2020 por el desarrollador web y diseñador gráfico Filipi Hadji, meuLinux surge con el propósito de simplificar el acceso a diversas distros Linux, permitiendo que el usuario encuentre fácilmente la opción ideal para satisfacer sus necesidades. Con la ayuda de filtros inteligentes y etiquetas eficientes, hacemos que la búsqueda de distros Linux sea fácil y sencilla.",
    quote: "Simplificamos el acceso a diversas distros Linux",
    curation_text: "Realizamos constantemente una curaduría cuidadosa, destacando las distros que más se destacan y se adaptan a cada usuario.",
    features_title: "Sobre distros Linux",
    features: [
      { title: 'Privacidad', desc: 'Privacidad robusta, código abierto y control total a tu alcance.' },
      { title: 'Desarrollo', desc: 'Los desarrolladores encuentran libertad, estabilidad y funciones avanzadas.' },
      { title: 'Comunidad', desc: 'Solucciones colaborativas en foros, soporte y fuerza en la diversidad.' },
      { title: 'Personalización', desc: 'Personalización ilimitada, adapta tu sistema a tu estilo único.' }
    ],
    footer_title: "¿Estás listo para una experiencia verdaderamente libre y personalizada?",
    footer_text: "Creemos en la privacidad robusta, el código abierto y el control total a tu alcance. Explora nuestro sitio y descubre una variedad de opciones. Desarrolladores, diseñadores, fotógrafos, editores de vídeo, estudiantes y usuarios en general encuentran estabilidad, funciones avanzadas y una comunidad apasionada dispuesta a ayudar.",
    footer_join: "Ahora únete a nosotros y forma parte de un viaje más libre.",
    footer_button: "Accede a nuestros Contenidos Esenciales"
  }
};

export const Sobre = () => {
  const { lang } = useLanguage();
  const translations = useTranslations('sobre', defaultTranslations);
  const t = translations[lang];

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4 text-primary"
          >
            {t.hero_title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70"
          >
            {t.hero_subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {t.main_text}
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-6 mb-8" role="complementary">
                <p className="text-2xl font-display font-bold text-dark">
                  {t.quote}
                </p>
              </div>
              <p className="text-lg text-gray-600">
                {t.curation_text}
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <img 
                src="https://meulinux.com.br/wp-content/uploads/2024/09/sobre-Ml.png" 
                alt="Filipi Hadji" 
                className="max-w-xs h-auto rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">{t.features_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={40} /> },
              { icon: <Code size={40} /> },
              { icon: <Users size={40} /> },
              { icon: <Settings size={40} /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-primary">{t.features[i].title}</h3>
                <p className="text-gray-600">{t.features[i].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-8 text-primary">
            {t.footer_title}
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12">
            {t.footer_text}
          </p>
          <p className="text-xl text-white/50 mb-8 italic">
            {t.footer_join}
          </p>
          <Link to="/conteudo" className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-[6px] font-bold text-xl transition-all transform hover:scale-105">
            {t.footer_button}
          </Link>
        </div>
      </section>
    </div>
  );
};
