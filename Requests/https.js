import axios from 'axios';

const backendURL = 'https://wallet-watch-78fb6-default-rtdb.firebaseio.com'

export function pushToBackend(param1) {
    axios.post(backendURL + '/nodeName.json', param1);
}

export async function pullFromBackend() {
    const response = await axios.get(backendURL + '/nodeName.json');
    return response.data;
}
