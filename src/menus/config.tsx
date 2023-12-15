import { FileTextOutlined, InboxOutlined } from '@ant-design/icons';

import React from 'react';
import { MenuProps } from 'antd';


export type MenuItem = Required<MenuProps>['items'][number] & {
	key :string,
	path?: string,
	children?: MenuItem[],
    label?: string,
	icon?: React.ReactNode
  };;

function getItem(
	key: string,
	label: string,
	icon?: React.ReactNode,
	path?: string,
	children?: MenuItem[],
	component?: React.ComponentType<any>
  ): MenuItem {
	return {
	  key,
	  icon,
	  children,
	  label,
	  path,
	  component,
	} as MenuItem;
  }


const MENU_ITEMS_CONFIG: MenuItem[] = [
	getItem('1', 'Dashboard',  <FileTextOutlined/>, '/dashboard'),
	getItem('2', 'Oder Management',  <FileTextOutlined/>, '', [
		getItem('2-1', 'Oders List', <></>, '/order-list'), 
		getItem('2-2', 'Oder Detail', <></>,'/order-detail' )
	]),
	getItem('3', 'Product Management',  <InboxOutlined/>, '', [
		getItem('3-1', 'Oders List', <></>, '/product-add'), 
		getItem('3-2', 'Oder Detail', <></>, '/product-detail' )
	]),
]

// const MENU_CONFIG: MenuItem[] = [
// 	{
// 		key: '1',
// 		icon: <FileTextOutlined/>,
		
// 		children: [
// 			{
// 				key: '1-1',
				
// 				path: '/order-list'
// 			},
// 			{
// 				key: '1-2',
// 				label: {
// 					zh_CN: '二级菜单',
// 					en_US: 'second level menu'
// 				},
// 				children: [
// 					{
// 						key: '1-2-1',
						
// 						path: '/order-detail'
// 					}
// 				]
// 			}
// 		]
// 	},
// 	{
// 		key: '2',
// 		icon:  InboxOutlined,
// 		label: {
// 			zh_CN: '供应商管理',
// 			en_US: 'supplier management'
// 		},
// 		children: [
// 			{
// 				key: '2-1',
				
// 				path: '/supplier-list'
// 			},
// 			{
// 				key: '2-2',
// 				label: {
// 					zh_CN: '供应商二级',
// 					en_US: 'supplier second level menu'
// 				},
// 				children: [
// 					{
// 						key: '2-2-1',
						
// 						path: '/supplier-detail'
// 					},
// 					{
// 						key: '2-2-2',
						
// 						path: '/supplier-add'
// 					}
// 				]
// 			}
// 		]
// 	}
// ]

export default MENU_ITEMS_CONFIG;
