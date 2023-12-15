import React from 'react'
import { BrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
 import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'

import RenderRouter from './router'
import useStore from './stores/user'
import routesList from './router'

export type Locale = 'zh_CN' | 'en_US'

const queryClient = new QueryClient()

function App() {
  //const locale = useStore((state) => state.locale)

  const getAntdLocale = () => {
    // if (locale === 'en_US') {
    //   return enUS
    // } else if (locale === 'zh_CN') {
    //   return zhCN
    // }
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ConfigProvider locale={getAntdLocale()} componentSize="middle"> */}
      <ConfigProvider componentSize="middle">
        {/* <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}> */}
        
        {/* <BrowserRouter> */}
       
          <RenderRouter />
        {/* </BrowserRouter> */}
      
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
