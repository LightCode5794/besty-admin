import React, { useState } from 'react';
import { Card, Form, Select, Tag } from 'antd';


const OPTIONS = ['Đồ mùa đông', 'Mùa hạ', 'Bananas', 'Helicopters'];

interface CategorySelectProps {
  categoriesList: Category[];
}


const CategorySelect: React.FC<CategorySelectProps> = ({categoriesList}) => {

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const filteredOptions = categoriesList.filter((o) => !selectedItems.includes(o.id));
  // const filteredOptions = categoriesList.filter((o) => !selectedCategories.includes(o.id));
  // const filteredValues = categoriesList.filter((o) => selectedCategories.includes(o.id));
  //console.log(selectedItems)
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
            labelInValue
            onChange={setSelectedItems}
            style={{ width: '100%' }}
            options={filteredOptions.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Card.Meta description='Chọn danh mục cho sản phẩm' style={{ marginTop: 2 }} />
      </Card>

    </>
  );
};

export default CategorySelect;