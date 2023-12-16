import { Footer } from 'antd/lib/layout/layout'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import './index.less'
import { Button, Card, Col, Form, Row, Space } from 'antd'
import Thumbnail from './components/Thumbnail'
import CategorySelect from './components/CategorySelect'
import ProductInfo from './components/ProductInfo'
import Price from './components/Price'
import StatusSelect from './components/StatusSelect'
import DetailImport from './components/DetailImport'
import ImageProductSelect from './components/ImageProductSelect'

const Index: React.FC = () => {

	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [categoriesList, setCategoriesList] = useState<Category[]>([]);
	const [selectedStatus, setSlectedStatus] = useState<string>('');
	const [loading, setLoading] = useState(false)
	useEffect(() => {
	   setCategoriesList([{id: 1, name: 'mùa đông'}, {id: 2, name: 'mùa xuân'}])
	}, [])


	
	const onFinish = (values: any) => {
		console.log(values);
	  };

	return (
		<div className="container">
            <h2>Product form</h2>
			<Form 
				name="create-product-form" 
				layout="vertical"
				onFinish={onFinish}
				>
			<Row gutter={6}>
			
			  <Col span={7} >
				<Space direction='vertical' style={{width: '100% '}}>
				<Thumbnail/>
				<CategorySelect 
				categoriesList={categoriesList} 
				// selectedCategories={selectedCategories} 
				// setSelectedCategories={setSelectedCategories}
				/>
				<StatusSelect />
				</Space>
			  </Col>
			  <Col span={17}>
			  <Space direction='vertical' style={{width: '100% '}} >
			  		<ProductInfo/>
					<ImageProductSelect/>
					<Price/>
					<DetailImport/>
					<Form.Item  colon={false}>
      					<Button type="primary" htmlType="submit">
       					 	Submit
      					</Button>
    				</Form.Item>
			  </Space>
			  </Col>
			</Row>
			</Form>
			<Footer style={{ textAlign: 'center' }}>Besty Admin @2023</Footer>
		</div>
	)
}

export default Index
