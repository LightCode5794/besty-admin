import { Card, Flex, CardProps, Statistic } from "antd";


type CardNumberProps =  CardProps & {
    title: string, 
    number: number,

}


const CardNumber = ({title, number} : CardNumberProps) => {
    return (
        <>
            <Card title={title} bordered={false}  hoverable>


            <Statistic
        //   title="Idle"
          value={number}
        //   precision={2}
        //   valueStyle={{ color: '#cf1322' }}
        //   prefix={<ArrowDownOutlined />}
        //   suffix="%"
        />
             
            </Card>
        </>
    )
}
export default CardNumber;