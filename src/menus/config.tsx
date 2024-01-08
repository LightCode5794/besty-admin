import { FileTextOutlined, InboxOutlined, DashboardOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';

import React from 'react';
import { MenuProps } from 'antd';


export type MenuItem = Required<MenuProps>['items'][number] & {
	key :string,
	path?: string,
	children?: MenuItem[],
    label?: string,
	icon?: React.ReactNode
	type?: 'group'
  };;

function getItem(
	key: string,
	label: string,
	icon?: React.ReactNode,
	path?: string,
	children?: MenuItem[],
	component?: React.ComponentType<any>,
	type?: 'group'
  ): MenuItem {
	return {
	  key,
	  icon,
	  children,
	  label,
	  path,
	  component,
	  type
	} as MenuItem;
  }


const MENU_ITEMS_CONFIG: MenuItem[] = [
	getItem('1', 'Dashboard',  <DashboardOutlined />, '/dashboard'),
	getItem('2', 'Quản lý danh mục',  <ProfileOutlined />, '', [
		getItem('2-1', 'Danh sách danh mục', <></>, '/category-list'), 
		getItem('2-2', 'Thêm danh mục', <></>, '/category-add' )
	]),
	getItem('3', 'Quản lý đơn hàng',  <FileTextOutlined/>, '', [
		getItem('3-1', 'Danh sách đơn hàng', <></>, '/order-list'), 
		// getItem('3-2', 'Oder Detail', <></>,'/order-detail' )
	]),
	getItem('4', 'Quản lý sản phẩm',  <InboxOutlined/>, '', [
		getItem('4-1', 'Danh sách sản phẩm', <></>, '/product-list'), 
		// getItem('3-2', 'Chi tiết sản phẩm', <></>, '/product-detail' ),
		getItem('4-2', 'Thêm sản phẩm', <></>, '/product-add' )
	]),
	getItem('5', 'Quản lý người dùng',  <UserOutlined />, '', [
		getItem('5-1', 'Danh sách khách hàng', <></>, '/user-list'), 
		// getItem('5-2', 'Oder Detail', <></>,'/order-detail' )
	]),
]

export default MENU_ITEMS_CONFIG;
