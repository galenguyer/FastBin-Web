const url = 'http://localhost/api';

function get_id(){
    if (window.location.hash.indexOf('!',2) != -1)
        return window.location.hash.substring(window.location.hash.indexOf('!')+1, window.location.hash.indexOf('!',2));
    else
        return window.location.hash.substring(window.location.hash.indexOf('!')+1);   
}

function get_key(){
    return window.location.hash.substring(window.location.hash.indexOf('!',2)+1);   
}

function fetch_data(id, key){
    const request = new Request(url + "/text/" + id, {
        method: 'GET'
    });
    
    // pass request object to `fetch()`
    fetch(request)
        .then(res => res.text())
        .then(res => {
            var decrypted = CryptoJS.AES.decrypt(res, key).toString(CryptoJS.enc.Utf8);
            document.getElementById('input').innerText = decrypted;
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetch_data(get_id(), get_key());
});
