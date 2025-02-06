import { Header } from '@/components/layout/Header';
import { SearchSection } from '@/components/SearchSection';
import { TaskList } from '@/components/TaskList';
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
      <Header />
      <SearchSection />
      <TaskList />
    </div>
  );
} 