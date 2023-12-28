import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, ColorPicker, Flex, Form, Input, InputNumber, Row, Space, Upload, UploadFile, message } from 'antd';
import { uploadMultiFile } from '@src/util/uploadMultipleImages';
import { uploadImageToCloud } from '@src/apis/uploadImages/uploadImage';
import { RcFile } from 'antd/es/upload';
import { Column } from '@ant-design/charts';
import DetailColorPickSize from './DetailColorPickSize';


interface DetailImportProps {
    fileListDetail: Array<UploadFile[]>;
    setFileList: (fileListDetail: Array<UploadFile[]>) => void;
}

const DetailImport: React.FC<DetailImportProps> = ({ fileListDetail, setFileList }) => {

    // const [fileList, setFileList] = useState<UploadFile[]>([
    // ]);
    //const [messageApi, contextHolder] = message.useMessage();
    //const [fileList, setFileList] = useState<Array<UploadFile[]>>([]);

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onChange = (info: any, index: number) => {
        let newFileList = [...fileListDetail];
        newFileList[index] = info.fileList;
        setFileList(newFileList);
        // console.log('>>>>>>>>>>>', index)
        // console.log(newFileList[index]);
    };

    const onRemoveImage = (index: number) => {
        let newFileList = [...fileListDetail];
        newFileList.splice(index, 1);
        setFileList(newFileList);
        // console.log('>>>>>>>>>>>', index)
        // console.log(newFileList[index]);
        // console.log(newFileList.length);
    };

    //   const uploadImage = async() => {
    //        if(!fileList || !fileList.length ) {
    //         messageApi.open({
    //             type: 'error',
    //             content: 'This is an error message',
    //           });
    //       return;
    //     }
    //         const imgsDetails = fileList.map((fileList) => fileList[0].originFileObj);
    //        await uploadMultiFile(imgsDetails);

    //       // await uploadImageToCloud(imgsDetails[0])
    //   }

    return (

        <Card title='Chi tiết nhập'>

            <Form.Item
                name='variations'
                rules={[{ required: true, message: 'Bạn chưa nhập chi tiết nhập' }]}
            >
                <Form.List name="variations" initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (


                                <Row gutter={4} align={'middle'} key={key}>
                                    <Col span={4} >

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'image']}
                                            rules={[{ required: true, message: 'Chưa chọn ảnh' }]}
                                        >
                                            <Upload

                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                listType="picture-card"
                                                onChange={(info) => onChange(info, index)}
                                                fileList={fileListDetail[index] || []}
                                                beforeUpload={(file) => { console.log(file); return true }}
                                                onRemove={() => onRemoveImage(index)}
                                                onPreview={onPreview}
                                                maxCount={1}
                                            >
                                                {(fileListDetail[index] && fileListDetail[index].length > 0) ? '' : '+ Image'}
                                            </Upload>
                                        </Form.Item>


                                    </Col>
                                    <Col span={17}>
                                        <Space direction='vertical' style={{ width: '100%' }}>
                                            <Flex gap={8}>
                                            <Form.Item
                                                initialValue={null}
                                                {...restField}
                                                name={[name, 'color']}
                                                rules={[{ required: true, message: 'Chưa nhập mã màu' }]}
                                                style={{ width: '100%', flex: 1 }} // Đặt width thành '100%'
                                            >
                                                <ColorPicker size="large" showText style={{ width: '100%' }} />
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
                                            </Flex>
                                            
                                            <DetailColorPickSize keyForm={key} name={name} />


                                        </Space>



                                    </Col>
                                    <Col span={3} >

                                        {fields.length > 1 && (
                                            <Flex justify='center'>

                                                <Button type='primary' onClick={() => { onRemoveImage(index); remove(name) }} icon={<DeleteOutlined />} style={{ height: '100%' }}></Button>
                                            </Flex>
                                        )}


                                    </Col>
                                </Row>


                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm kiểu
                                </Button>
                            </Form.Item>
                            {/* <Form.Item>
                                <Button  type="dashed" onClick={() => uploadImage()} block icon={<PlusOutlined />}>
                                    upload images
                                </Button>
                            </Form.Item> */}
                        </>
                    )}
                </Form.List>
            </Form.Item>
        </Card>
    );
}

export default DetailImport;