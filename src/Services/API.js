import { NetInfo } from 'react-native';
import { Alert } from 'react-native';
import { NETWORK_STATUS } from '@redux/types';

export const requestor = (dispatch, api, type, extra = {}, callback) => {
  /*NetInfo.getConnectionInfo().then((conenctionInfo) => {
    console.log('NetInfo', conenctionInfo);
  })*/

  NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected) {
      api.then(response => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch({ type: NETWORK_STATUS, status: false });
        }
      })
      .then((data) => {
        dispatch({ type: NETWORK_STATUS, status: true });

        if (data.success !== undefined) {
          if (data.success) {
            dispatch({type: type, payload: data, extra } );
          }
        } else {
          dispatch({type: type, payload: data, extra } );
        }

        if (callback) {
          callback(data);
        }
      });
    } else {
      dispatch({ type: NETWORK_STATUS, status: false });
    }
  });
}
