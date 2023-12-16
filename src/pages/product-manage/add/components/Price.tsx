import React, { useState } from 'react';
import { Card, Flex, Form, Input, Select, Slider, Space } from 'antd';


const formatter = (value?: number) => `${value}%`;

const Price: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);

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
            <Input placeholder='Giá' size='large' />
          </Form.Item>

          <Form.Item
            name='discount'
            label='Phần trăm chiết khấu'
            rules={[{ required: false }]}
          >
            <div>

              <h1>{sliderValue}%</h1>
              <Slider key={'discount'} style={{ width: '100%' }} tooltip={{ formatter }} onChange={onSliderChange} />
            </div>
          </Form.Item>
        </Space>
      </Card>

    </>
  );
};

export default Price;