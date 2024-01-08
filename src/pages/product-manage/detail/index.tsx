import React from 'react';
import { Row, Col, Card, List, Avatar, Image, Space, Flex, Tag } from 'antd';
import formatterCurrency from '@src/util/formatterCurrency';
import Price from '../add/components/Price';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import Title from 'antd/es/skeleton/Title';

interface Product {
  id: number;
  thumbnail: string;
  descriptionImages: string[];
  categories: string[];
  status: string;
  colors: Color[];
}

interface Color {
  id: number;
  name: string;
  image: string;
  sizes: string[];
  stock: number;
}

interface ProductDetailProps {
  product?: ProductDetails;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  if (!product) {
    return null; // Hoặc hiển thị một giao diện rỗng nếu không có product
  }
  const { thumbnail, description, categories, status, variations, images, id, name, price } = product;

  console.log(product)

  return (
    <div>
      <Row gutter={[16, 16]} >
        <Col span={4}>
          <Image src={thumbnail} />
        </Col>
        <Col span={6}>
          <Flex vertical justify='center'>
            <Space>
              <h3>ID:</h3>
              <p>{id}</p>
            </Space>
            <Space>
              <h3>Tên:</h3>
              <p>{name}</p>
            </Space>
            <Space>
              <h3>Giá:</h3>
              <p>{formatterCurrency.format(price)}</p>
            </Space>

            <Space>
              <h3>Danh mục:</h3>
              <Space>
                {
                  categories.map((c, index) => <Tag key={index}>{c.name}</Tag>)
                }
              </Space>

            </Space>
            <Space>
              <h3>Tình trạng:</h3>
              {status == 'publish' ? <Tag color='success'>{product.status}</Tag> : <Tag color='processing'>{product.status}</Tag>}
            </Space>

          </Flex>
        </Col>
        <Col span={14}>
          <Flex vertical>
            <h3>Mô tả:</h3>
            <p>{description}</p>
          </Flex>
        </Col>
      </Row>
      <h3>Ảnh mô tả</h3>
      <Row >
        
        <Space >
        
          {images.map((i, index) => <Image key={index} src={i} height={'200px'} />)}
        </Space>
      </Row>
      <Row>
        <Space direction='vertical' style={{ width: '100%' }}>
          <h3>Kho hàng</h3>
          {
            variations.map(v => {
              return (
                <>
                  <Row gutter={[8,8]} align={'middle'}>
                    <Col span={3}>
                      <Image src={v.image} />
                    </Col>
                    <Col span={21}>
                      <Row align={'stretch'}>
                        <Space style={{ width: '100%' }}>
                          <h4>Màu: </h4>
                          <div style={{ backgroundColor: `${v.color}`, width: '100px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{v.color}</div>
                        </Space>
                      </Row>
                      <Row >
                        <Space direction='vertical'>
                          {v.sizesColor.map(s => (<>
                            <Space >
                              <Space>
                                <b>Size:</b>
                                <p>{s.size}</p>
                              </Space>
                              <Space>
                                <b>Kho:</b>
                                <p>{s.inventory}</p>
                              </Space>
                            </Space>
                          </>))}
                        </Space>
                      </Row>
                    </Col>
                  </Row>
                </>
              )
            })
          }
        </Space>
      </Row>
    </div>
  );
};

export default ProductDetail;