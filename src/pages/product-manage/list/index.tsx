import { apiGetAllProducts } from '@src/apis/product/getListProduct';
import formatterCurrency from '@src/util/formatterCurrency';
import { Table, Image, Tag, Space } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react'
import GroupButtonAction from './components/GroupButtonAction';

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
const Index: React.FC = () => {

    const [dataSource, setDataSource] = useState<DataType[]>([])
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
    useEffect(() => {
        const mappedData: DataType[] = dataProducts.map((product, index) => {
            return {
                key: index,
                id: product.id,
                name: product.name,
                price: formatterCurrency.format(product.price),
                discountPercent: <p>{product.discountPercent * 100}%</p>,
                fixedPrice: formatterCurrency.format(product.fixedPrice),
                status: product.status == 'publish' ? <Tag color='success'>{product.status}</Tag> : <Tag color='processing'>{product.status}</Tag>,
                thumbnail: product.thumbnail,
                categories: <Space>{product.categories.map((category, index) => <Tag key={index} color='#108ee9' style={{ padding: 8 }}>{category.name}</Tag>)}</Space>,
                actions:<GroupButtonAction productId={product.id}/>
            }
        })
        setDataSource(mappedData);
    }, [dataProducts])
    return (<>

        <Table
            // components={components}
            bordered
            dataSource={dataSource}
        // columns={columns as ColumnTypes}
        // columns={defaultColumns}
        >
            <Column title='ID' dataIndex={'id'}  >
            </Column>
            <Column title='Ảnh' dataIndex={'thumbnail'} width={'10%'} render={(thumbnail) => (
                <Image src={thumbnail} style={{ width: '100%', height: 'auto' }} />
            )}>
            </Column>
            <Column title='Tên' dataIndex={'name'} >
            </Column>
            <Column title='Giá' dataIndex={'price'} >
            </Column>
            <Column title='Chiết khấu' dataIndex={'discountPercent'}>
            </Column>
            <Column title='Giá sửa' dataIndex={'fixedPrice'} >
            </Column>
            <Column title='Trạng thái' dataIndex={'status'} >
            </Column>
            <Column title='Danh mục' dataIndex={'categories'} >
            </Column>
            <Column title='Edit' dataIndex={'actions'} >
            </Column>
        </Table>

    </>)
}

export default Index
