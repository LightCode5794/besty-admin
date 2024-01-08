import { Footer } from 'antd/lib/layout/layout'

import React, { useState, useEffect } from 'react'
// import './index.less'
import { Button, Col, Flex, Form, Input, Row, Space, Spin, message } from 'antd'
import { apiAddNewCategory } from '@src/apis/category/addNewCategory'

const Index: React.FC = () => {
	const [form] = Form.useForm();
	//const [categoriesList, setCategoriesList] = useState<Category[]>([]);
	const [loading, setLoading] = useState(false)
	const [messageApi, contextHolder] = message.useMessage();

	const errorNotice = () => {
		messageApi.open({
			type: 'error',
			content: 'Đã có lỗi xảy ra',
		});
	};
	const successNotice = () => {
		messageApi.open({
			type: 'success',
			content: 'Thêm danh mục thành công!',
		});
	};

	const onFinish = async (values: any) => {
		setLoading(true);
		
		try {
			const newCategory = {
				name: values.name
			}
			
			await apiAddNewCategory(newCategory)
			setLoading(false)
			form.resetFields()
			successNotice()
		}
		catch (err) {
			setLoading(false)
			errorNotice()
		}
	};

	return (
		<div className="container">

			<Spin spinning={loading} tip="Đang xử lý dữ liệu..." size='large'>
				{contextHolder}
				<Form
					form={form}
					name="create-product-form"
					layout="vertical"
					onFinish={onFinish}
				>
					<Flex vertical justify='center' align='center'>

						<h2>Thêm danh mục mới</h2>

						<Form.Item
							name='name'
							rules={[{ required: true, message: 'Bạn chưa nhập tên danh mục' }]}
							style={{ width: '50%' }}
						>
							<Input size='large' placeholder={"Tên danh mục"} />
						</Form.Item>

						<Form.Item colon={false}

							style={{ width: '20%' }}
						>
							<Button type="primary" htmlType="submit" block>
								Thêm
							</Button>

						</Form.Item>
					</Flex>
				</Form>
			</Spin>
			<Footer style={{ textAlign: 'center' }}>Besty Admin @2023</Footer>
		</div>
	)
}

export default Index
