
import { Button, Dropdown, Flex, MenuProps, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { EllipsisOutlined, FileMarkdownOutlined, DeleteOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
import ProductDetail from '../../detail';


interface ActionButtonGroupProps {
    orderId?: number;
}

const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({ orderId }) => {
    const [open, setOpen] = useState(false);
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

    return (<>
        <Modal
            open={open}
            title="Chi tiết Đơn hàng"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            width={950}
        >
            <ProductDetail orderId={orderId} />
        </Modal>
        <Flex justify='center'>
            <Dropdown menu={{ items }} trigger={['click']}>
                <EllipsisOutlined />
            </Dropdown>
        </Flex>


    </>)
}

export default ActionButtonGroup;
