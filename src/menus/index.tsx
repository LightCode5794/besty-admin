import React, { useState, useEffect } from 'react'
import { Menu, MenuItemProps, MenuProps} from 'antd'

import menus, { MenuItem } from './config'
import { useNavigate, useLocation } from 'react-router-dom'
import useStore from '@src/stores/headerTag'
import useUserStore from '@src/stores/user'
//import union from 'lodash/union'

const { SubMenu } = Menu



function findMenuByPath(menus: MenuItem[], path: string, keys: any[]): any {
	for (const menu of menus) {
		if (menu.path === path) {
			return [...keys, menu.key]
		}
		if (menu.children && menu.children.length > 0) {
			const result = findMenuByPath(menu.children, path, [...keys, menu.key])
			if (result.length === 0) {
				continue
			}
			return result
		}
	}
	return []
}

const SideMenu: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [openKeys, setOpenkeys] = useState<string[]>([])
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	//const 'en_US' = useUserStore((state) => state.'en_US')
	const addTag = useStore((state) => state.addTag)

	
	useEffect(() => {
		if (menus[0].children) {
			const { key, path, label } = menus[0].children[0]
			addTag({
				path: path as string,
				label: label,
				id: key,
				closable: false
			})
		}
	}, [])

	// setSelectedKeys
	useEffect(() => {
		const keys: string[] = findMenuByPath(menus, location.pathname, [])
		if (keys) {
			setSelectedKeys([keys.pop() as string])
			//setOpenkeys(union(openKeys, keys))
		}
	}, [pathname])


	function handleMenuClick(menu: MenuItem) {
		if (menu.path === pathname) return
		const { key, path, label } = menu
		addTag({
			path: path as string,
			label: label,
			id: key,
			closable: true
		})
		navigate(menu.path as string)
	}

	
	function handleOpenChange(keys: any) {
		setOpenkeys(keys)
	}

	function renderMenu(menus: MenuItem[]) {
		if (menus.length === 0) {
			return null
		}
		return menus.map((menu) => {
			if (menu.children) {
				return (
					<SubMenu
						key={menu.key}
						title={
							<>
								{menu.icon}
								<span>{menu.label}</span>
							</>
						}
					>
						{renderMenu(menu.children)}
					</SubMenu>
				)
			}
			return (
				<Menu.Item key={menu.key} title={menu.label} onClick={() => handleMenuClick(menu)}>
					{menu.label}
				</Menu.Item>
			)
		})
	}
	
	return (
		<Menu
			mode="inline"
			theme="light"
			openKeys={openKeys}
			selectedKeys={selectedKeys}
			onOpenChange={handleOpenChange as any}
			// items={menus}
			// onClick = {onClick}

		>
			{renderMenu(menus)}
		</Menu>
	)
}

export default SideMenu
