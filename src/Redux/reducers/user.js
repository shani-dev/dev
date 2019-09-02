/** @format */

import { Alert } from 'react-native'
import {
	FINISH_INTRO,
	FINISH_FETCH_WALLETS,
	PHONE_VERIFY,
	REGISTER_SUCCESS,
	FETCH_USER_SUCCESS,
	REQUEST_VERIFY_PHONE,
	FETCH_RECENT_TRANSACTIONS_SUCCESS,
	PIN_SET_SUCCESS,
	DELETE_WALLET_SUCCESS
} from '@redux/types';

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case FINISH_INTRO:
			return { ...state, isFinishedIntro: true };

		case FINISH_FETCH_WALLETS:
			return { ...state, wallets: action.payload }

		case PHONE_VERIFY:
			if (action.userData) {
				return { ...state, ...action.userData , phoneVerified: true, phone: action.phone, token: action.token }
			} else {
				return { ...state, phoneVerified: true, phone: action.phone, token: action.token }
			}

		case REGISTER_SUCCESS:
			return { ...state, ...action.payload.userData, token: action.payload.token }
			
		case FETCH_USER_SUCCESS:
			var blockchain = {};
			var pinHasSet = false;
			if (typeof action.payload.blockchain) {
				blockchain = action.payload.blockchain[0];

				if (blockchain.walletSecurity !== undefined && blockchain.walletSecurity !== '') {
					pinHasSet = true;
				}
			}
			return { ...state, userData: action.payload.user, blockchain: blockchain, pinHasSet: pinHasSet };

		case REQUEST_VERIFY_PHONE:
			return { ...state, verify_phone_requestid: action.request_id, verify_phone_provider: action.provider }

		case FETCH_RECENT_TRANSACTIONS_SUCCESS:
			return { ...state, history: action.payload }

		case PIN_SET_SUCCESS:
			return { ...state, pinHasSet: true }

		case DELETE_WALLET_SUCCESS:
			return { ...state, wallets: action.payload.wallets }

		default:
			return state;
	}
}