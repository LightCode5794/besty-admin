'use client'
import { customCurVND } from "@src/util/formatterCurrency";
import { Flex, Space, Image, Row, Col, Divider } from "antd";


interface Item {
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
const ProductItem = ({ item }: { item: Item }) => {
    return (
        <>
            <Divider />
            <Row align='middle' gutter={[20, 20]}>
                <Col span={4}>
                    <Image width={'100%'} src={item.image} preview={false} />
                </Col>
                <Col>

                    <Space direction='vertical'>
                        <h4>{item.name}</h4>
                        <Space>
                            <p>Màu sắc: </p>
                            <div style={{ width: 15, background: `${item.color}`, height: 15, borderRadius: 50 }} > </div>
                        </Space>
                        <Space size={'large'}>
                            <Space>
                                <p>Kích thước: </p>
                                <b>{item.size}</b>
                            </Space>
                            <Space>
                                <p>Số lượng: </p>
                                <b>{item.quantity}</b>
                            </Space>
                        </Space>
                        <b >{customCurVND(item.price)}</b>
                    </Space>
                </Col>

            </Row>
        </>
    )
}
export default ProductItem;