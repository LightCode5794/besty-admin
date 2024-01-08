
import { Button, Dropdown, Flex, Form, Input, MenuProps, Modal, Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { EllipsisOutlined, FileMarkdownOutlined, DeleteOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
import { apiUpdateCategory } from '@src/apis/category/updateCategory';

interface GroupButtonActionProps {
    category: Category;
}

const GroupButtonAction: React.FC<GroupButtonActionProps> = ({ category }) => {
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
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
                <Button icon={<EditOutlined />} onClick={showModal} />
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Popconfirm
                    placement="leftBottom"
                    title={`Bạn có chắc chắn muốn xoá danh mục "${category.name}"`}
                    description={''}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type='primary' danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
            key: '1',
            disabled: true,
        },
    ];

    const errorNotice = () => {
        messageApi.open({
            type: 'error',
            content: 'Đã có lỗi xảy ra',
        });
    };
    const successNotice = () => {
        messageApi.open({
            type: 'success',
            content: 'Chỉnh sửa danh mục thành công!',
        });
    };

    const onFinish = async (values: any) => {
        try {
            const categoryUpdate = {
                id: category.id,
                name: values.name
            }
            console.log(categoryUpdate)
            await apiUpdateCategory(categoryUpdate)

            successNotice()
            setOpen(false)
        }
        catch (err) {

            errorNotice()
        }
    };

    return (<>
        {contextHolder}
        <Modal
            open={open}
            title="Chỉnh sửa danh mục"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            width={500}
        >
            <Form

                name="update-category-form"
                layout="vertical"
                onFinish={onFinish}
            >
                <Flex vertical justify='center' align='center'>
                    <h2>Danh mục</h2>
                    <Form.Item
                        name='name'
                        rules={[{ required: true, message: 'Bạn chưa nhập tên danh mục' }]}
                        style={{ width: '50%' }}
                        initialValue={category.name}
                    >
                        <Input size='large' placeholder={"Tên danh mục"} />
                    </Form.Item>

                    <Form.Item colon={false}

                        style={{ width: '20%' }}
                    >
                        <Button type="primary" htmlType="submit" block>
                            Lưu
                        </Button>

                    </Form.Item>
                </Flex>
            </Form>

        </Modal>
        <Flex justify='center'>
            <Dropdown menu={{ items }} trigger={['click']} placement='bottomRight'>
                <EllipsisOutlined />
            </Dropdown>
        </Flex>

    </>)
}

export default GroupButtonAction;
