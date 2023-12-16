import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Upload, UploadFile,  message } from 'antd';
import { uploadMultiFile } from '@src/util/uploadMultipleImages';
import { uploadImageToCloud } from '@src/apis/uploadImages/product/uploadImage';


const DetailImport: React.FC = () => {

    // const [fileList, setFileList] = useState<UploadFile[]>([

    // ]);
    const [messageApi, contextHolder] = message.useMessage();

    


    const [fileList, setFileList] = useState<Array<UploadFile[]>>([]);


  const onChange = (info: any, index: number) => {
    let newFileList = [...fileList];
    newFileList[index] = info.fileList;
    setFileList(newFileList);
    console.log('>>>>>>>>>>>', index)
    console.log(newFileList[index]);
  };

  const onRemoveImage = (index: number) => {
    let newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);
    console.log('>>>>>>>>>>>', index)
    console.log(newFileList[index]);
    console.log(newFileList.length);
  };

  const uploadImage = async() => {
       if(!fileList || !fileList.length ) {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
          });
      return;
    }
        const imgsDetails = fileList.map((fileList) => fileList[0].originFileObj);
       await uploadMultiFile(imgsDetails);
       
      // await uploadImageToCloud(imgsDetails[0])
  }


    return (
        
        <Card title='Chi tiết nhập'>
              {contextHolder}
            <Form.Item
                name='variations'
                rules={[{ required: true, message: 'Bạn chưa nhập chi tiết nhập' }]}
            >
                <Form.List name="variations">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'image']}
                                        rules={[{ required: true, message: 'Chưa chọn ảnh' }]}
                                    >
                                        <Upload
                                        
                                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                            listType="picture-card"
                                            onChange={(info) => onChange(info, index)}
                                            fileList={fileList[index] || []}
                                            beforeUpload={(file) => { console.log(file); return true }}
                                            onRemove={() => onRemoveImage(index)}
                                            onPreview={() => {}}
                                            maxCount={1}
                                        >
                                            {(fileList[index] && fileList[index].length  > 0 ) ?'' :   '+ Image'}
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'size']}
                                        rules={[{ required: true, message: 'Chưa nhập size' }]}
                                    >
                                        <Input placeholder="Size" size='large'/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'color']}
                                        rules={[{ required: true, message: 'Chưa nhập mã màu' }]}
                                    >
                                        <Input placeholder="Mã màu" size='large'/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'Chưa nhập số lượng' }]}
                                    >
                                        <Input placeholder="Số lượng" type='number'size='large' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        rules={[{ required: false }]}
                                    >
                                        <Input placeholder="Giá riêng (Nếu không nhập thì sẽ lấy giá cơ bản)" size='large' />
                                    </Form.Item>
                                    <MinusCircleOutlined style={{marginBottom: '200%'}} onClick={() => {onRemoveImage(index); remove(name)}} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button  type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button  type="dashed" onClick={() => uploadImage()} block icon={<PlusOutlined />}>
                                    upload images
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
        </Card>
    );
}

export default DetailImport;