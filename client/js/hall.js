window.addEventListener('DOMContentLoaded', () => { 
    const seance = JSON.parse(localStorage.getItem('seance'));
    console.log(seance);
    const buyingInfoTitle = document.querySelector('.buying__info-title');
    buyingInfoTitle.textContent = seance.filmName;
    const buyingInfoStart = document.querySelector('.buying__info-start');
    buyingInfoStart.textContent = 'Начало сеанса: ' + seance.seanceTime;
    const buyingInfoHall = document.querySelector('.buying__info-hall');
    buyingInfoHall.textContent = seance.hallName;
    const buyingInfo = document.querySelector('.buying__info');
    const priceStandart = document.querySelector('.price-standart');
    priceStandart.textContent = seance.priceStandart;
    const priceVip = document.querySelector('.price-vip');
    priceVip.textContent = seance.priceVip;
    buyingInfo.addEventListener('dblclick', () => {
        const buying = document.querySelector('.buying');
        buying.classList.toggle('buying-transform');
    })
    let start = seance.seanceStart;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0);
    let timestamp = Math.floor(currentDate.getTime() / 1000) + +seance.seanceStart * 60;


    getRequest('POST', 'https://jscp-diplom.netoserver.ru/', `event=get_hallConfig&timestamp=${timestamp}&hallId=${seance.hallId}&seanceId=${seance.seanceId}`, function (response) {
        console.log(response);
        if (response) {
            const confStepWrapper = document.querySelector('.conf-step__wrapper');
            confStepWrapper.textContent = '';
            confStepWrapper.insertAdjacentHTML("afterbegin", response);
            const acceptinButton = document.querySelector('.acceptin-button');
            acceptinButton.setAttribute('disabled', 'desabled');
            const confStepRow = document.querySelectorAll('.conf-step__row');
            confStepRow.forEach((row) => {
                let confStepChair = row.querySelectorAll('.conf-step__chair');
                confStepChair.forEach((chair) => {
                    chair.addEventListener('click', () => {
                        if (chair.classList.contains('conf-step__chair_taken')) {
                            return;
                        }
                        chair.classList.toggle('conf-step__chair_selected');
                        let confStepChairSelected = document.querySelectorAll('.conf-step__chair_selected');
                        if (confStepChairSelected.length > 1) {
                            acceptinButton.removeAttribute('disabled');
                        } else {
                            acceptinButton.setAttribute('disabled', 'desabled');
                        }
                    })
                })
            })
            acceptinButton.addEventListener('click', () => {
                selectedChairs = [];
                let confStepChairSelected = document.querySelectorAll('.conf-step__row .conf-step__chair_selected');
                confStepChairSelected.forEach((chair) => {
                    let parentChair = chair.closest('.conf-step__row');
                    let row = Array.from(document.querySelectorAll('.conf-step__row')).indexOf(parentChair) + 1;
                    let place = Array.from(parentChair.children).indexOf(chair) + 1;
                    let type;
                    if (chair.classList.contains('conf-step__chair_standart')) {
                        type = 'standart';
                    } else if (chair.classList.contains('conf-step__chair_vip')) {
                        type = 'vip'; 
                    }
                    selectedChairs.push({ row: row, place: place, type: type})
                })
                window.location.href = 'payment.html';
                const confStepWrapperNew = document.querySelector('.conf-step__wrapper').innerHTML;
                seance.hallCode = confStepWrapperNew;
                seance.timestamp = timestamp;
                seance.selectedChairs = selectedChairs;
                localStorage.setItem('seance', JSON.stringify(seance));
            })
        }
    });
})
