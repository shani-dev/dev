/** @format */

import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import FilesystemStorage from 'redux-persist-filesystem-storage'

import user from './user'
import app_reduce from './app_reduce'

const config = {
	key: 'root',
	storage: FilesystemStorage,
}

export default persistCombineReducers(config, {
	user,
	app_reduce
})