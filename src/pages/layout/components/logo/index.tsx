import React from 'react'
import AntdSvg from '/antd.svg'
import '../../index.less'

interface Props {
	collapsed: boolean
}

const Index: React.FC<Props> = ({ collapsed }) => {
	return (
		<div className="logo" style={{ width: collapsed ? 80 : 200 }}>
			{/* <img src={AntdSvg} alt="logo" /> */}
			{/* <h1>B</h1> */}
			{collapsed ? <h1>B</h1> : <h1 style={{ paddingLeft: '10px' }}>BESTY</h1>}
		</div>
	)
}

export default Index
