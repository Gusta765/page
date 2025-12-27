import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Download, 
  ArrowRight, 
  BarChart3, 
  LineChart, 
  Settings, 
  Database,
  Code,
  PieChart,
  TrendingUp,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/cards/MetricCard";
import { SkillCard } from "@/components/cards/SkillCard";
import { SectionHeader } from "@/components/ui/section-header";

const metrics = [
  { icon: BarChart3, value: "+50", label: "Projetos analisados" },
  { icon: PieChart, value: "+30", label: "Dashboards construídos" },
  { icon: Zap, value: "+20", label: "Automações entregues" },
  { icon: TrendingUp, value: "+15", label: "Modelos estatísticos" },
];

const skills = [
  { 
    icon: Database, 
    name: "SQL", 
    level: "Avançado",
    description: "Consultas complexas, otimização de queries, modelagem de dados e ETL"
  },
  { 
    icon: Code, 
    name: "Python", 
    level: "Avançado",
    description: "Pandas, NumPy, Scikit-learn para análise e machine learning"
  },
  { 
    icon: BarChart3, 
    name: "Power BI", 
    level: "Avançado",
    description: "Dashboards interativos, DAX avançado e modelagem dimensional"
  },
  { 
    icon: LineChart, 
    name: "Estatística", 
    level: "Avançado",
    description: "Análise exploratória, testes de hipótese e regressões"
  },
  { 
    icon: Settings, 
    name: "Automação", 
    level: "Intermediário",
    description: "Automação de relatórios e pipelines de dados"
  },
  { 
    icon: TrendingUp, 
    name: "Machine Learning", 
    level: "Intermediário",
    description: "Modelos preditivos e classificação de dados"
  },
];

export default function Home() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="section-container relative py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Database className="w-4 h-4" />
                Analista de Dados
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Gustavo — <br />
                <span className="gradient-text">Analista de Dados</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Transformo dados em decisões estratégicas através de análises profundas, visualizações impactantes e automações inteligentes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/projetos">
                    Ver Projetos
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-soft" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30" />
                <div className="absolute inset-8 rounded-full bg-card shadow-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Database className="w-20 h-20 text-primary/50" />
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 p-3 rounded-xl bg-card shadow-lg border border-border"
                >
                  <BarChart3 className="w-6 h-6 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 p-3 rounded-xl bg-card shadow-lg border border-border"
                >
                  <PieChart className="w-6 h-6 text-accent" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="section-container">
          <SectionHeader
            badge="Números"
            title="Resultados que falam por si"
            description="Uma visão geral do impacto gerado através de projetos de análise de dados"
            centered
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <SectionHeader
            badge="Habilidades"
            title="Skills principais"
            description="Competências técnicas para entregar soluções completas em análise de dados"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para transformar seus dados?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Vamos conversar sobre como posso ajudar a extrair insights valiosos dos seus dados.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              <Link to="/contato">
                Entre em contato
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
