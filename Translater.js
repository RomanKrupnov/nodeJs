const axios = require('axios');
const IAM_TOKEN = 't1.9euelZqdl5iJm8iXnJCWzsjLz5GTnu3rnpWaypKJkcePjseLz4vGyp6ZjI_l8_dXQU8C-u93aV4c_t3z9xdwTAL673dpXhz-.66vH9SnxBtb2Y4eIMXS7QKyTDxEc_hMWqRawBAmLc_1lfVKrSxFHorOKFX5pa61OLaQXOT294lcLXEqi0bp0CA';
const FOLDER = 'b1gi4vbpjgel68saqvee';
module.exports = function Translater(request){
    return axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
        "folder_id": FOLDER,
        ...request
    }, {
        headers: {
            'Content-Type': 'aaplication/json',
            'Authorization': 'Bearer ' + IAM_TOKEN
        }
    })

}