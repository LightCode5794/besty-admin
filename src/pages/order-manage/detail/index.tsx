import React, { useEffect, useState } from 'react';
import { Row, Col, Card, List, Avatar, Image, Space, Flex, Tag } from 'antd';
import formatterCurrency, { customCurVND } from '@src/util/formatterCurrency';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import Title from 'antd/es/skeleton/Title';
import { apiGetOrderById } from '@src/apis/order/getOrderById';
import ProductItem from './components/ProductItem';


type product = {
  sizeColorId: number,
  quantity: number,
  size: string,
  colorId: number,
  color: string,
  image: string,
  productId: number,
  name: string,
  price: number,
}
type paymentMethod = {
  id: number,
  name: string,
}
interface OrderFetch {
  id: number,
  address: string,
  email: string,
  fullName: string,
  phoneNumber: string,
  totalAmount: number,
  status: string,
  products: product[],
  paymentMethod: paymentMethod
  createdDate: Date
}

interface orderDetail {
  key: React.Key,
  id: number,
  generalInfo: {
    email: string,
    fullName: string,
    phoneNumber: string,
    address: string,
  }
  totalAmount: number,
  status: string,
  products: product[],
  paymentMethod: paymentMethod
  createdDate: Date
}
interface OrderDetailProps {
  orderId?: number;
}

const OrderDetail = ({ orderId }: OrderDetailProps) => {

  if (!orderId) {
    return null; // Hoặc hiển thị một giao diện rỗng nếu không có product
  }
  const [orderDetail, setOrderDetail] = useState<OrderFetch>();

  useEffect(() => {
    const getOrderData = async () => {
      const data = await apiGetOrderById(orderId);
      const order: OrderFetch = data.data;

      if (order) {
        setOrderDetail(order);
      }
    }
    getOrderData();
  }, [])


  return (
    <div>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Flex justify='center'>
          <h4>THÔNG TIN ĐƠN HÀNG #{orderDetail?.id}</h4>
        </Flex>

        <p>Khách hàng: {orderDetail?.fullName} </p>
        <p>Email: {orderDetail?.email} </p>
        <p>Số điện thoại: {orderDetail?.phoneNumber} </p>
        <p>Địa chỉ giao hàng: {orderDetail?.address}</p>
        <p>Giá trị đơn: {customCurVND(orderDetail?.totalAmount ?? 0)} </p>
        <p>Ngày đặt hàng: {orderDetail?.createdDate.toString()} </p>
        <p>Phương thức thanh toán: {orderDetail?.paymentMethod.name} </p>
        <p>Trạng thái đơn: {
          orderDetail?.status == 'complete' ?
            <Tag color='success' >Đã thanh toán</Tag>
            :
            orderDetail?.status == 'canceled' ?
              <Tag color='red'> Đã huỷ</Tag>
              :
              <Tag color='processing'>Chờ thanh toán</Tag>

        } </p>
      </Space>
      <Flex justify='center'>
        <h4>THÔNG TIN SẢN PHẨM</h4>
      </Flex>
      
          {orderDetail?.products.map((product, index) => (<ProductItem key={index} item={product} />))}
       
    </div>
  );
};

export default OrderDetail;