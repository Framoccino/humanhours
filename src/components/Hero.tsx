import { useRef } from 'react';
import { useAIVisualization } from './AIVisualization';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  useAIVisualization(containerRef);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Human Hours</h1>
        <h2 className="hero-subtitle">
          The Economy of Time. Trade skills,<br />
          earn hours, build trust.
        </h2>
      </div>

      <div ref={containerRef} className="ai-animation-container">
        <div className="loading-indicator">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
      </div>
    </section>
  );
} 