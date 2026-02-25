import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Share2, ExternalLink } from 'lucide-react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { contentTranslations } from '../data/contentTranslations';

export type ContentSection = 'gnu-linux' | 'software-livre' | 'open-source';

const uiTranslations = {
  pt: {
    hero_title: 'Conteúdos Essenciais',
    hero_subtitle: 'Aprenda os fundamentos do ecossistema Linux, Software Livre e Open Source.',
    read_more: 'Ler conteúdo completo',
    back_button: 'Voltar para Conteúdos',
    quick_concept: 'Conceito Rápido',
    known_softwares: 'Softwares Livres Conhecidos',
    share: 'Compartilhar',
    last_update: 'Última atualização: Fevereiro de 2026',
    explore_others: 'Explorar outros conteúdos'
  },
  en: {
    hero_title: 'Essential Content',
    hero_subtitle: 'Learn the fundamentals of the Linux ecosystem, Free Software, and Open Source.',
    read_more: 'Read full content',
    back_button: 'Back to Content',
    quick_concept: 'Quick Concept',
    known_softwares: 'Known Free Software',
    share: 'Share',
    last_update: 'Last update: February 2026',
    explore_others: 'Explore other content'
  },
  es: {
    hero_title: 'Contenidos Esenciales',
    hero_subtitle: 'Aprende los fundamentos del ecosistema Linux, Software Libre y Open Source.',
    read_more: 'Leer contenido completo',
    back_button: 'Volver a Contenidos',
    quick_concept: 'Concepto Rápido',
    known_softwares: 'Softwares Libres Conocidos',
    share: 'Compartir',
    last_update: 'Última actualización: Febrero de 2026',
    explore_others: 'Explorar otros contenidos'
  }
};

export const Conteudo = () => {
  const [selectedId, setSelectedId] = useState<ContentSection | null>(null);
  const { lang } = useLanguage();
  const t = uiTranslations[lang];
  const contentData = contentTranslations[lang];

  const handleBack = () => setSelectedId(null);

  return (
    <div className="min-h-screen pt-20 bg-light">
      <section className="bg-dark text-white py-16 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              {selectedId ? contentData[selectedId].title : t.hero_title}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl">
              {selectedId 
                ? contentData[selectedId].subtitle 
                : t.hero_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {(Object.keys(contentData) as ContentSection[]).map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedId(id)}
                  className="group bg-white rounded-[6px] overflow-hidden shadow-lg hover:shadow-2xl transition-all text-left flex flex-col border border-gray-100"
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-50">
                    <img
                      src={contentData[id].image}
                      alt={contentData[id].title}
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-display font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                      {contentData[id].title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {contentData[id].subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      {t.read_more} <ArrowRight size={16} />
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold mb-8 transition-colors group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {t.back_button}
              </button>

              <div className="bg-white rounded-[6px] shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="bg-primary/5 border-l-4 border-primary p-6 mb-12 rounded-r-[6px]">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">{t.quick_concept}</h3>
                    <p className="text-lg text-dark leading-relaxed italic">
                      {contentData[selectedId].concept}
                    </p>
                  </div>

                  <div className="space-y-16">
                    {contentData[selectedId].sections.map((section, idx) => (
                      <div key={idx} className="space-y-8">
                        {section.image && (
                          <div className="rounded-[6px] overflow-hidden shadow-lg bg-gray-100">
                            <img
                              src={section.image}
                              alt={section.heading}
                              className="w-full h-auto object-cover max-h-[400px]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <div className="space-y-6">
                          <h2 className="text-3xl font-display font-bold text-dark border-b-2 border-primary/10 pb-4">
                            {section.heading}
                          </h2>
                          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                            {section.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    {selectedId === 'software-livre' && contentData['software-livre'].softwares && (
                      <div className="pt-12 border-t border-gray-100">
                        <h2 className="text-3xl font-display font-bold text-dark mb-8">{t.known_softwares}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          {Object.entries(contentData['software-livre'].softwares).map(([category, list]) => (
                            <div key={category} className="bg-gray-50 p-6 rounded-[6px]">
                              <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">{category}</h3>
                              <ul className="space-y-2">
                                {list.map(software => (
                                  <li key={software.name}>
                                    <a 
                                      href={software.url} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-3 text-dark font-medium hover:text-primary transition-colors group/link"
                                    >
                                      <div className="w-6 h-6 flex items-center justify-center bg-white rounded-sm p-0.5 shadow-sm border border-gray-100 group-hover/link:border-primary/30 transition-colors">
                                        <img 
                                          src={software.icon} 
                                          alt="" 
                                          className="max-w-full max-h-full object-contain"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                      {software.name}
                                      <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-dark px-4 py-2 rounded-[6px] font-bold transition-colors">
                        <Share2 size={18} /> {t.share}
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 italic">
                      {t.last_update}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleBack}
                  className="bg-dark text-white px-8 py-4 rounded-[6px] font-bold text-lg hover:bg-primary transition-all shadow-lg"
                >
                  {t.explore_others}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
