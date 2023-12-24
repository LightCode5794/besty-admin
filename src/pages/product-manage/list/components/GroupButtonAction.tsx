
import { Button, FloatButton, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { CommentOutlined, CustomerServiceOutlined, FileMarkdownOutlined, DeleteOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
import ProductDetail from '../../detail';
import { apiGetDetailProduct } from '@src/apis/product/getDetailProductById';

interface GroupButtonActionProps {
    productId?: number;
}

const GroupButtonAction: React.FC<GroupButtonActionProps> = ({ productId }) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<ProductDetails | undefined>()
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    useEffect(() => {
        const getProductData = async (id: number) => {
            const res = await apiGetDetailProduct(id);
            setProduct(res.data)
        }
        if (productId) {
            getProductData(productId)
        }

    }, []);
    return (<>
        <Modal
            open={open}
            title="Chi tiết sản phẩm"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            width={950}
        >
            <ProductDetail product={product} />
        </Modal>

        <Space >
            <Button icon={<FileMarkdownOutlined />}
                onClick={showModal}
            />
            <Button icon={<EditOutlined />} />
            <Button icon={<ImportOutlined />} />
            <Button type='primary' danger icon={<DeleteOutlined />} />
        </Space>
    </>)
}

export default GroupButtonAction;
