import { useState } from 'react';
import { Button } from 'antd';
import { useOutlets } from '../hooks/useOutlets';
import CreateOutletModal from '../components/CreateOutletModal';
import type { Outlet } from '../http/service/outlets';
import OutletDashboard from './OutletDashboard';

const Outlets = () => {
  const { outlets, loading, error, reload } = useOutlets();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);

  if (selectedOutlet) {
    return <OutletDashboard outlet={selectedOutlet} onBack={() => setSelectedOutlet(null)} />;
  }

  return (
    <section className="py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-espresso">Outlets</h2>
          <p className="mt-1 text-base font-medium text-plum">Overview of all outlets</p>
        </div>
        <Button type="primary" onClick={() => setShowCreate(true)}>
          Create outlet
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-cream-border bg-[#EFE6D8] p-4">
        {loading && <p className="text-sm text-espresso/60">Loading outlets…</p>}
        {error && <p className="text-sm text-red-700">{error}</p>}
        {!loading && !error && outlets.length === 0 && (
          <p className="text-sm text-espresso/60">No outlets yet.</p>
        )}
        {outlets.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outlets.map((outlet) => (
              <li key={outlet.id} className="rounded-lg border border-cream-border bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-espresso">{outlet.name}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      outlet.isActive ? 'bg-sand/50 text-plum' : 'bg-espresso/10 text-espresso/60'
                    }`}
                  >
                    {outlet.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {outlet.location && (
                  <p className="mt-1 text-sm font-medium text-plum">{outlet.location}</p>
                )}
                {outlet.description && (
                  <p className="mt-2 line-clamp-2 text-xs text-espresso/60">{outlet.description}</p>
                )}
                <Button block className="mt-3" onClick={() => setSelectedOutlet(outlet)}>
                  Checkout
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CreateOutletModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={reload}
      />
    </section>
  );
};

export default Outlets;
