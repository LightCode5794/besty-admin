import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, ColorPicker, Form, Input, InputNumber, Space, Upload, UploadFile, message } from 'antd';
import { uploadMultiFile } from '@src/util/uploadMultipleImages';
import { uploadImageToCloud } from '@src/apis/uploadImages/uploadImage';
import { RcFile } from 'antd/es/upload';


interface DetailColorPickSizeProps {
    keyForm?: string | number;
    name?: any;
}

const DetailColorPickSize: React.FC<DetailColorPickSizeProps> = ({ keyForm, name }) => {

    return (
        <Form.Item
            key={keyForm}
            name={[name, "sizesColor"]}
            rules={[{ required: true, message: 'Bạn chưa nhập size cụ thể' }]}
        >
            <Form.List name={[name, "sizesColor"]} initialValue={[{}]}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align="baseline"    >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'size']}
                                    rules={[{ required: true, message: 'Chưa nhập size' }]}
                                >
                                    <Input placeholder="Size" size='large' />
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'quantity']}
                                    rules={[{ required: true, message: 'Chưa nhập số lượng' }]}
                                >
                                    <Input placeholder="Số lượng" type='number' size='large' />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    rules={[{ required: false }]}
                                    initialValue={0}
                                >
                                    <InputNumber
                                        placeholder='Giá riêng'                                     
                                        size='large'
                                        formatter={(value) => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value!.replace(/\ ₫\s?|(,*)/g, '')}
                                        style={{ width: '100%' }}

                                    />
                                </Form.Item>
                                {fields.length > 1 && (
                                    <MinusCircleOutlined style={{ marginBottom: '200%' }} onClick={() => { remove(name) }} />
                                )}

                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Thêm size
                            </Button>
                        </Form.Item>

                    </>
                )}
            </Form.List>
        </Form.Item>

    );
}

export default DetailColorPickSize;