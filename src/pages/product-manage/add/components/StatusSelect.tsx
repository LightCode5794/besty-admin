import React, { useState } from 'react';
import { Card, Form, Select } from 'antd';

const OPTIONS = ['Publish', 'Pending'];

interface StatusSelectProps {
  selectedStatus?: string;
  setSlectedStatus?: (status: string) => void;

}

const StatusSelect: React.FC<StatusSelectProps> = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <Card title='Trạng thái'>
      <Form.Item
       name='status' 
       rules={[{ required: true, message: 'Bạn chưa chọn trạng thái cho sản phẩm' }]}
       >
    <Select
      size='large'
      placeholder="Trạng thái sản phẩm"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{ width: '100%' }}
      options={filteredOptions.map((item) => ({
        value: item,
        label: item,
      }))}
    />
     </Form.Item>
    <Card.Meta description='Chọn trạng thái cho sản phẩm' style={{marginTop: 2}}/>
     </Card>
   
  );
};

export default StatusSelect;