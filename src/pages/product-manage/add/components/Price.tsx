import React, { useState } from 'react';
import { Card, Flex, Form, Input, InputNumber, Select, Slider, Space } from 'antd';
import formatterCurrency from '@src/util/formatterCurrency';


const formatter = (value?: number) => `${value}%`;

const Price: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);

  const onSliderChange = (newValue: number) => {
    setSliderValue(newValue);
  };
  return (
    <>
      <Card title='Giá' >
        <Space style={{ width: '100%' }} direction='vertical'>
          <Form.Item
            name='price'
            label='Giá sản phẩm'
            rules={[{ required: true, message: 'Bản chưa nhập giá sản phẩm' }]}
          >
            {/* <InputNumber placeholder='Giá' size='large' formatter={(v) => formatterCurrency.format(v)} style={{ width: '100%' }} /> */}
            <InputNumber
           
              size='large'
              
              formatter={(value) => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\ ₫\s?|(,*)/g, '')}
              style={{ width: '100%' }} 

            />

          </Form.Item>

          <h1>{sliderValue}%</h1>
          <Form.Item
            name='discountPercent'
            label='Phần trăm chiết khấu'
            rules={[{ required: false }]}
            initialValue={0}
          >
            <Slider key={'discount'} style={{ width: '100%' }} tooltip={{ formatter }} onChange={onSliderChange} />

          </Form.Item>
        </Space>
      </Card>

    </>
  );
};

export default Price;