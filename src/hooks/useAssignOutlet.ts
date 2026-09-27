import { useState } from 'react';
import { App, Form } from 'antd';
import { assignOutlet } from '../http/service/menuItems';

export type AssignOutletFormValues = {
  outletId: number;
  priceOverride: number;
  availableUnit: number;
};

type UseAssignOutletOptions = {
  menuItemId: number | null;
  onSettled: () => void;
};

export const useAssignOutlet = ({ menuItemId, onSettled }: UseAssignOutletOptions)  =>{
  const [form] = Form.useForm<AssignOutletFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const { notification } = App.useApp();

  const handleFinish = async (values: AssignOutletFormValues) => {
    if (menuItemId === null) return;

    setSubmitting(true);
    try {
      await assignOutlet({
        menuItemId,
        outletId: values.outletId,
        priceOverride: values.priceOverride,
        availableUnit: values.availableUnit,
      });
      notification.success({
        title: 'Menu item assigned',
        description: 'The menu item was assigned to the outlet successfully.',
      });
    } catch (err) {
      notification.error({
        title: 'Sorry could not assign menu item',
        description: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setSubmitting(false);
      onSettled();
    }
  };

  return { form, submitting, handleFinish };
}
