import { apiGetAllProducts } from '@src/apis/product/getListProduct';
import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react'

interface DataType {
    id: number,
    name: string,
    price: React.ReactNode;
    discountPercent: React.ReactNode;
    fixedPrice: React.ReactNode,
    status:React.ReactNode
    key: React.Key;
    category: React.ReactNode;
    color: React.ReactNode;
    size: React.ReactNode;
    sort: React.ReactNode;
    submit: React.ReactNode;
    categories: React.ReactNode;
}
const Index: React.FC = () => {
    
    // const [dataSource, setDataSource] = useState<DataType[]>([
    //     {
    //         key: '0',
    //         category: <BtnGroupSelectMulti content={contentString} />,
    //         price: <SliderPrice />,
    //         color: <BtnGroupSelectMulti content={contentColor} isColorContent />,
    //         size: <BtnGroupSelectMulti content={contentSize} />,
    //         sort: <BtnGroupSelectSingle content={contentSort} />,
    //         submit: <Button type='primary'>Lọc</Button>
    //     },
    // ]);
    const [dataProducts, setDataProducts] = useState<Product[]>([])

    useEffect(() => {
        const productData = async () => {
            const products = await apiGetAllProducts();
            setDataProducts(products.data);
        }
        productData();
    }, [])
	return (<>
        <>
            {dataProducts.map(product => product.name)}
        </>
             {/* <Table
            // components={components}
           
            bordered
            // dataSource={dataSource}
            // columns={columns as ColumnTypes}
            // columns={defaultColumns}
        >
            <Column title='Danh mục'  width={'25%'}> 
            </Column>
            <Column title='Giá' dataIndex={'price'} width={'35%'}>
            </Column>
            <Column title='Màu sắc' dataIndex={'color'} width={'20%'}>
            </Column> 
            <Column title='Kích thước' dataIndex={'size'} width={'15%'}> 
            </Column>
            <Column title='Sắp xếp' dataIndex={'sort'} > 
            </Column> 
            <Column title='' > 
            </Column>
        </Table> */}
        
    </>)
}

export default Index
