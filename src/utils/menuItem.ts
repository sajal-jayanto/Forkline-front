import type { MenuItem } from '../http/service/menuItems';

export const outletDetails = (item: MenuItem) => {
  const outletItem = item.outletMenuItems?.[0];
  return {
    price: Number(outletItem?.priceOverride ?? item.masterPrice),
    available: outletItem?.availableUnit ?? 0,
  };
};
