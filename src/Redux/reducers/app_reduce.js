import {
	NEW_INBOX,
	MARK_INBOX_READ,
	NETWORK_STATUS,
	CHANGE_DASHBOARD_BG,
	DELETE_INBOX,
	FETCH_INBOX,
	CHECKED_INBOX
} from '@redux/types';



const initialState = {
	inbox: [],
	network_status: true
}

export default (state = initialState, action) => {
	switch (action.type) {
		case NEW_INBOX:
			var inbox = state.inbox;

			inbox.push(action.data);

			return {
				...state,
				inbox: inbox
			}
		case MARK_INBOX_READ:
			var inbox = state.inbox;

			inbox[action.index].read = 1;

			return {
				...state,
				inbox: inbox
			}
		case NETWORK_STATUS:
			return { ...state, network_status: action.status };

		case CHANGE_DASHBOARD_BG:
			return { ...state, dashboard_background: action.uri }

		case DELETE_INBOX:
			var inbox = state.inbox;
			inbox.splice(action.index,1);
			return { ...state, inbox:inbox }
		case FETCH_INBOX:
			var inbox = state.inbox;
			inbox.forEach(dataInbox => {
				dataInbox.checked = false
			})
			return {
				...state,
				inbox: inbox
			}
		case CHECKED_INBOX:
			var inbox = state.inbox;
			
			if(inbox[action.index].checked === true){
				inbox[action.index].checked = false;
			}else{
				inbox[action.index].checked = true;
			}

			return {
				...state,
				inbox: inbox
			}
		default:
			return state;
	}
}