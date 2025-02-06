import { Header } from '@/components/layout/Header';
import { SearchSection } from '@/components/SearchSection';
import { TaskList } from '@/components/TaskList';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchSection />
      <TaskList />
    </div>
  );
} 