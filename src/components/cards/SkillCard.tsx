import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  icon: LucideIcon;
  name: string;
  level: string;
  description: string;
  index?: number;
}

export function SkillCard({ icon: Icon, name, level, description, index = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{name}</h4>
          <span className="text-xs text-primary font-medium">{level}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
