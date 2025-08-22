import DeepResearchAgent from '@/components/DeepResearchAgent';
import TopMenu from '@/components/TopMenu'; // Import the new menu component

export default function Home() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <TopMenu name="Tom Keldenich" imageUrl="/images/profile.jpeg" />
      <main className="flex-1 overflow-auto">
        <DeepResearchAgent />
      </main>
    </div>
  );
}

