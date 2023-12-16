import axios from 'axios';

const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUD_NAME,
  uploadPreset:  import.meta.env.VITE_UPLOAD_PRESETS,
  apiSecret: import.meta.env.VITE_API_SECRET
};

export const uploadImageToCloud = async (file: any) => {
    console.log(file)
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'DoAn2');
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`, formData);
    if (response.status === 200) {
      const result = response.data;
      // Xử lý kết quả tải lên thành công
      console.log('Tải lên thành công:', result.secure_url);
      return result;
    } else {
      // Xử lý lỗi tải lên
      console.error('Lỗi tải lên:', response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    // Xử lý lỗi tải lên
    console.error('Lỗi tải lên:', error);
    throw error;
  }
};