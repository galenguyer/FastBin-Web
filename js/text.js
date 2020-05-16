const url = '/api';

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
            if(decrypted != "")
                document.getElementById('input').innerText = decrypted;
            else 
                document.getElementById('input').innerText= res;

            // Verify data
            hash_text(document.getElementById('input').innerText).then(hash => {
                var checksum = get_id_from_hash(hash);
                if(checksum===id){
                    document.getElementById('verification').innerText = "Verification Passed!"
                }
                else{
                    document.getElementById('verification').innerText = "Verification failed"                    
                }
            });
        })
        .catch(err => {
            document.getElementById('input').innerText = "Uh oh. It looks like we couldn't decrypt that snippet for you. Check that your URL contains the full id and key";
            document.getElementById('verification').innerText = "Verification failed"                    
        });;
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetch_data(get_id(), get_key());
});
