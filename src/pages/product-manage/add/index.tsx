import { Footer } from 'antd/lib/layout/layout'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import './index.less'
import { Button, Card, Col, Form, Row, Space } from 'antd'
import Thumbnail from './components/Thumbnail'
import CategorySelect from './components/CategorySelect'
import ProductInfo from './components/ProductInfo'

const Index: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [fistChartLeftData, setfistChartLeftData] = useState([])
	const [fistChartRightData, setfistChartRightData] = useState([])

	const getChartData = async () => {
		setLoading(true)
		const res = await axios.get('/api/dashboard')
		setLoading(false)
		setfistChartLeftData(res.data.data.firstChartLeftData)
	}

	useEffect(() => {
		getChartData()
	}, [])

	return (
		<div className="container">
            <h2>Product form</h2>
			<Form 
				name="create-product-form" 
				layout="vertical"
				>
			<Row gutter={6}>
			
			  <Col span={7} >
				<Space direction='vertical' style={{width: '100% '}}>
				<Thumbnail/>
				<CategorySelect/>
				</Space>
			  </Col>
			  <Col span={17}>
			  <Space direction='vertical' style={{width: '100% '}} >
				

			  		<ProductInfo/>
					<Form.Item label=" " colon={false}>
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
