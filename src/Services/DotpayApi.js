import { NetInfo } from 'react-native';
import { NETWORK_STATUS } from '@redux/types';
import { Config } from '@common';

const DotPayApi = {
    checkApiUser: function(phoneText, validUser){
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected){
                fetch(Config.api_url + '/check_user', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone: parseFloat(phoneText)
                    })
                })
                .then(response => response.json())
                .then(json => {
                    if (json.success) {
                        validUser = true;
                        
                    }
                    validUser = false;
                })
                .catch((err) => {
                    console.log("=========== error catch ==============")
                    console.log(err)
                    console.log("============================")
                })
            }
            else {
                dispatch({ type: NETWORK_STATUS, status: false });
              }
        })
    }

}

export default DotPayApi;




