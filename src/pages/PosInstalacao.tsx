import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, RefreshCw, Box, Shield, Settings, Terminal, CheckCircle2, Info, ArrowRight, Monitor, Cpu, HardDrive, User, Target, ChevronRight, RotateCcw } from 'lucide-react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useDistros } from '../hooks/useDistros';
import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  pt: {
    hero_title: "O que fazer depois de baixar sua distro?",
    hero_subtitle: "Um guia interativo para configurar seu novo sistema Linux",
    step1_q: "Qual distro você baixou?",
    step2_q: "Agora, selecione as especificações do seu computador:",
    label_processor: "Processador",
    label_memory: "Memória",
    label_experience: "Experiência",
    label_objective: "Objetivo",
    label_video: "Vídeo",
    button_next: "Próximo",
    button_finish: "Gerar Recomendações",
    button_reset: "Recomeçar",
    results_title: "Suas Recomendações Personalizadas",
    results_intro: "Com base na sua escolha de {distro} e nas especificações do seu computador, aqui estão algumas sugestões:",
    update_title: "1. Atualizar o Sistema",
    drivers_title: "2. Instalação de Drivers",
    software_title: "3. Software Essencial",
    custom_title: "4. Personalização",
    optimization_title: "5. Otimização",
    security_title: "6. Segurança",
    resources_title: "7. Recursos Adicionais",
    distros_popular: ["Ubuntu", "Linux Mint", "Fedora", "Debian", "Arch Linux", "Kali Linux", "openSUSE", "Pop!_OS", "Manjaro", "Elementary OS"],
    options_processor: ["0.5GHz", "1GHz", "2GHz", "3GHz"],
    options_memory: ["128MB", "512MB", "1GB", "2GB", "4GB", "8GB+"],
    options_experience: ["Iniciante", "Intermediário", "Avançado"],
    options_objective: ["Desenvolvimento", "Design", "Educação", "Geral"],
    options_video: ["AMD", "Intel", "NVIDIA"]
  },
  en: {
    hero_title: "What to do after downloading your distro?",
    hero_subtitle: "An interactive guide to set up your new Linux system",
    step1_q: "Which distro did you download?",
    step2_q: "Now, select your computer specifications:",
    label_processor: "Processor",
    label_memory: "Memory",
    label_experience: "Experience",
    label_objective: "Objective",
    label_video: "Video",
    button_next: "Next",
    button_finish: "Generate Recommendations",
    button_reset: "Start Over",
    results_title: "Your Personalized Recommendations",
    results_intro: "Based on your choice of {distro} and your computer specs, here are some suggestions:",
    update_title: "1. Update the System",
    drivers_title: "2. Driver Installation",
    software_title: "3. Essential Software",
    custom_title: "4. Personalization",
    optimization_title: "5. Optimization",
    security_title: "6. Security",
    resources_title: "7. Additional Resources",
    distros_popular: ["Ubuntu", "Linux Mint", "Fedora", "Debian", "Arch Linux", "Kali Linux", "openSUSE", "Pop!_OS", "Manjaro", "Elementary OS"],
    options_processor: ["0.5GHz", "1GHz", "2GHz", "3GHz"],
    options_memory: ["128MB", "512MB", "1GB", "2GB", "4GB", "8GB+"],
    options_experience: ["Beginner", "Intermediate", "Advanced"],
    options_objective: ["Development", "Design", "Education", "General"],
    options_video: ["AMD", "Intel", "NVIDIA"]
  },
  es: {
    hero_title: "¿Qué hacer después de descargar tu distro?",
    hero_subtitle: "Una guía interactiva para configurar tu nuevo sistema Linux",
    step1_q: "¿Qué distro descargaste?",
    step2_q: "Ahora, selecciona las especificaciones de tu computadora:",
    label_processor: "Procesador",
    label_memory: "Memoria",
    label_experience: "Experiencia",
    label_objective: "Objetivo",
    label_video: "Vídeo",
    button_next: "Siguiente",
    button_finish: "Generar Recomendaciones",
    button_reset: "Reiniciar",
    results_title: "Tus Recomendaciones Personalizadas",
    results_intro: "Basado en tu elección de {distro} y las especificaciones de tu computadora, aquí tienes algunas sugerencias:",
    update_title: "1. Actualizar el Sistema",
    drivers_title: "2. Instalación de Controladores",
    software_title: "3. Software Esencial",
    custom_title: "4. Personalización",
    optimization_title: "5. Optimización",
    security_title: "6. Seguridad",
    resources_title: "7. Recursos Adicionais",
    distros_popular: ["Ubuntu", "Linux Mint", "Fedora", "Debian", "Arch Linux", "Kali Linux", "openSUSE", "Pop!_OS", "Manjaro", "Elementary OS"],
    options_processor: ["0.5GHz", "1GHz", "2GHz", "3GHz"],
    options_memory: ["128MB", "512MB", "1GB", "2GB", "4GB", "8GB+"],
    options_experience: ["Principiante", "Intermedio", "Avanzado"],
    options_objective: ["Desarrollo", "Diseño", "Educación", "General"],
    options_video: ["AMD", "Intel", "NVIDIA"]
  }
};

