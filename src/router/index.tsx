import React, { lazy, FC } from 'react'
import WrapperRouteComponent from './config'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '@pages/login'
import LayoutPage from '@pages/layout'

const NotFound = lazy(() => import('@pages/not-found'))
const Dashboard = lazy(() => import('@pages/dashboard'))
const OrderMangeList = lazy(() => import('@pages/order-manage/list'))
const OrderMangeDetail = lazy(() => import('@pages/order-manage/detail'))
const SupplierList = lazy(() => import('@pages/supplier-manage/list'))
const SupplierDetail = lazy(() => import('@pages/supplier-manage/detail'))
const SupplierAdd = lazy(() => import('@pages/supplier-manage/add'))
const ProductAdd = lazy(() => import('@pages/product-manage/add'))
const ProductList = lazy(() => import('@pages/product-manage/list'))

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
				element: <Dashboard/>
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
				path: 'product-list',
				element: <ProductList/>
			},
			{
				path: 'product-detail',
				element: <SupplierDetail />
			},
			{
				path: 'product-add',
				element: <ProductAdd/>
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
