import { Table, Space, Spin, InputRef, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import React, { useEffect, useRef, useState } from 'react'
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { apiGetAllCategories } from '@src/apis/category/getAllCategory';
import GroupButtonAction from './components/GroupButtonAction';


type DataMap = {
    key: React.Key
    id: number, 
    name: string
    
}
type DataIndex = keyof DataMap;
const Index: React.FC = () => {

    const [dataSource, setDataSource] = useState<DataMap[]>([])
    const [loading, setLoading] = useState(true)
    const searchInput = useRef<InputRef>(null);

    const getCategoryData = async () => {
        const data  = await apiGetAllCategories();
        const categoryData : Category[] = data.data
        if (categoryData) {
            const dataMap : DataMap[] = categoryData.map((c, index) => ({
                ...c,
                key: index
            }))
            setDataSource(dataMap);

        }
        setLoading(false);
    }

    useEffect(() => {
        getCategoryData();
    }, [])

    const handleSearch = (

        confirm: (param?: FilterConfirmProps) => void,

    ) => {
        confirm();

    };
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataMap> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
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
                        pageSize: 10,
                    }
                }
            >
                <Column title='ID' dataIndex={'id'} />
                <Column title='Tên danh mục' dataIndex={'name'} {...getColumnSearchProps('name')} />
                <Column title='' dataIndex={'action'} render={(value: any, record: any) => (
                    <GroupButtonAction category={record} />
                )} />

            </Table>
        </Spin>

    </>)
}

export default Index
