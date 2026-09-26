import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { getMenuItems, type MenuItem } from '../http/service/menuItems';
import CreateMenuItemModal from '../components/CreateMenuItemModal';

const Dashboard = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadItems = useCallback(() => {
    getMenuItems()
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => loadItems(), [loadItems]);

  return (
    <section className="py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-espresso">Dashboard</h2>
          <p className="mt-1 text-base font-medium text-plum">Overview of all menu items</p>
        </div>
        <Button type="primary" onClick={() => setShowCreate(true)}>
          Create menu item
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-cream-border bg-[#EFE6D8] p-4">
        {loading && <p className="text-sm text-espresso/60">Loading menu items…</p>}
        {error && <p className="text-sm text-red-700">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-sm text-espresso/60">No menu items yet.</p>
        )}
        {items.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-cream-border bg-white p-3"
              >
                <div className="flex gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="size-16 shrink-0 rounded-md border border-cream-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-espresso">{item.name}</h3>
                      <span className="text-sm font-semibold text-plum">
                        ${Number(item.masterPrice).toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-espresso/60">{item.description}</p>
                  </div>
                </div>
                <Button type="primary" block className="mt-auto">
                  Assign to outlet
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CreateMenuItemModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={loadItems}
      />
    </section>
  );
};

export default Dashboard;
