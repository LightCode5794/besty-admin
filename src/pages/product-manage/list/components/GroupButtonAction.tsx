
import { Button, Dropdown, Flex, FloatButton, MenuProps, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { CommentOutlined, CustomerServiceOutlined, EllipsisOutlined, DownOutlined, FileMarkdownOutlined, DeleteOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
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

    const items: MenuProps['items'] = [
        {
            label: (
                <Button icon={<FileMarkdownOutlined />}
                    onClick={showModal}
                />
            ),
            key: '0',
        },
        {
            label: (
                <Button icon={<EditOutlined />} />
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (<Button icon={<ImportOutlined />} />),
            key: '4',
            disabled: true,
        },
        {
            label: (<Button type='primary' danger icon={<DeleteOutlined />} />),
            key: '3',
            disabled: true,
        },
    ];



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
        <Flex justify='center'>
        <Dropdown menu={{ items }} trigger={['click']}>
            <EllipsisOutlined />
        </Dropdown>
        </Flex>
       
    </>)
}

export default GroupButtonAction;
