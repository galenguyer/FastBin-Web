const url = 'http://localhost/api';

async function submit_raw() {
    var text = document.getElementById("input").innerText;
    var id = get_id_from_hash(await hash_text(text));
    send_data(text, id, "raw", "");
};

async function submit_text(){
    var text = document.getElementById("input").innerText;
    var id = get_id_from_hash(await hash_text(text));
    var key = generate_key(24);
    text = CryptoJS.AES.encrypt(text, key).toString();
    send_data(text, id, "text", key);
}

function send_data(data, id, type, key) {
    const request = new Request(url + "/" + type + "/" + id, {
        method: 'POST',
        body: data,
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });
    
    // pass request object to `fetch()`
    fetch(request)
        .then(res => res.text())
        .then(res => {
            console.log("Returned id:", type+"/"+res)
            window.location = window.location.href.substring(0, window.location.href.indexOf("#")-1)+"/"+type+"#!"+id+"!"+key
        });
}

async function hash_text(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

function get_id_from_hash(hash) {
    return hash.substring(0, 8);
}

function generate_key(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
 }
 