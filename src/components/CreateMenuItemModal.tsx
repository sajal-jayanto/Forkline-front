import { useState } from 'react';
import { App, Form, Input, InputNumber, Modal } from 'antd';
import { createMenuItem } from '../http/service/menuItems';
import OptionalLabel from './OptionalLabel';

type CreateMenuItemModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

type FormValues = {
  name: string;
  masterPrice: number;
  description?: string;
  imageUrl?: string;
};

const CreateMenuItemModal = ({ open, onClose, onCreated }: CreateMenuItemModalProps) => {
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const { notification } = App.useApp();

  const handleFinish = async (values: FormValues) => {
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
      onCreated();
      onClose();
    } catch (err) {
      notification.error({
        title: 'Could not create menu item',
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
      title="Create menu item"
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
          rules={[{ required: true, whitespace: true, message: 'Item name is required.' }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          name="masterPrice"
          label="Price"
          rules={[{ required: true, message: 'Master price is required.' }]}
        >
          <InputNumber min={0.01} step={0.01} precision={2} className="w-full" />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label={<OptionalLabel label="Image URL" />}
          rules={[{ type: 'url', message: 'Invalid image URL.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label={<OptionalLabel label="Description" />}>
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMenuItemModal;
