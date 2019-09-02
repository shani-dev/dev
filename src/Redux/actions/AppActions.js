import {
	NEW_INBOX,
	MARK_INBOX_READ,
	NETWORK_STATUS,
	CHANGE_DASHBOARD_BG,
	DELETE_INBOX,
	FETCH_INBOX,
	CHECKED_INBOX
} from '@redux/types';

export const newInbox = (data) => {
	return (dispatch) => dispatch({ type: NEW_INBOX, data: data });
}

export const networkStatus = (status) => {
	return (dispatch) => dispatch({ type: NETWORK_STATUS, status: status });
}

export const markInboxRead = (index) => {
	return (dispatch) => dispatch({ type: MARK_INBOX_READ, index: index })
}

export const changeDashboardBg = (uri) => {
	return (dispatch) => dispatch({ type: CHANGE_DASHBOARD_BG, uri: uri })
}

export const deleteInboxFromList = (index) => {
	return (dispatch) => dispatch({ type:DELETE_INBOX, index:index })
}

export const fetchInboxPayload = () => {
	return (dispatch) => dispatch({ type: FETCH_INBOX });
}

export const toggleCheckedInbox = (index)=>{
	return (dispatch) => dispatch({type:CHECKED_INBOX, index:index})
}