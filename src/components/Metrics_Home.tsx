// src/components/Metrics_Home.tsx
import React from 'react';
import { Calendar, Clock, Award, ShieldCheck } from 'lucide-react';

export interface MetricItem {
  num: string;
  title: string;
  label: string;
  icon: React.ElementType;
}

export const METRICAS: MetricItem[] = [
  {
    num: '+15',
    title: 'Anos de Mercado',
    label: 'Transformando grandes desafios de engenharia em realidades sólidas.',
    icon: Calendar,
  },
  {
    num: '100%',
    title: 'Compromisso',
    label: 'Pontualidade absoluta na entrega e orçamento rigorosamente respeitado.',
    icon: Clock,
  },
  {
    num: 'Nível A',
    title: 'Acreditação Máxima',
    label: 'Certificação PBQP-H para excelência técnica e gestão de obras.',
    icon: Award,
  },
  {
    num: 'ISO 9001',
    title: 'Padrão Internacional',
    label: 'Garantia de qualidade certificada do planejamento ao acabamento.',
    icon: ShieldCheck,
  },
];

export const Metrics_Home: React.FC = () => {
  return (
    <section className="metrics-section">
      <div className="metrics-overlay" />

      <div className="metrics-container">
        {METRICAS.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="metrics-card">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 group-hover:bg-amber-500 text-amber-500 group-hover:text-zinc-950 flex items-center justify-center transition-all duration-300 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-amber-500 transition-colors">
                  0{idx + 1}
                </span>
              </div>

              <div className="space-y-3">
                <span className="metrics-num">
                  {metric.num}
                </span>
                <h4 className="metrics-card-title">
                  {metric.title}
                </h4>
                <p className="metrics-card-label">
                  {metric.label}
                </p>
              </div>

              <div className="w-0 group-hover:w-full h-1 bg-amber-500 transition-all duration-500 ease-out absolute bottom-0 left-0" />
            </div>
          );
        })}
      </div>
    </section>
  );
};