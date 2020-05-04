const dt = new Date();

const renderDate = () => {
    const day = dt.getDay();
    const today = new Date();
    const monthDays = new Date(
        dt.getFullYear(),
        dt.getMonth() + 1,
        0
    ).getDate();

    const pastDays = new Date(
        dt.getFullYear(),
        dt.getMonth(),
        0
    ).getDate();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    document.getElementById("month").innerHTML = months[dt.getMonth()];
    document.getElementById("date_str").innerHTML = dt.toDateString();
    let days = "";

    for (x = day; x > 0; x--) {
        days += `<div class='prev_date'>${(pastDays - x + 1)}</div>`;
    }

    for (i = 1; i <= monthDays; i++) {
        if (i == today.getDate() && dt.getMonth() == today.getMonth()) {
            days += `<div class='current-day today' >${i}</div>`;
        } 
        else
            days += `<div class="current-day" data-single-day="single-day">${i}<span class="span"></span></div>`;
    }

    document.getElementsByClassName("days")[0].innerHTML = days;
}
renderDate()

const nextPrevBtns = () => {
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    
    prev.addEventListener('click', () => moveDate('prev'));
    next.addEventListener('click', () => moveDate('next'));
    
    const moveDate = (clickedArr) => {
        clickedArr === 'prev' ? {changeMonth: dt.setMonth(dt.getMonth() - 1), storeMonth: localStorage.setItem('currentMonth', dt.getMonth())} 
        :
        clickedArr === 'next'? {changeMonth: dt.setMonth(dt.getMonth() + 1), storeMonth: localStorage.setItem('currentMonth', dt.getMonth())} : null;
        renderDate();
    }
}
nextPrevBtns()

const storeIndexMsg = () => {
    let storeIndex = '';
    let storeMsg = [];
    const wrapper = document.getElementById('days');

    wrapper.addEventListener('click', (event) => {
        if(event.target.dataset.singleDay) {
            const prpt = prompt('Add event');
            storeMsg.push(prpt);
            const regex = /\d+/gm;
            const focusedElement = (storeIndex += event.target.innerHTML.match(regex) + ',').slice(0, storeIndex.length -1);
            localStorage.getItem('msg') === 'null' ? localStorage.setItem('msg', '') : localStorage.setItem('msg', storeMsg);
            localStorage.setItem('index', focusedElement);
            event.target.lastChild.innerHTML = prpt;
            if(prpt) {
                prpt.length > 0 && event.target.classList.add('booked-date');
            }
        }
    });
}

const addToStorage = () => {

    storeIndexMsg();

    if (localStorage) {
        const getSpans = document.getElementsByClassName('span');
        Array.of(getSpans).map(span => {
            let arr = [];
            arr.push(localStorage.index);
            arr.map(indexItem => {
                const splitIndex = indexItem.split(',');
                const splitMsg = localStorage.msg.split(',');

                for(i of splitIndex) {
                    if (span[i] !== undefined && splitMsg.join('').length > 0) {
                        span[i - 2].innerHTML = splitMsg.shift();
                        span[i - 2].parentElement.classList.add('booked-date');
                    }
                }
            });
        })
    }
}
addToStorage();