export const PosInstalacao = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const allDistros = useDistros();
  const [step, setStep] = useState(1);
  const [selectedDistro, setSelectedDistro] = useState('');
  const [specs, setSpecs] = useState({
    processor: '',
    memory: '',
    experience: '',
    objective: '',
    video: ''
  });

  const handleReset = () => {
    setStep(1);
    setSelectedDistro('');
    setSpecs({
      processor: '',
      memory: '',
      experience: '',
      objective: '',
      video: ''
    });
  };

  const getUpdateCommand = (distro: string) => {
    const d = distro.toLowerCase();
    if (d.includes('ubuntu') || d.includes('mint') || d.includes('debian') || d.includes('pop')) {
      return 'sudo apt update && sudo apt upgrade';
    }
    if (d.includes('fedora')) {
      return 'sudo dnf update';
    }
    if (d.includes('arch') || d.includes('manjaro')) {
      return 'sudo pacman -Syu';
    }
    if (d.includes('opensuse')) {
      return 'sudo zypper update';
    }
    return 'sudo [gerenciador-de-pacotes] update';
  };

  const renderStep1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <h2 className="text-2xl md:text-3xl font-display font-bold text-dark">{t.step1_q}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {t.distros_popular.map(distro => (
          <button
            key={distro}
            onClick={() => {
              setSelectedDistro(distro);
              setStep(2);
            }}
            className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm md:text-base ${
              selectedDistro === distro 
                ? 'border-primary bg-primary/5 text-primary shadow-md' 
                : 'border-gray-100 bg-white hover:border-primary/30 hover:bg-gray-50 text-gray-600'
            }`}
          >
            {distro}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Outra distro?</label>
        <div className="flex gap-2">
          <select 
            className="flex-grow bg-white border-2 border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
            value={selectedDistro}
            onChange={(e) => {
              setSelectedDistro(e.target.value);
              if (e.target.value) setStep(2);
            }}
          >
            <option value="">Selecione outra distro...</option>
            {allDistros
              .filter(d => !t.distros_popular.includes(d.name))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(distro => (
                <option key={distro.id} value={distro.name}>
                  {distro.name}
                </option>
              ))
            }
          </select>
          <button 
            disabled={!selectedDistro}
            onClick={() => setStep(2)}
            className="bg-primary text-white p-4 rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-dark">{t.step2_q}</h2>
        <button onClick={() => setStep(1)} className="text-primary font-bold text-sm hover:underline">Voltar</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Cpu size={16} /> {t.label_processor}
          </label>
          <select 
            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            value={specs.processor}
            onChange={(e) => setSpecs({...specs, processor: e.target.value})}
          >
            <option value="">Selecione</option>
            {t.options_processor.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <HardDrive size={16} /> {t.label_memory}
          </label>
          <select 
            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            value={specs.memory}
            onChange={(e) => setSpecs({...specs, memory: e.target.value})}
          >
            <option value="">Selecione</option>
            {t.options_memory.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <User size={16} /> {t.label_experience}
          </label>
          <select 
            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            value={specs.experience}
            onChange={(e) => setSpecs({...specs, experience: e.target.value})}
          >
            <option value="">Selecione</option>
            {t.options_experience.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Target size={16} /> {t.label_objective}
          </label>
          <select 
            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            value={specs.objective}
            onChange={(e) => setSpecs({...specs, objective: e.target.value})}
          >
            <option value="">Selecione</option>
            {t.options_objective.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Monitor size={16} /> {t.label_video}
          </label>
          <select 
            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            value={specs.video}
            onChange={(e) => setSpecs({...specs, video: e.target.value})}
          >
            <option value="">Selecione</option>
            {t.options_video.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <button 
        disabled={!specs.processor || !specs.memory || !specs.experience || !specs.objective || !specs.video}
        onClick={() => setStep(3)}
        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
      >
        {t.button_finish} <ChevronRight size={20} />
      </button>
    </motion.div>
  );

  const renderResults = () => {
    const isLowSpec = specs.memory === '128MB' || specs.memory === '512MB' || specs.memory === '1GB';
    const isNvidia = specs.video === 'NVIDIA';
    const updateCmd = getUpdateCommand(selectedDistro);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
          <h2 className="text-3xl font-display font-bold text-dark mb-4">{t.results_title}</h2>
          <p className="text-gray-600">
            {t.results_intro.replace('{distro}', selectedDistro)}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">{specs.processor}</span>
            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">{specs.memory} RAM</span>
            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">{specs.experience}</span>
            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">{specs.objective}</span>
            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">{specs.video}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* 1. Update */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
              <RefreshCw size={24} /> {t.update_title}
            </h3>
            <p className="text-gray-600 mb-4">Abra o terminal e execute o comando abaixo para garantir que seu sistema esteja seguro e atualizado:</p>
            <div className="bg-dark text-white p-4 rounded-xl font-mono text-sm overflow-x-auto">
              <code>{updateCmd}</code>
            </div>
          </div>

          {/* 2. Drivers */}
          {isNvidia && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
                <Shield size={24} /> {t.drivers_title}
              </h3>
              <p className="text-gray-600">
                Como você possui uma placa <strong>NVIDIA</strong>, é altamente recomendado instalar os drivers proprietários para melhor desempenho. 
                {selectedDistro.toLowerCase().includes('ubuntu') ? 
                  " Vá em 'Programas e Atualizações' > 'Drivers Adicionais' e selecione o driver recomendado." : 
                  " Consulte o gerenciador de drivers da sua distribuição."}
              </p>
            </div>
          )}

          {/* 3. Software */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-primary">
              <Box size={24} /> {t.software_title}
            </h3>
            <p className="text-gray-600 mb-4">Considere instalar estes aplicativos essenciais para seu perfil de <strong>{specs.objective}</strong>:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl text-sm font-medium"><CheckCircle2 size={16} className="text-green-500" /> Google Chrome / Firefox</li>
              <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl text-sm font-medium"><CheckCircle2 size={16} className="text-green-500" /> VLC Media Player</li>
              <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl text-sm font-medium"><CheckCircle2 size={16} className="text-green-500" /> LibreOffice / OnlyOffice</li>
              {specs.objective === 'Desenvolvimento' && <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl text-sm font-medium"><CheckCircle2 size={16} className="text-green-500" /> VS Code / Docker</li>}
              {specs.objective === 'Design' && <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl text-sm font-medium"><CheckCircle2 size={16} className="text-green-500" /> GIMP / Inkscape</li>}
            </ul>
          </div>

          {/* 4. Optimization */}
          {isLowSpec && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-orange-500">
                <Settings size={24} /> {t.optimization_title}
              </h3>
              <p className="text-gray-600">
                Detectamos que seu computador possui pouca memória RAM ({specs.memory}). Para uma melhor experiência:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Desative efeitos visuais e animações nas configurações.</li>
                <li>• Considere usar um ambiente de desktop leve como XFCE ou LXQt.</li>
                <li>• Evite manter muitas abas abertas no navegador simultaneamente.</li>
              </ul>
            </div>
          )}

          {/* 5. Resources */}
          <div className="bg-dark text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary">
              <Info size={24} /> {t.resources_title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="#" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                <span>Documentação Oficial</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                <span>Fórum da Comunidade</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="w-full bg-gray-100 text-dark py-4 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> {t.button_reset}
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold mb-6"
          >
            {t.hero_title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-2xl mx-auto font-medium"
          >
            {t.hero_subtitle}
          </motion.p>
        </div>
      </section>

      {/* Interactive Flow Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-gray-100 min-h-[500px]">
            <AnimatePresence mode="wait">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderResults()}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

