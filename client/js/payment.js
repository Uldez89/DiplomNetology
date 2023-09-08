window.addEventListener('DOMContentLoaded', () => {
    const seance = JSON.parse(localStorage.getItem('seance'));
    getRequest('POST', 'https://jscp-diplom.netoserver.ru/', `event=sale_add&timestamp=${seance.timestamp}&hallId=${seance.hallId}&seanceId=${seance.seanceId}&hallConfiguration=${seance.hallCode}`, function (response) {
        console.log(response);
    })
})