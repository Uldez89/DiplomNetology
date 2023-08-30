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
    })

    pageNavDaysWeek.forEach((i) => {
        if (i.textContent === 'Сб' || i.textContent === 'Вс') {
            i.closest('.page-nav__day').classList.add('page-nav__day_weekend');
        }
    })

    pageNavDay.forEach((item) => {
        item.addEventListener('click', (e) => {
            pageNavDay.forEach((i) => {
                i.classList.remove('page-nav__day_chosen')
            })
            item.classList.toggle('page-nav__day_chosen');
        })
    })
    getRequest('POST', 'https://jscp-diplom.netoserver.ru/', 'event=update', function (response) { 
        const films = response.films.result;
        console.log(films);
        const halls = response.halls.result;
        console.log(halls);
        const seances = response.seances.result;
        console.log(seances);
        const main = document.querySelector('main');
        console.log(main);
        films.forEach((film, index) => {
            // if (halls.hall_open === '1' && seances.seance_filmid === films.film_id) {
                main.insertAdjacentHTML("afterbegin", '<section class="movie"><div class="movie__info"><div class="movie__poster"><img class="movie__poster-image" alt="Звёздные войны постер" src=' + film.film_poster + '></div><div class="movie__description"><h2 class="movie__title">' + film.film_name + '</h2><p class="movie__synopsis">' + film.film_description + '</p><p class="movie__data"><span class="movie__data-duration">' + film.film_duration + ' минуты </span><span class="movie__data-origin">' + film.film_origin + '</span></p></div></div></div></section>')
            // }
        })
    })

    

})