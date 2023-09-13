window.addEventListener('DOMContentLoaded', () => {
    const pageNavDay = document.querySelectorAll('.page-nav__day');
    const pageNavDaysWeek = document.querySelectorAll('.page-nav__day-week');
    const pageNavDaysNumber = document.querySelectorAll('.page-nav__day-number');
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    pageNavDaysNumber.forEach((pageNavDayNumber, index) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + index);
        pageNavDayNumber.textContent = currentDate.getDate();
        pageNavDaysWeek[index].textContent = weekdays[currentDate.getDay()];
        if (index === 0) {
            pageNavDayNumber.closest('.page-nav__day').classList.add('page-nav__day_today');
        }
    })

    pageNavDaysWeek.forEach((i) => {
        if (i.textContent === 'Сб' || i.textContent === 'Вс') {
            i.closest('.page-nav__day').classList.add('page-nav__day_weekend');
        }
    })

    getRequest('POST', 'https://jscp-diplom.netoserver.ru/', 'event=update', function (response) {
        console.log(response);
        const films = response.films.result;
        const halls = response.halls.result;
        const seances = response.seances.result;
        const main = document.querySelector('main');
        main.innerHTML = '';
        films.forEach((film) => {
            let codeHalls = '';
            halls.forEach((hall) => {
                if (hall.hall_open === '1') {
                    const filmSeances = seances.filter((item) => (item.seance_filmid === film.film_id) && (item.seance_hallid === hall.hall_id));

                    if (filmSeances.length > 0) {
                        codeHalls += '<div class="movie-seances__hall"><h3 class="movie-seances__hall-title">' + hall.hall_name + '</h3><ul class="movie-seances__list">';
        
                        filmSeances.forEach((seance) => {
                            codeHalls += `<li class="movie-seances__time-block"><a class="movie-seances__time" href="client/hall.html" data-film-name="${film.film_name}" data-film-id="${film.film_id}" data-hall-id="${hall.hall_id}" data-hall-name="${hall.hall_name}" data-price-standart="${hall.hall_price_standart}" data-seance-initial-Hall-Code='${hall.hall_config}' data-price-vip="${hall.hall_price_vip}" data-seance-id="${seance.seance_id}" data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}"> ${seance.seance_time} </a></li>`;
                        })
                        codeHalls += '</ul></div>';
                    }
                }

                if (codeHalls) {
                    main.innerHTML += '<section class="movie"><div class="movie__info"><div class="movie__poster"><img class="movie__poster-image" alt=' + film.film_name + ' src=' + film.film_poster + '></div><div class="movie__description"><h2 class="movie__title">' + film.film_name + '</h2><p class="movie__synopsis">' + film.film_description + '</p><p class="movie__data"><span class="movie__data-duration">' + film.film_duration + ' минуты </span><span class="movie__data-origin">' + film.film_origin + '</span></p></div></div>' + codeHalls + '</section>';
                }
            })
        })
        let movie = document.querySelectorAll('.movie');
        for (let i = 0; i < movie.length - 1; i += 1) {
            if (movie[i].children[0].innerText === movie[i + 1].children[0].innerText) {
                movie[i].remove();
            }
        }

        function showCurrentSeance() {
            const movieSeancesTime = document.querySelectorAll('.movie-seances__time');
            movieSeancesTime.forEach((time) => {
                const date = new Date();
                const currentTimeHours = date.getHours();
                const currentTimeMin = date.getMinutes();
                const seanceTime = time.textContent.split(':');
                const dayToday = document.querySelector('.page-nav__day_chosen');
                const dayTodayDate = dayToday.querySelector('.page-nav__day-number');
                if ((+seanceTime[0] < currentTimeHours || (+seanceTime[0] == currentTimeHours && +seanceTime[1] < currentTimeMin)) && date.getDate() == dayTodayDate.textContent) {
                    time.classList.add('acceptin-button-disabled');
                } else {
                    time.classList.remove('acceptin-button-disabled');
                }
                let seanceStart = +time.dataset.seanceStart;

                let selectedDayIndex = Array.from(pageNavDay).indexOf(dayToday);
                date.setDate(date.getDate() + selectedDayIndex);
                date.setHours(0, 0, 0, 0);
                let seanceTimeStamp = Math.floor(date.getTime() / 1000) + seanceStart * 60; 
                time.dataset.timeStamp = seanceTimeStamp;
            })
        }
        showCurrentSeance();

        pageNavDay.forEach((item) => {
            item.addEventListener('click', (e) => {
                pageNavDay.forEach((i) => {
                    i.classList.remove('page-nav__day_chosen')
                })
                item.classList.toggle('page-nav__day_chosen');
    
                showCurrentSeance();
            })
        })
        const movieSeancesTime = document.querySelectorAll('.movie-seances__time');
        movieSeancesTime.forEach((time) => {
            time.addEventListener('click', () => {
                let selectedSeance = time.dataset;
                localStorage.setItem('seance', JSON.stringify(selectedSeance));
            })
        })
    })
})

