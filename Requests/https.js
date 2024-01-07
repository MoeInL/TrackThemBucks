import axios from 'axios';

const backendURL = 'https://wallet-watch-78fb6-default-rtdb.firebaseio.com'

export async function pushToBackend(param) {
    const response = await axios.post(backendURL + '/nodeName.json', param);
    return response.data.name;
}

export async function pullFromBackend() {
    const response = await axios.get(backendURL + '/nodeName.json');
    return response.data;
}

export async function updateBackend(id, param) {
    await axios.put(backendURL + '/nodeName/' + id + '.json', param);
}
