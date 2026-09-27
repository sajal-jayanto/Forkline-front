import type { MenuItem } from '../http/service/menuItems';

// Price and stock for the outlet the item was fetched for, falling back to the master price.
export const outletDetails = (item: MenuItem) => {
  const outletItem = item.outletMenuItems?.[0];
  return {
    price: Number(outletItem?.priceOverride ?? item.masterPrice),
    available: outletItem?.availableUnit ?? 0,
  };
};
