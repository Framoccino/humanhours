import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/HeroSection';
import { TaskSection } from '@/components/TaskSection';
import { SkillSection } from '@/components/SkillSection';
import { useEffect } from 'react';
import '../scripts/verify-connections';
import { verifySite } from '../scripts/verify-site';

export default function Home() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      verifySite().then(isValid => {
        if (!isValid) {
          console.warn('Site verification failed. Check console for details.');
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Green Section */}
      <Header />
      <HeroSection />
      
      {/* Main Content */}
      <main>
        <SkillSection />
        <TaskSection />
      </main>
    </div>
  );
} 