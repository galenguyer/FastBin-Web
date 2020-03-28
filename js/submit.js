const url = 'http://localhost/api';

async function submit_raw() {
    var text = document.getElementById("input").innerText.trim();
    var id = get_id_from_hash(await hash_text(text));
    send_data(text, id, "raw", "");
};

async function submit_text(){
    var text = document.getElementById("input").innerText.trim();
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

function generate_key(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
 }
 