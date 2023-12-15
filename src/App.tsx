
import { QueryClient, QueryClientProvider } from 'react-query'
import { ConfigProvider } from 'antd'
import RenderRouter from './router'
import useStore from './stores/user'


const queryClient = new QueryClient()

function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider componentSize="middle">
          <RenderRouter />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
