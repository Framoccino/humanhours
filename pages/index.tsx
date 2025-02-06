import { Header } from '@/components/layout/Header';
import { TaskSection } from '@/components/TaskSection';
import { SkillSection } from '@/components/SkillSection';
import { useEffect } from 'react';
import '../scripts/verify-connections';
import { verifySite } from '../scripts/verify-site';
import { SearchAndSkills } from '@/components/SearchAndSkills';

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
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
          <SearchAndSkills />
        </div>
        <TaskSection />
      </main>
    </div>
  );
} 