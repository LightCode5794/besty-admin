import React, { useEffect, useState } from 'react';
import { Card, Form, Select, Tag } from 'antd';
import { apiGetAllCategories } from '@src/apis/category/getAllCategory';
import FormItemLabel from 'antd/es/form/FormItemLabel';


const OPTIONS = ['Đồ mùa đông', 'Mùa hạ', 'Bananas', 'Helicopters'];




const CategorySelect: React.FC = () => {

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const filteredOptions = categoriesList.filter((o) => !selectedItems.includes(o.id));
  // const filteredOptions = categoriesList.filter((o) => !selectedCategories.includes(o.id));
  // const filteredValues = categoriesList.filter((o) => selectedCategories.includes(o.id));
  //console.log(selectedItems)
  useEffect(() => {

		const getCategoriesData = async () => {
			const categories = await apiGetAllCategories();
			setCategoriesList(categories.data);
		}
		getCategoriesData()
		//setCategoriesList([{ id: 1, name: 'mùa đông' }, { id: 2, name: 'mùa xuân' }])
	}, [])
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