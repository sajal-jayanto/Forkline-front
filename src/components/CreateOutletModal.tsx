import { useState } from 'react';
import { App, Form, Input, Modal } from 'antd';
import { createOutlet } from '../http/service/outlets';
import OptionalLabel from './OptionalLabel';

type CreateOutletModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

type FormValues = {
  name: string;
  location?: string;
  description?: string;
};

const CreateOutletModal = ({ open, onClose, onCreated }: CreateOutletModalProps) => {
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const { notification } = App.useApp();

  const handleFinish = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const outlet = await createOutlet({
        name: values.name,
        location: values.location?.trim() || undefined,
        description: values.description?.trim() || undefined,
      });
      notification.success({
        title: 'Outlet created',
        description: `"${outlet.name}" was added successfully.`,
      });
      onCreated();
      onClose();
    } catch (err) {
      notification.error({
        title: 'Could not create outlet',
        description: err instanceof Error ? err.message : 'Something went wrong',
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Create outlet"
      okText="Create"
      onOk={() => form.submit()}
      onCancel={onClose}
      confirmLoading={submitting}
      cancelButtonProps={{ type: 'text' }}
      afterClose={() => form.resetFields()}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, whitespace: true, message: 'Outlet name is required.' }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item name="location" label={<OptionalLabel label="Location" />}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label={<OptionalLabel label="Description" />}>
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateOutletModal;
