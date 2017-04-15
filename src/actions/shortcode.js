import axios from 'axios';

// Our proxy server -- mimics all the routes exactly so that it can be substituted w/ a CORS-supporting server.
axios.defaults.baseURL = 'http://localhost:3000';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getShortcodeStats = shortcode => {
    axios.get(`/${shortcode}/stats`)
        .then(response => console.log('response:', response))
        .catch(error => console.log('error:', error))
};

export const shortenLink = url => {
    axios({
        method: 'post',
        url: `/shorten`,
        data: { url }
    })
        .then(response => console.log('response:', response))
        .catch(error => console.log('error:', error))
};
