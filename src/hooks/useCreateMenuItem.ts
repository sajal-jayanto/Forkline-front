import { useState } from 'react';
import { App, Form } from 'antd';
import { createMenuItem } from '../http/service/menuItems';

export type CreateMenuItemFormValues = {
  name: string;
  masterPrice: number;
  description?: string;
  imageUrl?: string;
};

type UseCreateMenuItemOptions = {
  onSuccess: () => void;
  onSettled: () => void;
};


export const useCreateMenuItem = ({ onSuccess, onSettled }: UseCreateMenuItemOptions) => {
  const [form] = Form.useForm<CreateMenuItemFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const { notification } = App.useApp();

  const handleFinish = async (values: CreateMenuItemFormValues) => {
    setSubmitting(true);
    try {
      const item = await createMenuItem({
        name: values.name,
        masterPrice: values.masterPrice,
        description: values.description?.trim() || undefined,
        imageUrl: values.imageUrl?.trim() || undefined,
      });
      notification.success({
        title: 'Menu item created',
        description: `"${item.name}" was added successfully.`,
      });
      onSuccess();
    } catch (err) {
      notification.error({
        title: 'Sorry Could not create menu item',
        description: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setSubmitting(false);
      onSettled();
    }
  };

  return { form, submitting, handleFinish };
}
