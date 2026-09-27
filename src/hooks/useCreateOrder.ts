import { useState } from 'react';
import { App, Form } from 'antd';
import { createSale } from '../http/service/sales';

export type OrderItemFormValues = {
  menuItemId?: number;
  quantity?: number;
};

export type CreateOrderFormValues = {
  items: OrderItemFormValues[];
};

type UseCreateOrderOptions = {
  outletId: number;
  onSuccess: () => void;
  onSettled: () => void;
};

export const useCreateOrder = ({ outletId, onSuccess, onSettled }: UseCreateOrderOptions) => {
  const [form] = Form.useForm<CreateOrderFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const { notification } = App.useApp();

  const handleFinish = async (values: CreateOrderFormValues) => {
    setSubmitting(true);
    try {
      const sale = await createSale({
        outletId,
        items: values.items.map((item) => ({
          menuItemId: item.menuItemId!,
          quantity: item.quantity!,
        })),
      });
      notification.success({
        title: 'Order created',
        description: `Receipt #${sale.receiptNumber} — total ${Number(sale.totalAmount).toFixed(2)}`,
      });
      onSuccess();
    } catch (err) {
      notification.error({
        title: 'Sorry could not create order',
        description: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setSubmitting(false);
      onSettled();
    }
  };

  return { form, submitting, handleFinish };
}
