import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "@/components/ui/button";
import yamlText from "../../.yaml?raw";
import { parseYAMLContent, getAllProjects, convertToWebPath } from "@/lib/yaml-parser";

// Categorias para os projetos
const categories = ["Todos", "Dashboard", "Análise", "Machine Learning", "ETL"];

// Mapeamento de categorias para os projetos
const projectCategories = {
  "painel-estoque-por-lote": "Dashboard",
  "painel-vendas-tempo-real": "Dashboard",
  "painel-logistica": "Dashboard",
  "painel-cesta-de-compras": "Machine Learning",
  "teste-ab-ctr-home": "Análise",
  "etl-pipeline-produtos": "ETL"
};


export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const projects = useMemo(() => {
    try {
      const yamlData = parseYAMLContent(yamlText);
      const projectsData = getAllProjects(yamlData);

      return projectsData.map(({ id, project }) => ({
        id,
        title: project.title,
        description: project.description,
        image: convertToWebPath(project.imagem),
        tags: project.tags || [],
        category: projectCategories[id] || "Análise",
      }));
    } catch (error) {
      console.error("Erro ao carregar dados do YAML:", error);
      return [];
    }
  }, []);

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-16 md:pt-20">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-16 md:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Layers className="w-4 h-4" />
              Portfólio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Projetos em destaque
            </h1>
            <p className="text-xl text-muted-foreground">
              Uma seleção dos meus melhores trabalhos em análise de dados, visualização e automação.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                index={index}
                showLightbox={true}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">Nenhum projeto encontrado nesta categoria.</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
