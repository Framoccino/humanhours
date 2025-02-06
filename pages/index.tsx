import { Hero } from '@/components/Hero';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ServiceList } from '@/components/ServiceList';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar />
        <ServiceList />
      </main>
    </div>
  );
} 