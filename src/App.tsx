import { useState, type JSX } from 'react';
import TopBar, { type MenuItem } from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Outlets from './pages/Outlets';
import Report from './pages/Report';

const PAGES: Record<MenuItem, () => JSX.Element> = {
  Dashboard,
  Outlets,
  Report,
};

function App() {
  const [activeItem, setActiveItem] = useState<MenuItem>('Dashboard');
  const RenderPage = PAGES[activeItem];

  return (
    <>
      <TopBar title="Forkline" activeItem={activeItem} onNavigate={setActiveItem} />
      <main className="mx-auto max-w-page px-6">
        <RenderPage />
      </main>
    </>
  );
}

export default App;
