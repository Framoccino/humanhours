import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export class AIVisualization {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particleSystem: THREE.Points;
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

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initParticles();
    this.startAnimation();
  }

  private initScene() {
    this.scene = new THREE.Scene();
  }

  private initCamera() {
    const aspectRatio = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 5;
  }

  private initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  private initParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions.set([x, y, z], i * 3);

      const color = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
      colors.set([color.r, color.g, color.b], i * 3);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  private startAnimation() {
    const animate = (time: number) => {
      this.animationFrame = requestAnimationFrame(animate);

      if (time - this.lastUpdate >= this.updateInterval) {
        this.updateParticles();
        this.renderer.render(this.scene, this.camera);
        this.lastUpdate = time;
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private updateParticles() {
    const positions = this.particleSystem.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01;
      positions[i + 1] += (Math.random() - 0.5) * 0.01;
      positions[i + 2] += (Math.random() - 0.5) * 0.01;
    }

    this.particleSystem.geometry.attributes.position.needsUpdate = true;
  }

  public resize() {
    const aspectRatio = this.container.clientWidth / this.container.clientHeight;
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  public destroy() {
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