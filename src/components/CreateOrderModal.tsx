import { Button, Form, InputNumber, Modal, Select } from 'antd';
import type { MenuItem } from '../http/service/menuItems';
import { useCreateOrder, type CreateOrderFormValues } from '../hooks/useCreateOrder';

type CreateOrderModalProps = {
  open: boolean;
  outletId: number;
  menuItems: MenuItem[];
  onClose: () => void;
  onCreated: () => void;
};

const outletDetails = (item: MenuItem) => {
  const outletItem = item.outletMenuItems?.[0];
  return {
    price: Number(outletItem?.priceOverride ?? item.masterPrice),
    available: outletItem?.availableUnit ?? 0,
  };
};

const CreateOrderModal = ({
  open,
  outletId,
  menuItems,
  onClose,
  onCreated,
}: CreateOrderModalProps) => {
  const { form, submitting, handleFinish } = useCreateOrder({
    outletId,
    onSuccess: onCreated,
    onSettled: onClose,
  });
  const rows = Form.useWatch('items', form) ?? [];

  const menuItemById = new Map(menuItems.map((item) => [item.id, item]));
  const selectedIds = rows.map((row) => row?.menuItemId);
  const total = rows.reduce((sum, row) => {
    const item = row?.menuItemId ? menuItemById.get(row.menuItemId) : undefined;
    return item ? sum + outletDetails(item).price * (row.quantity ?? 0) : sum;
  }, 0);

  return (
    <Modal
      open={open}
      title="Create new order"
      okText="Create order"
      onOk={() => form.submit()}
      onCancel={onClose}
      confirmLoading={submitting}
      cancelButtonProps={{ type: 'text' }}
      afterClose={() => form.resetFields()}
      destroyOnHidden
    >
      <Form<CreateOrderFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        initialValues={{ items: [{ quantity: 1 }] }}
        className="mt-4"
      >
        <Form.List
          name="items"
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length === 0) {
                  throw new Error('Add at least one item.');
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name }, index) => {
                const selected = rows[name]?.menuItemId
                  ? menuItemById.get(rows[name].menuItemId!)
                  : undefined;
                const available = selected ? outletDetails(selected).available : undefined;

                return (
                  <div key={key} className="flex items-start gap-2">
                    <Form.Item
                      name={[name, 'menuItemId']}
                      label={index === 0 ? 'Menu item' : undefined}
                      rules={[{ required: true, message: 'Select a menu item.' }]}
                      className="flex-1"
                    >
                      <Select
                        placeholder="Select a menu item"
                        showSearch={{ optionFilterProp: 'label' }}
                        options={menuItems.map((item) => {
                          const { price, available } = outletDetails(item);
                          return {
                            value: item.id,
                            label: `${item.name} — ${price.toFixed(2)} (${available} left)`,
                            disabled:
                              available === 0 ||
                              (selectedIds.includes(item.id) && rows[name]?.menuItemId !== item.id),
                          };
                        })}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'quantity']}
                      label={index === 0 ? 'Quantity' : undefined}
                      rules={[
                        { required: true, message: 'Required.' },
                        {
                          validator: async (_, value) => {
                            if (available !== undefined && value > available) {
                              throw new Error(`Only ${available} left.`);
                            }
                          },
                        },
                      ]}
                      className="w-28"
                    >
                      <InputNumber min={1} precision={0} className="w-full" />
                    </Form.Item>
                    <Button
                      type="text"
                      onClick={() => remove(name)}
                      disabled={fields.length === 1}
                      className={index === 0 ? 'mt-[30px]' : undefined}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}

              <Form.ErrorList errors={errors} />

              <Button
                type="dashed"
                block
                onClick={() => add({ quantity: 1 })}
                disabled={fields.length >= menuItems.length}
              >
                + Add item
              </Button>
            </>
          )}
        </Form.List>
      </Form>

      <div className="mt-4 flex justify-between border-t border-cream-border pt-3">
        <span className="text-sm font-medium text-espresso/60">Total</span>
        <span className="text-base font-semibold text-espresso">{total.toFixed(2)}</span>
      </div>
    </Modal>
  );
};

export default CreateOrderModal;
