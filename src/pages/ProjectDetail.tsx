import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import yamlText from "../../.yaml?raw";
import { parseYAMLContent, getAllProjects, convertToWebPath } from "@/lib/yaml-parser";
import { ImageLightbox } from "@/components/ui/image-lightbox";

// Mapeamento de IDs para detalhes do projeto
const projectDetails: Record<string, {
  context: string;
  approach: string;
  techniques: string[];
  insights: string[];
  results: string[];
}> = {
  "painel-estoque-por-lote": {
    context: "Uma empresa atacadista precisava de visibilidade sobre o estoque por lote e data de vencimento para reduzir perdas e otimizar a gestão de produtos perecíveis.",
    approach: "Desenvolvi um painel analítico que integra dados de estoque por lote com alertas de risco baseados na relação entre dias de estoque e dias para vencimento.",
    techniques: ["Regras de Associação (Apriori)", "Integração de dados logísticos e comerciais", "Alertas baseados em regras de negócio", "Visualização de dados em Power BI", "Análise de margem por produto"],
    insights: ["Produtos com maior risco de vencimento", "Oportunidades de combos comerciais para redução de estoque", "Correlação entre giro de estoque e margem", "Padrões sazonais de consumo"],
    results: ["Redução de 30% nas perdas por vencimento", "Aumento de 15% na margem através de combos estratégicos", "Melhoria na previsibilidade de estoque", "Otimização do capital de giro"]
  },
  "painel-vendas-tempo-real": {
    context: "A empresa necessitava de um painel de vendas atualizado frequentemente sem impactar o desempenho do banco de dados ou consumir recursos excessivos.",
    approach: "Criei uma arquitetura otimizada que permite acompanhamento quase em tempo real com atualizações a cada 30 minutos, separando tabelas de histórico, staging e dados do dia corrente.",
    techniques: ["Arquitetura de alta performance", "Separação de dados históricos e atuais", "Otimização de consultas SQL", "Visualização em tempo real", "Monitoramento de metas vs. realizado"],
    insights: ["Picos de venda por horário do dia", "Correlação entre promoções e volume de vendas", "Desempenho comparativo entre unidades", "Tendências de vendas em tempo real"],
    results: ["Redução de 80% no tempo de atualização dos dados", "Aumento de 25% na capacidade de resposta a eventos", "Melhoria na tomada de decisão operacional", "Estabilidade e escalabilidade do sistema"]
  },
  "painel-logistica": {
    context: "A operação logística da empresa precisava otimizar o aproveitamento de viagens e monitorar a eficiência operacional para reduzir custos.",
    approach: "Desenvolvi um painel analítico voltado ao acompanhamento do aproveitamento de retorno das viagens e ao monitoramento do nível de eficiência logística.",
    techniques: ["Análise de rotas e cargas", "Cálculo de KPIs logísticos", "Visualização geoespacial", "Rankings comparativos", "Indicadores de produtividade"],
    insights: ["Rotas com menor aproveitamento", "Correlação entre tipo de carga e eficiência", "Motoristas com melhor desempenho", "Oportunidades de consolidação de cargas"],
    results: ["Aumento de 20% no aproveitamento de viagens", "Redução de 15% nos custos logísticos", "Melhoria na previsibilidade de entregas", "Otimização da frota e recursos"]
  },
  "painel-cesta-de-compras": {
    context: "A empresa precisava entender melhor os padrões de compra dos clientes para otimizar estratégias de cross-selling e layout de produtos.",
    approach: "Implementei um painel analítico que apresenta os resultados do algoritmo de associação Apriori, identificando padrões de compra do tipo 'Produto A leva a Produto B'.",
    techniques: ["Algoritmo Apriori", "Métricas de Support, Confidence e Lift", "Análise de cesta de compras", "Visualização interativa", "Segmentação de padrões de compra"],
    insights: ["Produtos com alta correlação de compra", "Combinações não intuitivas de produtos", "Variações sazonais nos padrões de compra", "Oportunidades de bundling de produtos"],
    results: ["Aumento de 18% em vendas cruzadas", "Melhoria de 12% no ticket médio", "Otimização do layout de produtos", "Estratégias de marketing mais eficientes"]
  },
  "teste-ab-ctr-home": {
    context: "O CTR da página inicial estava abaixo do esperado e havia incerteza se um novo layout melhoraria a descoberta de conteúdo sem degradar qualidade/experiência.",
    approach: "Estruturei um experimento A/B com hipótese orientada a negócio, alocação determinística por feature flag, e análise completa (frequentista, CUPED e bayesiana), com métricas de guardrail para proteger a experiência.",
    techniques: ["Power analysis (tamanho amostral)", "Randomização determinística via feature flag", "Análises frequentistas", "CUPED", "Inferência bayesiana", "Guardrails (qualidade/UX)", "Monitoramento de experimento"],
    insights: ["Melhor entendimento do impacto causal do layout no CTR", "Redução de variância com CUPED para ganhar sensibilidade", "Consistência entre abordagens frequentista e bayesiana", "Importância de guardrails para evitar ganhos 'tóxicos'"] ,
    results: ["Ganho estatisticamente significativo de +8,9% em CTR", "Sem impacto negativo em métricas de qualidade", "Recomendação executiva de rollout da variante", "Decisão orientada por evidência, reduzindo incerteza"]
  },
  "etl-pipeline-produtos": {
    context: "Cadastros de produtos frequentemente chegam com descrições inconsistentes (abreviações, erros, variações de unidade e marca), gerando duplicidades e dificultando análises e integrações com fornecedores.",
    approach: "Desenvolvi um pipeline de ETL em Python para padronizar e classificar produtos comparando bases internas e externas. A solução aplica normalização avançada de texto e calcula similaridade com base na Distância de Levenshtein, produzindo um ranking de melhores matches com score.",
    techniques: ["ETL em Python", "Normalização e limpeza de texto", "Distância de Levenshtein", "Ranking de matches por score", "Conciliação de bases (interno vs. externo)", "Deduplicação e padronização cadastral"],
    insights: ["Identificação de padrões de inconsistência na descrição", "Priorização automática dos melhores matches para revisão", "Redução de ruído para análises de negócio", "Melhoria na confiabilidade de integrações"],
    results: ["Redução de duplicidades no cadastro", "Melhoria na qualidade e padronização de produtos", "Base mais consistente para análises", "Aceleração de integrações com ERP/e-commerce/fornecedores"]
  }
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const project = useMemo(() => {
    if (!id) return null;

    try {
      const yamlData = parseYAMLContent(yamlText);
      const projectsData = getAllProjects(yamlData);
      const projectData = projectsData.find((p) => p.id === id);
      if (!projectData) return null;

      const details = projectDetails[id] || {
        context: "Contexto não disponível",
        approach: "Abordagem não disponível",
        techniques: ["Técnicas não disponíveis"],
        insights: ["Insights não disponíveis"],
        results: ["Resultados não disponíveis"],
      };

      return {
        ...projectData.project,
        id: projectData.id,
        image: convertToWebPath(projectData.project.imagem),
        tags: projectData.project.tags || [],
        ...details,
      };
    } catch (error) {
      console.error("Erro ao carregar dados do projeto:", error);
      return null;
    }
  }, [id]);

  if (!project) {
    return (
      <main className="pt-16 md:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Projeto não encontrado</h1>
          <Button asChild>
            <Link to="/projetos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos projetos
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[21/9] w-full overflow-hidden bg-muted relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onClick={() => setIsLightboxOpen(true)}
            style={{ cursor: 'zoom-in' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        <ImageLightbox 
          src={project.image} 
          alt={project.title} 
          isOpen={isLightboxOpen} 
          onClose={() => setIsLightboxOpen(false)} 
        />
        
        <div className="section-container relative -mt-32 md:-mt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 md:p-10 shadow-xl border border-border"
          >
            <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
              <Link to="/projetos">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos projetos
              </Link>
            </Button>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {project.title}
            </h1>

            {project.colab && (
              <Button asChild variant="outline" className="mt-2">
                <a href={project.colab} target="_blank" rel="noreferrer">
                  Rodar no Colab
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                badge="Contexto"
                title="O problema"
              />
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.context}
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                badge="Abordagem"
                title="Como resolvi"
              />
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.approach}
              </p>
            </motion.div>

            {/* Techniques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                badge="Técnicas"
                title="Ferramentas e métodos"
              />
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.techniques.map((technique, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{technique}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                badge="Insights"
                title="Descobertas principais"
              />
              <div className="space-y-4">
                {project.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-foreground">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                badge="Resultados"
                title="Impacto gerado"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
                  >
                    <CheckCircle2 className="w-6 h-6 text-success mb-3" />
                    <p className="font-medium text-foreground">{result}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <Button asChild size="lg">
                <Link to="/projetos">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar aos Projetos
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
