import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  index?: number;
}

export function TimelineItem({ year, title, company, description, index = 0 }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-8 last:pb-0 border-l-2 border-border last:border-transparent"
    >
      {/* Dot */}
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary shadow-glow" />
      
      {/* Content */}
      <div className="bg-card rounded-xl p-5 border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          {year}
        </span>
        <h4 className="text-lg font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-primary font-medium text-sm mb-2">{company}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
