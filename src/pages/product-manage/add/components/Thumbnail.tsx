import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { Card, Flex, Form, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import './index.less';

interface ThumbnailProps {
   fileListThumbnail: UploadFile[];
   setFileList: (fileListThumbnail: UploadFile[]) => void;
}
const Thumbnail: React.FC<ThumbnailProps> = ({fileListThumbnail, setFileList}) => {
  //const [fileList, setFileList] = useState<UploadFile[]>([]);


  // useEffect(() => {
  //   if(isSubmited == false) {
  //     setFileList([])
      
  //   }
  //   console.log(isSubmited)
  // }, [isSubmited])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

  return (
    <>
      <Card title='Thumbnail' bordered={false} className='thumbnail'>
        <Form.Item
          name='thumbnail'
          rules={[{ required: true, message: 'Bạn chưa chọn thumbnail cho sản phẩm' }]}
        >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileListThumbnail}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={(file) => { console.log(file); return false }}
            maxCount={1}
          >
            {fileListThumbnail.length < 1 && '+ Upload'}
          </Upload>
        </Form.Item>

      </Card>
    </>
  );
};

export default Thumbnail;