import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import {  createStyleImportPlugin, AntdResolve} from 'vite-plugin-style-import'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
		alias: {
			'@src': resolve(__dirname, './src'),
			'@assets': resolve(__dirname, './src/assets'),
			'@components': resolve(__dirname, './src/components'),
			'@pages': resolve(__dirname, './src/pages'),
			'@uitl': resolve(__dirname, './src/uitl'),
			'@apis': resolve(__dirname, './src/apis'),
			'@mock': resolve(__dirname, './mock')
		}
	},
  plugins: [
    react(),
    reactRefresh(),
	// mock
	viteMockServe({
		mockPath: 'mock',
		localEnabled: true
	}),
    // antd 
	createStyleImportPlugin({
		resolves: [
          AntdResolve()
		],
		libs: [
			{
				libraryName: 'antd',
				//esModule: true,
				resolveStyle: (name) => `antd/es/${name}/style`
			}
		]
		})
		
  ],
//   envDir: '.env'
})


