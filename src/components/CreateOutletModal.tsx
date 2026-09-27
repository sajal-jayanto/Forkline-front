import { Form, Input, Modal } from 'antd';
import { useCreateOutlet } from '../hooks/useCreateOutlet';
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
  const { create, submitting } = useCreateOutlet({ onSuccess: onCreated, onSettled: onClose });

  const handleFinish = (values: FormValues) => {
    create({
      name: values.name,
      location: values.location?.trim() || undefined,
      description: values.description?.trim() || undefined,
    });
  }

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
