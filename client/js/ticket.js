const seance = JSON.parse(localStorage.getItem('seance'));
console.log(seance);
const ticketTitle = document.querySelector('.ticket__title');
ticketTitle.textContent = seance.filmName;
const ticketChairs = document.querySelector('.ticket__chairs');
ticketChairs.textContent = seance.ticketChairs;
const ticketHall = document.querySelector('.ticket__hall');
ticketHall.textContent = seance.hallName.slice(3);
const ticketStart = document.querySelector('.ticket__start');
ticketStart.textContent = seance.seanceTime;
const ticketInfoQr = document.querySelector('.ticket__info-qr');
const ticketQr = document.createElement('div.ticket__info-qr');
ticketInfoQr.replaceWith(ticketQr);
let ticketInfo;
function generate(ticketInfo) {
    var qrcode = new QRCode(document.querySelector(".ticket__info-qr"), {
        text: `${ticketInfo}`,
        width: 180, //default 128
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}
generate(ticketInfo);