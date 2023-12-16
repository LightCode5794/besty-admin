
import {  message } from 'antd';
import { uploadImageToCloud } from '@src/apis/uploadImages/uploadImage';

 export const uploadMultiFile = async (fileList: Array<any>) => {
    
    const uploadPromises = fileList.map(async (file: any) => {
      try {
        const result = await  uploadImageToCloud(file);
        // Xử lý kết quả tải lên thành công
        console.log('Tải lên thành công:', result.secure_url);
      } catch (error) {
        // Xử lý lỗi tải lên
        console.error('Lỗi tải lên:', error);
      }
    });

    try {
      await Promise.all(uploadPromises);
      message.success('Tải lên thành công');
    } catch (error) {
      message.error('Lỗi tải lên');
    }
  };

