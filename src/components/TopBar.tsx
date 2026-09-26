const MENU_ITEMS = ['Dashboard', 'Outlets', 'Report'] as const
export type MenuItem = (typeof MENU_ITEMS)[number]

type TopBarProps = {
  title: string
  activeItem: MenuItem
  onNavigate: (item: MenuItem) => void
}

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
        <button
          type="button"
          className="cursor-pointer rounded-md bg-sand px-4 py-2 text-xs font-semibold text-plum hover:opacity-90"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}

export default TopBar
