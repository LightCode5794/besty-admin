import React, { useState } from 'react';
import { Card, Form, Select } from 'antd';

const OPTIONS = ['Đồ mùa đông', 'Mùa hạ', 'Bananas', 'Helicopters'];


const CategorySelect: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <>
   
    <Card title='Danh mục'>
        <Form.Item
         name='categories' 
         rules={[{ required: true, message: 'Bạn chưa chọn danh mục cho sản phẩm' }]}
         >
    <Select
      size='large'
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{ width: '100%' }}
      options={filteredOptions.map((item) => ({
        value: item,
        label: item,
      }))}
    />
        </Form.Item>
    <Card.Meta description='Chọn danh mục cho sản phẩm' style={{marginTop: 2}}/>
     </Card>
   
    </>
  );
};

export default CategorySelect;