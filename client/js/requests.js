function getRequest(method, url, body, collback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        if (xhr.status === 200) {
            let response = xhr.response;
            collback(response);
        } else {
            console.error('Ошибка: ', xhr.status);
            collback(null);
        }
    }
    xhr.send(body);
}

    
