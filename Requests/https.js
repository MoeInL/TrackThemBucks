import axios from 'axios';

const backendURL = 'https://wallet-watch-78fb6-default-rtdb.firebaseio.com'

export function pushToBackend(param1) {
    axios.post(backendURL + '/nodeName.json', param1);
}
