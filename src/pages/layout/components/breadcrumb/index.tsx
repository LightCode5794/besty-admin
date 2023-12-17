import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import menuList, { MenuItem } from '@src/menus/config'
import { useLocation } from 'react-router-dom'
import useUserStore from '@src/stores/user'
import '../../index.less'

interface BreadcrumbItem {
	id?: string 
	key?: string 
	path?: string 
	title?: string
}

const { Item } = Breadcrumb
let breadcrumbList: BreadcrumbItem[] = []
let end = false

const Index: React.FC = () => {
	const { pathname } = useLocation()
	//const locale = useUserStore((state) => state.locale)
	const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([])
	// pathname
	const getBreadcrumbByPathName = (menuList: MenuItem[], pathname: string, breadcrumbs: BreadcrumbItem[] = []) => {
		for (const menu of menuList) {
			const list: BreadcrumbItem[] = []
			if (!end) {
				list.push({
					key: menu.key,
					//path: menu.path,
					title: menu.label
				})
				if (menu.path == pathname) {
					breadcrumbList = breadcrumbs.concat(list)
					end = true
					break
				} else if (menu.children) {
					getBreadcrumbByPathName(menu.children, pathname, breadcrumbs.concat(list))
				}
			}
		}
	}

	useEffect(() => {
		end = false
		if (pathname === '/') getBreadcrumbByPathName(menuList, '/dashboard')
		else {
			getBreadcrumbByPathName(menuList, pathname)
			setBreadcrumbItems(breadcrumbList);
		}
	}, [pathname])

	return (
		<Breadcrumb items={breadcrumbItems} />
		// 	{breadcrumbList.map((e) => {
		// 		return <Item key={e.key}>{e.title}</Item>
		// 	})}
		// </Breadcrumb>
	)
}

export default Index
