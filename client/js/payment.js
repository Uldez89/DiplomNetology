window.addEventListener('DOMContentLoaded', () => {
    const seance = JSON.parse(localStorage.getItem('seance'));
    console.log(seance);
    const ticketTitle = document.querySelector('.ticket__title');
    ticketTitle.textContent = seance.filmName; //seance.filmName;
    const ticketChairs = document.querySelector('.ticket__chairs');
    const placePositionArr = seance.selectedChairs;
    const placeCode = seance.hallCode;
    const acceptinButton = document.querySelector('.acceptin-button');
    console.log(placeCode);
    let rowPlace = [];
    let price = 0;
    placePositionArr.forEach(element => {
        rowPlace.push(' ' + element.row + '/' + element.place);
        if (element.type === 'standart') {
            price += +seance.priceStandart;
        } else {
            price += +seance.priceVip;
        }
    });
    ticketChairs.textContent = rowPlace.slice(', ');
    const ticketHall = document.querySelector('.ticket__hall');
    ticketHall.textContent = seance.hallName.slice(3);
    const ticketStart = document.querySelector('.ticket__start');
    ticketStart.textContent = seance.seanceTime;
    const ticketCost = document.querySelector('.ticket__cost');
    ticketCost.textContent = price;
    const newHallConfig = seance.hallCode.replace(/selected/g, `taken`);
    seance.ticketChairs = ticketChairs.textContent;
    console.log(JSON.stringify(seance));


    acceptinButton.addEventListener('click', () => {
        localStorage.setItem('seance', JSON.stringify(seance));
        getRequest('POST', 'https://jscp-diplom.netoserver.ru/', `event=sale_add&timestamp=${seance.timeStamp}&hallId=${seance.hallId}&seanceId=${seance.seanceId}&hallConfiguration=${newHallConfig}`)
    })
})