/** @format */

import Constants from './Constants';

export default {
	api_url: 'https://app.dotpay.id/',
	blockchain_ns: 'org.dot.network',

	nexmo: {
		api_key: '35fe648e',
		secret: 'kpb0rJFwAtHNakk3'
	},

	intro: [
		{
			title: '',
			description: 'Pay Anyone by QR Code, WhatsApp or SMS.',
			backgroundColor: '#FFFFFF',
			source: require('@images/intro/intro_1.png'),
			button: 'Next'
		},
		{
			title: '',
			description: 'Funds can be held in your wallet or deposited to your bank account instantly.',
			backgroundColor: '#FFFFFF',
			source: require('@images/intro/intro_2.png'),
			button: 'Next'
		},
		{
			title: '',
			description: 'Bank Account is optional.\nWithdraw cash at any participating outlets.',
			backgroundColor: '#FFFFFF',
			source: require('@images/intro/intro_1.png'),
			button: 'Get Started'
		}
	],


	userData: {
		firstName: 'Gufron',
		lastName: 'Rahmatain',
		mobilePhone: '+6281288145434',
		email: 'irshad.seifaldin@gmail.com',
		walletSecurityType: 'PIN',
		walletSecurity: '111111',
		wallets: [
			{
				id: 'irshad.seifaldin@gmail.com#0',
				balance: 54609000,
				transactions: []
			},
			{
				id: 'irshad.seifaldin@gmail.com#1',
				balance: 432000,
				transactions: []
			},
			{
				id: 'irshad.seifaldin@gmail.com#2',
				balance: 4385000,
				transactions: []
			},
			{
				id: 'irshad.seifaldin@gmail.com#3',
				balance: 645400,
				transactions: []
			},
			{
				id: 'irshad.seifaldin@gmail.com#4',
				balance: 34300,
				transactions: []
			},
			{
				id: 'irshad.seifaldin@gmail.com#5',
				balance: 76500,
				transactions: []
			},
			{
				id: 'irshad.seifaldin@gmail.com#6',
				balance: 6584900,
				transactions: []
			},
			{
				id: 'irshad.seifaldin@gmail.com#7',
				balance: 453944,
				transactions: []
			}
		]
	}
}