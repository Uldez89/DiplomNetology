document.addEventListener('DOMContentLoaded', () => {
    const seanceTicket = JSON.parse(localStorage.getItem('seancePayment'));
    let seanceTicketHallCode = seanceTicket.hallCode;
    console.log(seanceTicketHallCode);
    const ticketTitle = document.querySelector('.ticket__title');
    ticketTitle.textContent = seanceTicket.filmName;
    const ticketChairs = document.querySelector('.ticket__chairs');
    ticketChairs.textContent = seanceTicket.ticketChairs;
    const ticketHall = document.querySelector('.ticket__hall');
    ticketHall.textContent = seanceTicket.hallName.slice(3);
    const ticketStart = document.querySelector('.ticket__start');
    ticketStart.textContent = seanceTicket.seanceTime;
    const ticketInfoQr = document.querySelector('.ticket__info-qr');
    const ticketQr = document.createElement('div.ticket__info-qr');
    ticketInfoQr.replaceWith(ticketQr);
    const seanceDate = new Date(+`${seanceTicket.timeStamp * 1000}`);
    let seanceDay;
    if (seanceDate.getMonth() + 1 < 10) {
        seanceDay = `${seanceDate.getDate()}.0${seanceDate.getMonth() + 1}.${seanceDate.getFullYear()}`;
    } else {
        seanceDay = `${seanceDate.getDate()}.${seanceDate.getMonth() + 1}.${seanceDate.getFullYear()}`
    }
    const infoQr = `На фильм: ${seanceTicket.filmName}, дата: ${seanceDay}, начало сеанса: ${seanceTicket.seanceTime}, зал: ${seanceTicket.hallName.slice(3)}, ряд/место: ${seanceTicket.ticketChairs}`;
    console.log(infoQr);
    const qrCode = QRCreator(infoQr, {Image: "SVG"});
    ticketQr.append(qrCode.result);
})