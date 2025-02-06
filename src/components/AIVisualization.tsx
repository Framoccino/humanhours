import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export class AIVisualization {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particleSystem: THREE.Points;
  private isVisible: boolean = false;
  private animationFrame: number | null = null;
  private lastTime: number = performance.now();
  private updateInterval: number = 1000 / 30;
  private lastUpdate: number = 0;
  private particleCount: number = 200;
  private colorPalette: THREE.Color[] = [
    new THREE.Color('#3B82F6'),
    new THREE.Color('#10B981'),
    new THREE.Color('#8B5CF6')
  ];

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    container.appendChild(this.canvas);

    // Three.js setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    // Optimize renderer
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);

    this.init();
    this.observeVisibility();
  }

  private init(): void {
    // Use InstancedBufferGeometry for better performance
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < this.particleCount; i++) {
      const color = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
      vertices.push(
        Math.random() * 60 - 30,
        Math.random() * 40 - 20,
        Math.random() * 60 - 30
      );

      colors.push(
        color.r,
        color.g,
        color.b,
        Math.random() * 0.7 + 0.3
      );
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 4)
    );

    const material = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
    this.camera.position.z = 40;
  }

  private animate(timestamp: number): void {
    if (!this.isVisible) return;

    if (timestamp - this.lastUpdate > this.updateInterval) {
      const positions = this.particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const time = timestamp * 0.0003;
        positions[i + 1] += Math.sin(time + i) * 0.006;
        positions[i] += Math.cos(time * 0.7 + i) * 0.004;
        positions[i + 2] += Math.sin(time * 0.5 + i) * 0.005;
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
      this.lastUpdate = timestamp;
    }

    this.renderer.render(this.scene, this.camera);
    this.animationFrame = requestAnimationFrame((t) => this.animate(t));
  }

  public resize(): void {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private observeVisibility(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) {
          this.animate(performance.now());
        } else if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.container);
  }

  public destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.renderer.dispose();
    this.scene.clear();
  }
}

export function useAIVisualization(containerRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!containerRef.current) return;

    const visualization = new AIVisualization(containerRef.current);
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => visualization.resize(), 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      visualization.destroy();
    };
  }, []);
} 