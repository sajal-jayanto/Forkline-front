import { useState } from 'react';
import { Button } from 'antd';
import type { Outlet } from '../http/service/outlets';
import { useMenuItems } from '../hooks/useMenuItems';
import CreateOrderModal from '../components/CreateOrderModal';
import { outletDetails } from '../utils/menuItem';

type OutletDashboardProps = {
  outlet: Outlet;
  onBack: () => void;
};

const OutletDashboard = ({ outlet, onBack }: OutletDashboardProps) => {
  const { items, loading, error, reload } = useMenuItems(outlet.id);
  const [showOrder, setShowOrder] = useState(false);

  return (
    <section className="py-8">
      <Button type="link" onClick={onBack} className="mb-2 px-0 text-plum">
        ← Back to outlets
      </Button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-espresso">{outlet.name}</h2>
          {outlet.location && (
            <p className="mt-1 text-base font-medium text-plum">{outlet.location}</p>
          )}
        </div>
        <Button type="primary" onClick={() => setShowOrder(true)}>
          Create new order
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
                        ${Number(outletDetails(item).price).toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-espresso/60">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CreateOrderModal
        open={showOrder}
        outletId={outlet.id}
        menuItems={items}
        onClose={() => setShowOrder(false)}
        onCreated={reload}
      />
    </section>
  );
};

export default OutletDashboard;
