import axios from 'axios'


export default axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    headers: {
        Accept: 'application/json',
        'user-key': 'b08612873e78504efa4a75b0793cd2f8'
    }
})