import React from 'react'
import AntdSvg from '/antd.svg'
import '../../index.less'
import { Flex } from 'antd'

interface Props {
	collapsed: boolean
}

const Index: React.FC<Props> = ({ collapsed }) => {
	return (
		<div className="logo" style={{ width: collapsed ? 80 : '100%' }}>
			{/* <img src={AntdSvg} alt="logo" /> */}
			{/* <h1>B</h1> */}
			{collapsed ? <Flex justify='center'><h1>B</h1></Flex>
				:
				<Flex justify='center'>
					<h1 style={{ paddingLeft: '10px' }}>BESTY</h1>
				</Flex>}
		</div>
	)
}

export default Index
