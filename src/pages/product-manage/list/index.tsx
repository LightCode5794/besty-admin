import { apiGetAllProducts } from '@src/apis/product/getListProduct';
import formatterCurrency, { customCurVND } from '@src/util/formatterCurrency';
import { Table, Image, Tag, Space, Spin, InputRef, Button, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import React, { useEffect, useRef, useState } from 'react'
import GroupButtonAction from './components/GroupButtonAction';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';

interface DataType {
    id: number,
    name: string,
    price: React.ReactNode;
    discountPercent: React.ReactNode;
    fixedPrice: React.ReactNode,
    status: React.ReactNode
    key: React.Key;
    thumbnail: string;
    categories: React.ReactNode;
    actions: React.ReactNode
}
type DataIndex = keyof DataType;
const Index: React.FC = () => {

    const [dataSource, setDataSource] = useState<DataType[]>([])
    const [dataProducts, setDataProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const searchInput = useRef<InputRef>(null);


    useEffect(() => {
        const productData = async () => {
            const products = await apiGetAllProducts();
            setDataProducts(products.data);
            setLoading(false);
        }
        productData();
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
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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
    useEffect(() => {
        const mappedData: DataType[] = dataProducts.map((product, index) => {
            return {
                key: index,
                id: product.id,
                name: product.name,
                price: product.price,
                discountPercent: <p>{product.discountPercent * 100}%</p>,
                fixedPrice: formatterCurrency.format(product.fixedPrice),
                status: product.status == 'published' ? <Tag color='success'>{product.status}</Tag> : <Tag color='processing'>{product.status}</Tag>,
                thumbnail: product.thumbnail,
                categories: <Space>{product.categories.map((category, index) => <Tag key={index} color='#108ee9' style={{ padding: 8 }}>{category.name}</Tag>)}</Space>,
                actions: <GroupButtonAction productId={product.id} />
            }
        })
        setDataSource(mappedData);
    }, [dataProducts])
    return (<>
        <Spin spinning={loading} tip="Đang xử lý dữ liệu..." size='large'>
            <Table
                // components={components}
                bordered
                dataSource={dataSource}
            // columns={columns as ColumnTypes}
            // columns={defaultColumns}
            pagination={
                {
                    pageSize: 5,
                }
            }
            >
                <Column title='ID' dataIndex={'id'}  >
                </Column>
                <Column title='Ảnh' dataIndex={'thumbnail'} width={'10%'} render={(thumbnail) => (
                    <Image src={thumbnail} style={{ width: '100%', height: 'auto' }} />
                )}>
                </Column>
                <Column title='Tên' dataIndex={'name'} {...getColumnSearchProps('name')}>
                </Column>
                <Column title='Giá' dataIndex={'price'} render={(price) => (
                    customCurVND(price)
                )} sorter={(a: any, b: any) => a.price - b.price}>
                </Column>
                <Column title='Chiết khấu' dataIndex={'discountPercent'} >
                </Column>
                {/* <Column title='Giá sửa' dataIndex={'fixedPrice'} >
                </Column> */}
                <Column title='Trạng thái' dataIndex={'status'} >
                </Column>
                <Column title='Danh mục' dataIndex={'categories'} >
                </Column>
                <Column title='' dataIndex={'actions'} >
                </Column>
            </Table>
        </Spin>

    </>)
}

export default Index
