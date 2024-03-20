import { Footer } from 'antd/lib/layout/layout'
import React, { useState, useEffect, useRef } from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './index.less'
import { apiGetAllOrders } from '@src/apis/order/getAll'
import { Button, Input, InputRef, Space, Spin, Table, Tag } from 'antd'
import Column from 'antd/es/table/Column'
import { customCurVND } from '@src/util/formatterCurrency'
import ActionButtonGroup from './components/ActionButtonGroup'
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface'
import EditStatus from './components/EditStatus';



type product = {
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
type paymentMethod = {
	id: number,
	name: string,
}
interface order {
	key: number,
	id: number,
	fullName: string,
	totalAmount: number,
	status: string,
	createdDate: Date
	paymentMethod: paymentMethod
}

type DataIndex = keyof order;
const Index: React.FC = () => {
	const [dataSource, setDataSource] = useState<order[]>([])
	const [loading, setLoading] = useState(true)
	const searchInput = useRef<InputRef>(null);

	const getDataSource = async () => {
		const data = await apiGetAllOrders();

		if (data) {

			const orders: order[] = data.data.map((order: any, index: number) => ({ ...order, key: index }));
			setDataSource(orders);
			setLoading(false);
		}
	}
	useEffect(() => {
		getDataSource();
	}, [])

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex,
	) => {
		confirm();

	};
	const handleReset = (clearFilters: () => void) => {
		clearFilters();
	};
	const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<order> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
		),
		onFilter: (value, record: any) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) => (text as string)
	});

	return (

		<div className="container">
			<Spin spinning={loading} tip="Đang xử lý dữ liệu..." size='large'>
				{/* <FirstChart fistChartLeftData={fistChartLeftData} />
			<SecondChart />
			<ThirdChart /> */}
				{/* <Footer style={{ textAlign: 'center' }}>React Vite Admin ©2021 Created by xieyezi</Footer> */}

				<Table

					bordered
					dataSource={dataSource}
					pagination={{
						pageSize: 5
					}}
				// columns={columns as ColumnTypes}
				// columns={defaultColumns}
				>
					<Column title='Id đơn hàng' dataIndex={'id'}  >
					</Column>
					<Column title='Khách hàng' dataIndex={'fullName'} render={(info: string) => {
						return <>
							<p>{info}</p>

						</>
					}} {...getColumnSearchProps('fullName')}>
					</Column>
					<Column title='Giá trị đơn' dataIndex={'totalAmount'} render={(totalAmount) => (
						customCurVND(totalAmount)
					)} sorter={(a: any, b: any) => a.totalAmount - b.totalAmount}>

					</Column>
					<Column title='Ngày tạo' dataIndex={'createdDate'} render={(date) => (
						date
					)} sorter={(a: any, b: any) => {
						const dateA = new Date(a.createdDate);
						const dateB = new Date(b.createdDate);
						return dateA.getTime() - dateB.getTime();
					}}>

					</Column>
					<Column title='Phương thức thanh toán' dataIndex={'paymentMethod'}
						render={(pm: paymentMethod) => pm.name}
						filters={[
							{
								text: 'VNPAY',
								value: 'VNPAY',
							},
							{
								text: 'COD',
								value: 'COD',
							},

						]}
						onFilter={(value: any, record: any) => record.paymentMethod.name.indexOf(value) === 0}
					>
					</Column>

					<Column title='Tình trạng' dataIndex={'status'}

						render={(status: string, record: any, index: any) => {
							let color = status == 'pending' ? 'geekblue' : 'green'
							if (status == 'canceled') {
								color = 'volcano'
							}
						
							return <>
								<Space>
									<Tag color={color} key={index}>
										{status}
									</Tag>
									<EditStatus status={status} orderId={record.id} refreshCategoryList={getDataSource}/>
								</Space>

							</>
						}}
						filters={[
							{
								text: 'COMPLETED',
								value: 'completed',
							},
							{
								text: 'PENDING',
								value: 'pending',
							},
							{
								text: 'CANCELED',
								value: 'canceled',
							},

						]}
						onFilter={(value: any, record: any) => record.status.indexOf(value) === 0}
					>
					</Column>
					<Column title='' dataIndex={'action'} render={(value: any, record: any) => (
						<ActionButtonGroup orderId={record.id} />
					)}>
					</Column>
				</Table>
			</Spin>
		</div>
	)
}

export default Index
