import { Modal } from 'antd';
import { useTopItems } from '../hooks/useTopItems';

type TopSalesModalProps = {
  outletId: number | null;
  onClose: () => void;
};

const TopSalesContent = ({ outletId }: { outletId: number }) => {
  const { report, loading, error } = useTopItems(outletId);

  if (loading) return <p className="text-sm text-espresso/60">Loading top sales…</p>;
  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!report) return null;

  return (
    <>
      <p className="text-base font-medium text-plum">{report.outletName}</p>
      {report.items.length === 0 ? (
        <p className="mt-3 text-sm text-espresso/60">No sales yet.</p>
      ) : (
        <ol className="mt-3 divide-y divide-cream-border rounded-lg border border-cream-border">
          {report.items.map((item, index) => (
            <li key={item.menuItemId} className="flex items-center gap-3 px-4 py-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sand/50 text-xs font-semibold text-plum">
                {index + 1}
              </span>
              <span className="flex-1 font-medium text-espresso">{item.menuItemName}</span>
              <span className="text-sm font-semibold text-plum">{item.quantitySold} sold</span>
            </li>
          ))}
        </ol>
      )}
    </>
  );
};

const TopSalesModal = ({ outletId, onClose }: TopSalesModalProps) => (
  <Modal
    open={outletId !== null}
    title="Top sales"
    onCancel={onClose}
    footer={null}
    destroyOnHidden
  >
    <div className="mt-4">{outletId !== null && <TopSalesContent outletId={outletId} />}</div>
  </Modal>
);

export default TopSalesModal;
