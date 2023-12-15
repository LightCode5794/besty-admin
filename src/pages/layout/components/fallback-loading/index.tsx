import React, { FC } from 'react'
import { Spin, Alert } from 'antd'

interface FallbackMessageProps {
	message: string
	description?: string
}

const SuspendFallbackLoading: FC<FallbackMessageProps> = ({ message, description }) => {
	return (
		<Spin tip="Đang tải...">
			<Alert message={message} description={description} type="info" />
		</Spin>
	)
}

export default SuspendFallbackLoading
