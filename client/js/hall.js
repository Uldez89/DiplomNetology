window.addEventListener('DOMContentLoaded', () => { 
    const seanceHall = JSON.parse(localStorage.getItem('seance'));
    console.log(seanceHall);
    const buyingInfoTitle = document.querySelector('.buying__info-title');
    buyingInfoTitle.textContent = seanceHall.filmName;
    const buyingInfoStart = document.querySelector('.buying__info-start');
    buyingInfoStart.textContent = 'Начало сеанса: ' + seanceHall.seanceTime;
    const buyingInfoHall = document.querySelector('.buying__info-hall');
    buyingInfoHall.textContent = seanceHall.hallName;
    const buyingInfo = document.querySelector('.buying__info');
    const priceStandart = document.querySelector('.price-standart');
    priceStandart.textContent = seanceHall.priceStandart;
    const priceVip = document.querySelector('.price-vip');
    priceVip.textContent = seanceHall.priceVip;
    buyingInfo.addEventListener('dblclick', () => {
        const buying = document.querySelector('.buying');
        buying.classList.toggle('buying-transform');
    })

    getRequest('POST', 'https://jscp-diplom.netoserver.ru/', `event=get_hallConfig&timestamp=${seanceHall.timeStamp}&hallId=${seanceHall.hallId}&seanceId=${seanceHall.seanceId}`, function (response) {
        console.log(response);
        let hallConfig;
        if (response) {
            hallConfig = response;
        } else {
            hallConfig = seanceHall.seanceInitialHallCode;
            console.log(seanceHall.seanceInitialHallCode);
        }
        const confStepWrapper = document.querySelector('.conf-step__wrapper');
        confStepWrapper.textContent = '';
        confStepWrapper.insertAdjacentHTML("afterbegin", hallConfig);
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
                selectedChairs.push({ row: row, place: place, type: type })
                chair.classList.remove('conf-step__chair_selected');
                chair.classList.add('conf-step__chair_taken');
            })
            const confStepWrapperNew = document.querySelector('.conf-step__wrapper').innerHTML;
            seanceHall.hallCode = confStepWrapperNew;
            console.log(confStepWrapperNew);
            seanceHall.selectedChairs = selectedChairs;
            console.log(seanceHall);
            localStorage.setItem('seanceHall', JSON.stringify(seanceHall));
            window.location.href = 'payment.html';
        })
        
    });
})
