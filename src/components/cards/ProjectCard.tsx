import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ui/image-lightbox";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  index?: number;
  showLightbox?: boolean;
}

export function ProjectCard({ id, title, description, image, tags, index = 0, showLightbox = true }: ProjectCardProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/projetos/${id}`}
        className="block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {showLightbox && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute top-2 right-2 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
          <div className="flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-200">
            Ver projeto
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
      {showLightbox && (
        <ImageLightbox 
          src={image} 
          alt={title} 
          isOpen={isLightboxOpen} 
          onClose={() => setIsLightboxOpen(false)} 
        />
      )}
    </motion.div>
  );
}
