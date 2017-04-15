import axios from 'axios';

// axios.defaults.headers.post['Content-Type'] = 'application/json';

const getShortcodeStats = shortcode => {
    axios.get(`http://localhost:3000/${shortcode}/stats`)
        .then(response => console.log('response:', response))
        .catch(error => console.log('error:', error))
};

export default getShortcodeStats;
