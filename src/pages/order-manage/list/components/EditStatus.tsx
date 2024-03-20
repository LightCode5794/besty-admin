import { Dropdown, Flex, MenuProps, Modal, Select, SelectProps, Tag, message } from "antd";
import { useState } from "react";
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { apiUpdateStatusOrder } from "@src/apis/order/updateStatus";
interface EditStatusProps {
    status?: string;
    orderId?: any;
    refreshCategoryList: () => void;
}


const options: SelectProps['options'] = [
    {
        value: 'completed', label: (
            <Tag color='success'>completed</Tag>
        )
    },
    {
        value: 'pending', label: (
            <Tag color='processing'>pending</Tag>
        )
    },
    { value: 'canceled', label: (<Tag color='red'>canceled</Tag>) },

];

const EditStatus: React.FC<EditStatusProps> = ({ orderId, status, refreshCategoryList }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    const errorNotice = () => {
        messageApi.open({
            type: 'error',
            content: 'Đã có lỗi xảy ra',
        });
    };
    const successNotice = () => {
        messageApi.open({
            type: 'success',
            content: 'Chỉnh sửa trạng thái đơn hàng thành công!',
        });
    };


    const handleChange = async (item: any) => {
        try {
            
          
            await apiUpdateStatusOrder(orderId, item.value);
            successNotice()
            setOpen(false)
            refreshCategoryList();
        }
        catch (err) {

            errorNotice()
        }
            
     }

    return (<>
    {contextHolder}
        <Modal
            open={open}
            title="Chỉnh sửa trạng thái đơn hàng"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            width={300}
        >
            {/* <Dropdown menu={{ items }} trigger={['click']}> hahahaha</Dropdown> */}
            <Select
                labelInValue
                defaultValue={options.filter(o => o.value == status)}
                style={{ width: '100%' }}
                onChange={handleChange}
                options={options}
            />

        </Modal>
        <EditOutlined onClick={showModal} />
    </>)
}

export default EditStatus;