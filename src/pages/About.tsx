import { useMemo } from "react";
import { motion } from "framer-motion";
import yamlText from "../../.yaml?raw";
import { convertToWebPath, getProfileData, parseYAMLContent } from "@/lib/yaml-parser";
import { 
  Lightbulb, 
  Target, 
  Zap, 
  Users,
  Database,
  Code,
  BarChart3,
  LineChart,
  Settings,
  Award,
  BookOpen,
  Briefcase
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { TimelineItem } from "@/components/cards/TimelineItem";
import { SkillCard } from "@/components/cards/SkillCard";

const timeline = [
  {
    year: "09/2024 - Atual",
    title: "Analista de Dados",
    company: "Atacado Vila Nova",
    description: "Responsável pela condução de testes A/B e experimentos controlados, desde a formulação de hipóteses até a análise estatística e recomendação executiva. Atuação em análises estatísticas avançadas e implantação de modelos matemáticos aplicados a problemas comerciais e operacionais. Forte orientação a decisões baseadas em evidência, reduzindo incerteza e apoiando estratégias de negócio por meio de dados. Tecnologias: Python, SQL, Estatística."
  },
  {
    year: "09/2022 - 09/2023",
    title: "Analista de Dados",
    company: "Natus Farma",
    description: "Atuação em migração de dados para ambiente em nuvem, com foco em governança, qualidade e confiabilidade da informação. Responsável pela criação e otimização de queries complexas em ambientes OLAP, além do desenvolvimento de pipelines de ingestão e transformação de dados. Desenvolvimento de relatórios e análises para suporte à tomada de decisão, atuando diretamente no levantamento de requisitos e interface com stakeholders de diferentes níveis técnicos e gerenciais. Tecnologias: Power BI, SQL, Excel."
  }
];

const education = [
  {
    title: "Engenharia da Computação",
    description: ""
  },
  {
    title: "Tec. Administração",
    description: ""
  }
];

const competencies = [
  { 
    icon: Database, 
    name: "ETL & Pipelines", 
    level: "Avançado",
    description: "Extração, transformação e carga de dados de múltiplas fontes"
  },
  { 
    icon: Code, 
    name: "Programação", 
    level: "Avançado",
    description: "Python, R e SQL para análises complexas e automação"
  },
  { 
    icon: BarChart3, 
    name: "Visualização", 
    level: "Avançado",
    description: "Power BI, Tableau e bibliotecas Python para visualização"
  },
  { 
    icon: LineChart, 
    name: "Machine Learning", 
    level: "Intermediário",
    description: "Modelos preditivos e algoritmos de classificação"
  },
  { 
    icon: Settings, 
    name: "Cloud & Big Data", 
    level: "Intermediário",
    description: "AWS, Azure e ferramentas de processamento distribuído"
  },
  { 
    icon: Award, 
    name: "Gestão de Projetos", 
    level: "Intermediário",
    description: "Metodologias ágeis e gestão de entregas"
  },
];

const deliverables = [
  {
    icon: Lightbulb,
    title: "Insights Acionáveis",
    description: "Transformo dados brutos em recomendações claras e objetivas que geram valor para o negócio."
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Elimino tarefas manuais repetitivas com scripts e pipelines automatizados."
  },
  {
    icon: Target,
    title: "Análises Estratégicas",
    description: "Conduzo análises profundas para responder perguntas críticas do negócio."
  },
  {
    icon: Users,
    title: "Capacitação de Times",
    description: "Treino equipes para usar dados de forma autônoma e eficiente."
  },
];

export default function About() {
  const profilePhotoSrc = useMemo(() => {
    try {
      const yamlData = parseYAMLContent(yamlText);
      const profile = getProfileData(yamlData);
      if (profile?.minha_foto) return convertToWebPath(profile.minha_foto);
    } catch {
      // ignore
    }
    return "";
  }, []);

  return (
    <main className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="section-container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Sobre Mim
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Apaixonado por transformar dados em valor
              </h1>
              <div className="prose prose-muted text-muted-foreground space-y-4">
                <p>
                  Atuo em análise de dados com foco em entregar resultados tangíveis através de insights baseados em dados.
                </p>
                <p>
                  Minha abordagem combina rigor técnico com visão de negócio, garantindo que cada análise tenha um impacto real nas decisões estratégicas das organizações.
                </p>
                <p>
                  Acredito que os melhores insights surgem quando combinamos curiosidade genuína, método científico e profundo entendimento do contexto de negócio.
                </p>
              </div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 rotate-3" />
                <div className="absolute inset-0 rounded-full bg-card shadow-xl overflow-hidden">
                  <img 
                    src={profilePhotoSrc}
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <SectionHeader
            badge="Carreira"
            title="Trajetória profissional"
            description="Os principais marcos da minha jornada na área de dados"
          />
          <div className="max-w-2xl">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.year}
                year={item.year}
                title={item.title}
                company={item.company}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="section-container">
          <SectionHeader
            badge="Formação"
            title="Formação acadêmica"
            description="Base técnica e visão de negócio para atuar em dados de ponta a ponta"
            centered
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {education.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competencies Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="section-container">
          <SectionHeader
            badge="Competências"
            title="Habilidades técnicas"
            description="Stack completa para entregar soluções end-to-end em análise de dados"
            centered
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {competencies.map((skill, index) => (
              <SkillCard
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
                description={skill.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What I Deliver Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <SectionHeader
            badge="Entregas"
            title="O que eu entrego"
            description="Soluções completas que transformam a forma como sua empresa usa dados"
            centered
          />
          <div className="grid sm:grid-cols-2 gap-8">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-5 p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
