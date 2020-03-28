const url = 'http://localhost/api';

function get_id(){
    if (window.location.hash.indexOf('!',2) != -1)
        return window.location.hash.substring(window.location.hash.indexOf('!')+1, window.location.hash.indexOf('!',2));
    else
        return window.location.hash.substring(window.location.hash.indexOf('!')+1);   
}

function fetch_data(id){
    const request = new Request(url + "/raw/" + id, {
        method: 'GET'
    });
    
    // pass request object to `fetch()`
    fetch(request)
        .then(res => res.text())
        .then(res => {
            document.getElementById('input').innerText = res;
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetch_data(get_id());
});
