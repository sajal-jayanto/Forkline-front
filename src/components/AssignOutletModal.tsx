import { Form, InputNumber, Modal, Select } from 'antd';
import { useAssignOutlet } from '../hooks/useAssignOutlet';
import { useOutlets } from '../hooks/useOutlets';

type AssignOutletModalProps = {
  menuItemId: number | null;
  onClose: () => void;
};

const AssignOutletModal = ({ menuItemId, onClose }: AssignOutletModalProps) => {
  const { outlets, loading: outletsLoading } = useOutlets();
  const { form, submitting, handleFinish } = useAssignOutlet({ menuItemId, onSettled: onClose });

  return (
    <Modal
      open={menuItemId !== null}
      title="Assign to outlet"
      okText="Assign"
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
          name="outletId"
          label="Outlet"
          rules={[{ required: true, message: 'Outlet is required.' }]}
        >
          <Select
            placeholder="Select an outlet"
            loading={outletsLoading}
            showSearch={{ optionFilterProp: 'label' }}
            options={outlets.map((outlet) => ({ value: outlet.id, label: outlet.name }))}
          />
        </Form.Item>
        <Form.Item
          name="priceOverride"
          label="Price"
          rules={[{ required: true, message: 'Price override is required.' }]}
        >
          <InputNumber min={0.01} step={0.01} precision={2} className="w-full" />
        </Form.Item>
        <Form.Item
          name="availableUnit"
          label="Available units"
          rules={[{ required: true, message: 'Available unit is required.' }]}
        >
          <InputNumber min={0} step={1} precision={0} className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignOutletModal;
