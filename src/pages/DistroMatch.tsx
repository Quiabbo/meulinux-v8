import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight } from 'lucide-react';
import { useDistros } from '../hooks/useDistros';
import { Link } from 'react-router-dom';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  pt: {
    title_match: "Match",
    subtitle: "Para garantir melhores resultados use todos os filtros",
    label_processor: "Processador",
    label_memory: "Memória",
    label_experience: "Experiência",
    label_objective: "Objetivo",
    label_video: "Vídeo",
    button_search: "Buscar",
    results_title: "Resultados para você:",
    button_learn_more: "Conhecer e Baixar",
    options_experience: ["Experiência", "Iniciante", "Intermediário", "Avançado"],
    options_objective: ["Objetivo", "Desenvolvimento", "Design", "Educação", "Geral"],
    options_video: ["Vídeo", "AMD", "Intel", "NVIDIA"]
  },
  en: {
    title_match: "Match",
    subtitle: "To ensure better results use all filters",
    label_processor: "Processor",
    label_memory: "Memory",
    label_experience: "Experience",
    label_objective: "Objective",
    label_video: "Video",
    button_search: "Search",
    results_title: "Results for you:",
    button_learn_more: "Learn and Download",
    options_experience: ["Experience", "Beginner", "Intermediate", "Advanced"],
    options_objective: ["Objective", "Development", "Design", "Education", "General"],
    options_video: ["Video", "AMD", "Intel", "NVIDIA"]
  },
  es: {
    title_match: "Match",
    subtitle: "Para garantizar mejores resultados use todos los filtros",
    label_processor: "Procesador",
    label_memory: "Memoria",
    label_experience: "Experiencia",
    label_objective: "Objetivo",
    label_video: "Vídeo",
    button_search: "Buscar",
    results_title: "Resultados para ti:",
    button_learn_more: "Conocer y Descargar",
    options_experience: ["Experiencia", "Principiante", "Intermedio", "Avanzado"],
    options_objective: ["Objetivo", "Desarrollo", "Diseño", "Educación", "General"],
    options_video: ["Vídeo", "AMD", "Intel", "NVIDIA"]
  }
};

export const DistroMatch = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const DISTROS = useDistros();

  const [filters, setFilters] = useState({
    processor: 'Processador',
    memory: 'Memória',
    experience: t.options_experience[0],
    objective: t.options_objective[0],
    video: t.options_video[0]
  });
  const [results, setResults] = useState<typeof DISTROS>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const matched = DISTROS.filter(() => Math.random() > 0.5);
    setResults(matched.length > 0 ? matched : [DISTROS[0]]);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-4"
          >
            <span className="font-normal">Distro</span><span className="font-bold">{t.title_match}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/70"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white distro-card p-8 rounded-3xl shadow-xl -mt-32 relative z-10 mb-16" role="search" aria-label="Filtros de busca de distros">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="processor" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_processor}</label>
                <select 
                  id="processor"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.processor}
                  onChange={(e) => setFilters({...filters, processor: e.target.value})}
                >
                  <option>{t.label_processor}</option>
                  <option>0.5Ghz</option>
                  <option>1GHz</option>
                  <option>2GHz</option>
                  <option>3Ghz</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="memory" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_memory}</label>
                <select 
                  id="memory"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.memory}
                  onChange={(e) => setFilters({...filters, memory: e.target.value})}
                >
                  <option>{t.label_memory}</option>
                  <option>128MB</option>
                  <option>512MB</option>
                  <option>1GB</option>
                  <option>2GB</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="experience" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_experience}</label>
                <select 
                  id="experience"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: e.target.value})}
                >
                  {t.options_experience.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="objective" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_objective}</label>
                <select 
                  id="objective"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.objective}
                  onChange={(e) => setFilters({...filters, objective: e.target.value})}
                >
                  {t.options_objective.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="video" className="text-xs font-bold text-gray-400 uppercase ml-1">{t.label_video}</label>
                <select 
                  id="video"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.video}
                  onChange={(e) => setFilters({...filters, video: e.target.value})}
                >
                  {t.options_video.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full mt-6 bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 focus:ring-4 focus:ring-primary/20 outline-none"
              aria-label={t.button_search}
            >
              <Search size={20} aria-hidden="true" /> {t.button_search}
            </button>
          </div>

          {/* Results */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-3xl font-display font-bold mb-8">{t.results_title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((distro, i) => (
                  <motion.div
                    key={distro.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white distro-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100"
                  >
                    <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-xl distro-card">
                      <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{distro.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{distro.subtitle}</p>
                    <Link 
                      to={`/${distro.id}`}
                      className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all"
                    >
                      {t.button_learn_more} <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
