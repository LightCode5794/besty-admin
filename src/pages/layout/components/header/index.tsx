import React, { FC } from 'react'
import { LogoutOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Dropdown, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import genji from '@assets/logo/husky.png'
import language from '@assets/header/language.svg'
import useStore from '@src/stores/user'
import HeaderNoticeComponent from '../notice'
import Breadcrumb from '../breadcrumb'
import '../../index.less'

const { Header } = Layout

interface HeaderProps {
	collapsed: boolean
	toggle: () => void
}

const Index: FC<HeaderProps> = ({ collapsed, toggle }) => {
	const navigate = useNavigate()
	
	const logged =  true// useStore((state) => state.logged)
	const logout = false // useStore((state) => state.logout)

	
	const toLogin = () => {
		navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })
	}

	const menuChange = async ({ key }: { key: string }) => {
		switch (key) {
			case '1':
				navigate('/dashboard', { replace: true })
				break
			case '2': {
				const res = await axios.post('/api/logout')
				if (res.status == 200) {
					//logout()
				}
				break
			}
			default:
				break
		}
	}


	const menu = (
		<Menu onClick={menuChange}>
			<Menu.Item key="1">
				<span>
					<UserOutlined />
					<span>{ 'layout.heaer.usersetting' }</span>
				</span>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="2">
				<span>
					<LogoutOutlined />
					<span>{ 'layout.heaer.logout' }</span>
				</span>
			</Menu.Item>
		</Menu>
	)
	return (
		<Header className="layout-page-header">
			<div className="layout-page-header-main">
				<div className="breadcrumb">
					<div onClick={toggle} style={{ marginRight: '20px' }}>
						<span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
					</div>
					<Breadcrumb />
				</div>
				<div className="actions">
					<HeaderNoticeComponent />

					{logged ? (
						<Dropdown overlay={menu} trigger={['click']}>
							<span className="user-action">
								<img src={genji} className="user-avator" alt="avator" />
							</span>
						</Dropdown>
					) : (
						<span style={{ cursor: 'pointer' }} onClick={toLogin}>
							{  'login.submit' }
						</span>
					)}
				</div>
			</div>
		</Header>
	)
}

export default Index
