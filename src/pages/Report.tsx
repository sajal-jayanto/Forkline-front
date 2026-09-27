import { useRevenueReport } from '../hooks/useRevenueReport';
import { Button } from 'antd';

const formatAmount = (value: string) => Number(value).toFixed(2);

const Report = () => {
  const { report, loading, error } = useRevenueReport();

  return (
    <section className="py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-espresso">Report</h2>
          <p className="mt-1 text-base font-medium text-plum">Revenue by outlet</p>
        </div>
        {report && (
          <div className="text-right">
            <p className="text-xs font-medium text-espresso/60">Total revenue</p>
            <p className="text-2xl font-semibold text-espresso">
              ${formatAmount(report.totalRevenue)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-cream-border bg-[#EFE6D8] p-4">
        {loading && <p className="text-sm text-espresso/60">Loading report…</p>}
        {error && <p className="text-sm text-red-700">{error}</p>}
        {report && report.sales.length === 0 && (
          <p className="text-sm text-espresso/60">No outlets to report on yet.</p>
        )}
        {report && report.sales.length > 0 && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {report.sales.map((row) => (
              <li key={row.outletId} className="rounded-lg border border-cream-border bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-espresso">{row.outletName}</h3>
                  <span className="shrink-0 rounded-full bg-sand/50 px-2 py-0.5 text-xs font-medium text-plum">
                    {row.totalSales} {row.totalSales === 1 ? 'sale' : 'sales'}
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-espresso/60">Revenue</p>
                <p className="text-xl font-semibold text-plum">${formatAmount(row.totalRevenue)}</p>
                <Button block className="mt-3">Top sales </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Report;
