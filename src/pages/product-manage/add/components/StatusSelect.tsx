import React, { useState } from 'react';
import { Card, Select } from 'antd';

const OPTIONS = ['Publish', 'Pending'];


const StatusSelect: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <Card title='Trạng thái'>
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
    <Card.Meta description='Chọn trạng thái cho sản phẩm' style={{marginTop: 2}}/>
     </Card>
  );
};

export default StatusSelect;