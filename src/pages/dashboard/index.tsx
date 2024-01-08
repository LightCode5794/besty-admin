import { Footer } from 'antd/lib/layout/layout'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import './index.less'
import { Col, Row } from 'antd'
import CardNumber from './components/CardNumber'
import ColumnChart from  './chart/columnChart'

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
            <h2>Trong ngày</h2>
			<Row gutter={8}>
                    <Col span={8}>
                        <CardNumber title={'Doanh thu'} number={10000000}/>
                    </Col>
                    <Col span={8}>
                        <CardNumber title={'Số lượng đơn'} number={300}/>
                    </Col>
                    <Col span={8}>
                        <CardNumber title={'Lợi nhuận'} number={10000000}/>
                    </Col>
            </Row>
            <h2>Thống kê tổng</h2>
			<Row gutter={8}>
                    <Col span={8}>
                        <CardNumber title={'Tổng doanh thu'} number={10000000}/>
                    </Col>
                    <Col span={8}>
                        <CardNumber title={'Tổng đơn'} number={300}/>
                    </Col>
                    <Col span={8}>
                        <CardNumber title={'Lợi nhuận'} number={10000000}/>
                    </Col>
            </Row>

            <h2>Biểu đồ doanh số</h2>
			<Row gutter={8}>
              <Col span={24}>
               <ColumnChart/>
              </Col>
            </Row>
			<Footer style={{ textAlign: 'center' }}>Besty Admin @2023</Footer>
		</div>
	)
}

export default Index
