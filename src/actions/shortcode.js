import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // Our proxy server.
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getShortcodeStats = shortcode => {
    axios.get(`/${shortcode}/stats`)
        .then(response => console.log('response:', response))
        .catch(error => console.log('error:', error))
};

export const shortenLink = (url, shortcode='example1') => {
    axios({
        method: 'post',
        url: `/shorten`,
        data: {
            url
            // ,
            // shortcode
        }
    })
        .then(response => console.log('response:', response))
        .catch(error => console.log('error:', error))
};
