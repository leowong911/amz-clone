import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-5ec49.cloudfunctions.net/api' // cloud function API URL.
});

export default instance;