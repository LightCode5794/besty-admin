import React, { lazy, FC } from 'react'
import WrapperRouteComponent from './config'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '@pages/login'
import LayoutPage from '@pages/layout'

const NotFound = lazy(() => import('@pages/not-found'))
const OrderMangeList = lazy(() => import('@pages/order-manage/list'))
const OrderMangeDetail = lazy(() => import('@pages/order-manage/detail'))
const SupplierList = lazy(() => import('@pages/supplier-manage/list'))
const SupplierDetail = lazy(() => import('@pages/supplier-manage/detail'))
const SupplierAdd = lazy(() => import('@pages/supplier-manage/add'))

const routesList = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />
	},
	{
		path: '/',
		element:<LayoutPage /> ,
		children: [
			{
				path: 'dashboard',
				element: <OrderMangeList />
			},
			{
				path: 'order-list',
				element: <OrderMangeList />
			},
			{
				path: 'order-detail',
				element: <OrderMangeDetail />
			},
			{
				path: 'supplier-list',
				element: <SupplierList />
			},
			{
				path: 'supplier-detail',
				element: <SupplierDetail />
			},
			{
				path: 'supplier-add',
				element: <SupplierAdd />
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
])

// export default routesList;

const RenderRouter: FC = () => {
	const element =  <RouterProvider router={routesList} />
	return element
}

export default RenderRouter
