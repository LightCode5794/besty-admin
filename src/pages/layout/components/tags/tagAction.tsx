import React, { FC } from 'react'
import { Menu, Dropdown } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import useStore from '@src/stores/headerTag'

const Index: FC = () => {
	const [activeTagId, removeTag, removeOtherTag, removeAllTag] = useStore((state) => [
		state.activeTagId,
		state.removeTag,
		state.removeOtherTag,
		state.removeAllTag
	])

	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key="0" onClick={() => removeTag(activeTagId)}>
						"layout.tagAction.closeCurrent" 
					</Menu.Item>
					<Menu.Item key="1" onClick={() => removeOtherTag()}>
						 "layout.tagAction.closeOther" 
					</Menu.Item>
					<Menu.Item key="2" onClick={() => removeAllTag()}>
						 "layout.tagAction.closeAll" 
					</Menu.Item>
					<Menu.Divider />
				</Menu>
			}
		>
			<span id="pageTabs-actions">
				<SettingOutlined className="tags-extra" />
			</span>
		</Dropdown>
	)
}

export default Index
