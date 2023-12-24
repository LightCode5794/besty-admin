import { Footer } from 'antd/lib/layout/layout'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import './index.less'
import { Button, Card, Col, Form, Row, Space, Spin, UploadFile, message } from 'antd'
import Thumbnail from './components/Thumbnail'
import CategorySelect from './components/CategorySelect'
import ProductInfo from './components/ProductInfo'
import Price from './components/Price'
import StatusSelect from './components/StatusSelect'
import DetailImport from './components/DetailImport'
import ImageProductSelect from './components/ImageProductSelect'
import { uploadImageToCloud } from '@src/apis/uploadImages/uploadImage'
import { uploadMultiFile } from '@src/util/uploadMultipleImages'
import { apiGetAllCategories } from '@src/apis/category/getAllCategory'
import { apiCreateProduct } from '@src/apis/product/create'

const Index: React.FC = () => {
	const [form] = Form.useForm();
	const [categoriesList, setCategoriesList] = useState<Category[]>([]);
	const [loading, setLoading] = useState(false)
	const [messageApi, contextHolder] = message.useMessage();
	const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>([])
	const [fileListImages, setFileListImages] = useState<UploadFile[]>([])
	const [fileListDetail, setFileListDetail] = useState<Array<UploadFile[]>>([])
	useEffect(() => {

		const getCategoriesData = async () => {
			const categories = await apiGetAllCategories();
			setCategoriesList(categories.data);
		}
		getCategoriesData()
		//setCategoriesList([{ id: 1, name: 'mùa đông' }, { id: 2, name: 'mùa xuân' }])
	}, [])

	const errorNotice = () => {
		messageApi.open({
			type: 'error',
			content: 'Đã có lỗi xảy ra',
		});
	};
	const successNotice = () => {
		messageApi.open({
			type: 'success',
			content: 'Thêm sản phẩm thành công!',
		});
	};


	const clearImages = () => {
		setFileListImages([]);
		setFileListThumbnail([]);
		setFileListDetail([]);
	}

	const onFinish = async (values: any) => {
		setLoading(true);
		try {

			//console.log(values)
			//console.log(values.variations[0].color.toHex())

			//upload thumbnail to cloud
			const thumbnailCloud = await uploadImageToCloud(values.thumbnail.file).then((res) => res.secure_url);

			const images = values.images.fileList;

			// upload list images product to cloud
			const imagesList = await Promise.all(images.map(async (i: any) =>
				await uploadImageToCloud(i.originFileObj)
					.then((res) => res.secure_url)))

			const variations = values.variations;

			//upload variation image to cloud
			const variationsProducts = await Promise.all(variations.map(async (v: any, index : number) => ({
				...v,

				color: `#${values.variations[index].color.toHex()}`,
				sizesColor: v.sizesColor.map((s: any) => ({ ...s, price: s.price ? s.price : 0 })),
				image: await uploadImageToCloud(v.image.file.originFileObj
				).then((res) => res.secure_url),
			})))

			const newProduct = { ...values, images: imagesList, thumbnail: thumbnailCloud, variations: variationsProducts, categories: values.categories.map((c: any) => c.value), discountPercent: values.discountPercent ? values.discountPercent / 100 : 0 }
			console.log(newProduct);

			await apiCreateProduct(newProduct);

			setLoading(false)
			clearImages()
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
			<h2>Product form</h2>
			<Spin spinning={loading} tip="Đang xử lý dữ liệu..." size='large'>
				{contextHolder}
				<Form
					form={form}
					name="create-product-form"
					layout="vertical"
					onFinish={onFinish}
				>
					<Row gutter={6}>

						<Col span={7} >
							<Space direction='vertical' style={{ width: '100% ' }}>
								<Thumbnail
									fileListThumbnail={fileListThumbnail}
									setFileList={setFileListThumbnail}
								/>
								<CategorySelect
									categoriesList={categoriesList}
								/>
								<StatusSelect />
							</Space>
						</Col>
						<Col span={17}>
							<Space direction='vertical' style={{ width: '100% ' }} >
								<ProductInfo />
								<ImageProductSelect fileListImages={fileListImages} setFileList={setFileListImages} />
								<Price />
								<DetailImport fileListDetail={fileListDetail} setFileList={setFileListDetail} />
								<Form.Item colon={false}>
									<Button type="primary" htmlType="submit" >
										Submit
									</Button>

								</Form.Item>
							</Space>
						</Col>
					</Row>
				</Form>
			</Spin>
			<Footer style={{ textAlign: 'center' }}>Besty Admin @2023</Footer>
		</div>
	)
}

export default Index
