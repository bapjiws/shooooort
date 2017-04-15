import axios from 'axios';

// axios.defaults.headers.post['Content-Type'] = 'application/json';

// var instance = axios.create({
//     headers: {'Content-Type': 'application/json'}
// });

const getShortcodeStats = shortcode => {
    // TODO: this is how it will be:
    // return axios.get(`https://gymia-shorty.herokuapp.com/${shortcode}/stats`)

    // console.log('trying:', shortcode);
    // axios.get(`https://gymia-shorty.herokuapp.com/${shortcode}/stats`)
    //     .then(response => console.log('response:', response))
    //     .catch(error => console.log('error:', error))
    //
    axios.get(`http://localhost:3000`) // /${shortcode}/stats
        .then(response => console.log('response:', response))
        .catch(error => console.log('error:', error))

    // axios({
    //     method: 'get',
    //     url: `https://gymia-shorty.herokuapp.com/${shortcode}/stats`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         // 'Access-Control-Allow-Origin': 'https://gymia-shorty.herokuapp.com'
    //     }
    // })
    //     .then(response => console.log('response:', response))
    //     .catch(error => console.log('error:', error))
};

export default getShortcodeStats;
