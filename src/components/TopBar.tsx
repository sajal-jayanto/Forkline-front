import { Button } from 'antd';

const MENU_ITEMS = ['Dashboard', 'Outlets', 'Report'] as const;
export type MenuItem = (typeof MENU_ITEMS)[number];

type TopBarProps = {
  title: string;
  activeItem: MenuItem;
  onNavigate: (item: MenuItem) => void;
};

function TopBar({ title, activeItem, onNavigate }: TopBarProps) {
  return (
    <header className="border-b border-cream-border bg-espresso">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          <nav className="flex gap-2">
            {MENU_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium hover:text-white ${
                  item === activeItem ? 'bg-white/10 text-white' : 'text-sand'
                }`}
                aria-current={item === activeItem ? 'page' : undefined}
                onClick={() => onNavigate(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
        <Button className="border-none bg-sand text-xs text-plum hover:opacity-90">Sign out</Button>
      </div>
    </header>
  );
}

export default TopBar;
