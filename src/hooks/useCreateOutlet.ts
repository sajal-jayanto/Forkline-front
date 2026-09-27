import { useState } from 'react';
import { App } from 'antd';
import { createOutlet, type CreateOutletInput } from '../http/service/outlets';

type UseCreateOutletOptions = {
  onSuccess: () => void;
  onSettled: () => void;
};

export function useCreateOutlet({ onSuccess, onSettled }: UseCreateOutletOptions) {
  const [submitting, setSubmitting] = useState(false);
  const { notification } = App.useApp();

  const create = async (input: CreateOutletInput) => {
    setSubmitting(true);
    try {
      const outlet = await createOutlet(input);
      notification.success({
        title: 'Outlet created',
        description: `"${outlet.name}" was added successfully.`,
      });
      onSuccess();
    } catch (err) {
      notification.error({
        title: 'Sorry could not create outlet',
        description: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setSubmitting(false);
      onSettled();
    }
  };

  return { create, submitting };
}
