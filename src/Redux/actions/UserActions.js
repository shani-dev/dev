import { requestor } from '@services';
import { Constants, Config } from '@common';
import { Alert } from 'react-native'

import {
	FINISH_INTRO,
	PHONE_VERIFY,
	REGISTER_SUCCESS,
	FETCH_USER_SUCCESS,
	REQUEST_VERIFY_PHONE,
	FINISH_FETCH_WALLETS,
	FETCH_RECENT_TRANSACTIONS_SUCCESS,
	PIN_SET_SUCCESS,
	DELETE_WALLET_SUCCESS
} from '@redux/types';

export const fetchWallets = (token) => {
	const api = fetch(`${Config.api_url}api/wallets?token=${token}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});

	return (dispatch) => requestor(dispatch, api, FINISH_FETCH_WALLETS);
}

export const phoneVerify = (userData, phone, token) => {
	return (dispatch) => dispatch( { type: PHONE_VERIFY, userData: userData, phone: phone, token: token } );
}

/*export const fetchUser = (id) => {
	fetch(Config.api_url + COnfig.blockchain_ns + '.User/' . id, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
}*/

export const finishIntro = () => {
	return (dispatch) => dispatch( { type: FINISH_INTRO } );
}

export const register = (data, callback) => {
	const api = fetch(`${Config.api_url}register_user`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})

	return (dispatch) => requestor(dispatch, api, REGISTER_SUCCESS, {}, callback)
}

export const fetchUser = (token) => {
	const api = fetch(`${Config.api_url}api/user?token=${token}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});

	return (dispatch) => requestor(dispatch, api, FETCH_USER_SUCCESS)
}

export const requestVerifyPhone = (request_id, provider) => {
	return (dispatch) => dispatch({ type: REQUEST_VERIFY_PHONE, request_id: request_id, provider: provider })
}

export const fetchRecentTransactions = (token, wallets) => {
	let params = [];
	wallets.map((item, idx) => {
		params.push('wallets[]=' + encodeURIComponent(item));
	});
	
	const api = fetch(`${Config.api_url}api/user/get_recent_transactions?token=${token}&` + params.join('&'), {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	});

	return (dispatch) => requestor(dispatch, api, FETCH_RECENT_TRANSACTIONS_SUCCESS);
}

export const deleteWallet = (token, wallet_id) => {
	const api = fetch(Config.api_url + 'api/wallets/delete?token=' + token, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			wallet_id: wallet_id
		})
	});

	return (dispatch) => requestor(dispatch, api, DELETE_WALLET_SUCCESS)
}

export const setPin = () => {
	return (dispatch) => dispatch({ type: PIN_SET_SUCCESS })
}