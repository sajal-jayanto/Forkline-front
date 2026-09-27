import { Form, Input, InputNumber, Modal } from 'antd';
import { useCreateMenuItem } from '../hooks/useCreateMenuItem';
import OptionalLabel from './OptionalLabel';

type CreateMenuItemModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const CreateMenuItemModal = ({ open, onClose, onCreated }: CreateMenuItemModalProps) => {
  const { form, submitting, handleFinish } = useCreateMenuItem({
    onSuccess: onCreated,
    onSettled: onClose,
  });

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
