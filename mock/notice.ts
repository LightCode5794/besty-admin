import { MockMethod } from 'vite-plugin-mock'

export enum EventStatus {
	todo = 'rgba(255,255,255,0.65)',
	urgent = 'red',
	doing = 'orange',
	processing = 'purple'
}

interface Base {
	type: 'message' | 'notification' | 'event'
	id: string
	title: string
}

export interface Notification extends Base {
	type: 'notification'
	read?: boolean
	avatar: string
	datetime: string
}

export interface Message extends Base {
	type: 'message'
	read?: boolean
	avatar: string
	datetime: string
	description: string
	clickClose: boolean
}

export interface Event extends Base {
	type: 'event'
	description: string
	extra: string
	status: keyof typeof EventStatus
}

type Notices = Notification | Message | Event
export type Notice<T extends Notices['type'] | 'all' = 'all'> = T extends 'all'
	? Notices
	: Extract<Notices, { type: T }>

const noticeList = [
	{
		id: '000000001',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
		title: 'You have received 14 new weekly reports',
		datetime: '2023-08-09',
		type: 'notification'
	},
	{
		id: '000000002',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
		title: 'Qu Nini, whom you recommended, has passed the third-round interview',
		datetime: '2023-08-08',
		type: 'notification'
	},
	{
		id: '000000003',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
		title: 'This template can distinguish between multiple notification types',
		datetime: '2023-08-07',
		read: true,
		type: 'notification'
	},
	{
		id: '000000004',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
		title: 'The left icon is used to differentiate different types',
		datetime: '2023-08-07',
		type: 'notification'
	},
	{
		id: '000000005',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
		title: 'The content should not exceed two lines, and it will be automatically truncated if exceeded',
		datetime: '2023-08-07',
		type: 'notification'
	},
	{
		id: '000000006',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
		title: 'Qu Lili commented on your',
		description: 'Description information description information description information',
		datetime: '2023-08-07',
		type: 'message',
		clickClose: true
	},
	{
		id: '000000007',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
		title: 'Zhu Pianyou replied to you',
		description: 'This template is used to remind who has interacted with you, with the avatar of "who" on the left',
		datetime: '2023-08-07',
		type: 'message',
		clickClose: true
	},
	{
		id: '000000008',
		avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
		title: 'Title',
		description: 'This template is used to remind who has interacted with you, with the avatar of "who" on the left',
		datetime: '2023-08-07',
		type: 'message',
		clickClose: true
	},
	{
		id: '000000009',
		title: 'Task Name',
		description: 'The task needs to be started before 20:00 on 2023-01-12',
		extra: 'Not started',
		status: 'todo',
		type: 'event'
	},
	{
		id: '000000010',
		title: 'Third-party urgent code change',
		description: 'Submittedon 2023-01-06 by Guanlin, the code change task needs to be completed before 2023-01-07',
		extra: 'Approaching deadline',
		status: 'urgent',
		type: 'event'
	},
	{
		id: '000000011',
		title: 'Information security exam',
		description: 'Assigned to Zheru to complete the update and release before 2023-01-09',
		extra: 'Elapsed time: 8 days',
		status: 'doing',
		type: 'event'
	},
	{
		id: '000000012',
		title: 'ABCD version release',
		description: 'Submitted on 2023-01-06 by Guanlin, the code change task needs to be completed before 2023-01-07',
		extra: 'In progress',
		status: 'processing',
		type: 'event'
	}
]
export default [
	{
		url: '/api/notice',
		method: 'get',
		timeout: 1000,
		response: {
			code: 200,
			data: noticeList
		}
	}
] as unknown as MockMethod[]