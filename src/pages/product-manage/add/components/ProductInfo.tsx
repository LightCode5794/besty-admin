import React, { useState } from 'react';
import { Card, Form, Input, Select, Space } from 'antd';




const ProductInfo: React.FC = () => {
  return (
    <>
      <Card title='Thông tin sản phẩm'>
        <Space style={{width: '100%'}} direction='vertical'>
        <Form.Item 
        name='name' 
        label='Tên sản phẩm'
        rules={[{ required: true, message: 'Bạn chưa nhập tên sản phẩm' }]}
        >
            <Input placeholder='Tên sản phẩm'/>
        </Form.Item>
        <Form.Item 
        name='description'
        label='Mô tả'
        rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
        >
            <Input.TextArea placeholder='Mô tả về sản phẩm'/>
        </Form.Item>
        </Space>
     </Card>
   
    </>
  );
};

export default ProductInfo;