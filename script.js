function openFeatures() {

    var allElem = document.querySelectorAll('.elem');
    var allFullElem = document.querySelectorAll('.fullelems');
    var allFullElemBackBtn = document.querySelectorAll('.fullelems .backbtn')
    let allElemsPage = document.querySelector('.allelems');

    allElem.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allFullElem[elem.id].style.display = 'block';
            allElemsPage.style.display = "none";

            localStorage.setItem("currentPage", elem.id);
        })
    })

    allFullElemBackBtn.forEach(function (backbtn) {
        backbtn.addEventListener('click', function () {
            allFullElem[backbtn.id].style.display = 'none';
            allElemsPage.style.display = "flex";
            localStorage.removeItem("currentPage");

        })
    })

}
openFeatures();

let savedPage = localStorage.getItem("currentPage");

if (savedPage !== null) {

    document.querySelector(".allelems").style.display = "none";

    document.querySelectorAll(".fullelems")[savedPage].style.display = "block";
}

function Todo() {

    var currentTask = [];
    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('task is empty');
    }

    let form = document.querySelector('.addtask form');
    let taskInput = document.querySelector('.addtask form #task-input');
    let taskDetailsInput = document.querySelector('.addtask form textarea');
    let taskCheckbox = document.querySelector('.addtask form #check');


    function renderTask() {
        let allTask = document.querySelector('.alltask');
        let sum = '';

        currentTask.forEach(function (elem, idx) {
            sum = sum + ` <div class="task">
                        <h5>${elem.task}<span class = ${elem.imp}>imp</span></h5>
                        <button id = ${idx}>Mark as completed</button>
                    </div>`;
        })

        allTask.innerHTML = sum;
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        var markCompBtn = document.querySelectorAll('.task button');

        markCompBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)

                renderTask()

            })
        })
    }

    renderTask();


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        currentTask.push(
            {
                task: taskInput.value,
                Details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        );
        renderTask();
        // location.reload()
    })

}

Todo();

function dailyPlanner() {
    var planner = document.querySelector('.planner-container');

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};

    var hrs = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`);
    var wholeDaySum = ''

    hrs.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''
        wholeDaySum = wholeDaySum + `<div class="planner-time">
                    <p>${elem}</p>
                    <input id =" ${idx}" type="text" placeholder=".." value = "${savedData}">
                </div>`
    })

    planner.innerHTML = wholeDaySum;

    var plannerInput = document.querySelectorAll('.planner-container input');

    plannerInput.forEach(function (elem) {
        elem.value = dayPlanData[elem.id] || '';
        elem.addEventListener('input', function () {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()

function Motivation() {
    var motivationalQuote = document.querySelector('.motivation2 h1');
    var motivationalAuthor = document.querySelector('.motivation3 h3');

    async function fecthQuote() {
        let response = await fetch("./quotes.json")
        let data = await response.json();

        const random = data[Math.floor(Math.random() * data.length)];

        // console.log(response);

        motivationalQuote.innerHTML = random.quoteText;
        motivationalAuthor.innerHTML = `- ${random.quoteAuthor}`;

    }
    fecthQuote()
}
Motivation()

function pomodoro() {
    let timerInterval = null;
let totalSeconds = 25 * 60

let timer = document.querySelector(".pomodoro-container h2");
let start = document.querySelector(".start-timer");
let pause = document.querySelector(".pause-timer");
let reset = document.querySelector(".reset-timer");
let session = document.querySelector(".pomodoro-fullpage .session")
var isWorkSession = true

function updateTimer() {
    let min = Math.floor(totalSeconds / 60)
    let sec = totalSeconds % 60;
    // console.log(min,sec)

    timer.innerHTML = `${String(min).padStart('2', '0')} : ${String(sec).padStart('2', '0')}`
}

function startTimer() {
    clearInterval(timerInterval)

    if (isWorkSession) {
        session.innerHTML = 'Work Session';
         session.style.backgroundColor = 'var(--purple-glow)';
        totalSeconds = 25 * 60;
        timerInterval = setInterval(() => {
            if(totalSeconds > 0){
                totalSeconds--
                updateTimer()
            } else{
                isWorkSession = false;
                clearInterval(timerInterval)
            }
        }, 1000);
    } else {
        session.innerHTML = 'Break';
        session.style.backgroundColor = 'var(--blue-glow)';
        totalSeconds = 6*60;
        timerInterval = setInterval(() => {
            if(totalSeconds > 0){
                totalSeconds--
                updateTimer()
            } else{
                isWorkSession = true;
                clearInterval(timerInterval)
            }
        }, 1000);
    }
}
function pauseTimer() {
    clearInterval(timerInterval)
}

function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTimer()
}
start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer)


}
pomodoro()

var apiKey = 'fe94c68c788449d6be7141741261407';
var city = 'Kanpur';

var data = null;

 async function weather() {
    var response = await fetch(` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
   
    var data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2humidity.innerHTML = `Humidity : ${data.current.humidity}%`
    header2Precip.innerHTML = `Precipitaion : ${data.current.precip_in}`
    header2wind.innerHTML = `Wind : ${data.current.wind_kph}km/h`
    header2currentW.innerHTML = `${data.current.condition.text}`
    console.log(data)
}
weather()

var date = null;
var header1Date = document.querySelector('.header1 h1');
var header1Date2 = document.querySelector('.header1 h2');
var header2Temp = document.querySelector('.header2 h2');
var header2Precip =  document.querySelector('.header2 #precip');
var header2humidity = document.querySelector('.header2 #humidity')
var header2wind =  document.querySelector('.header2 #wind')
var header2currentW =  document.querySelector('.header2 #currentW')

function timeDate(){
    const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    date = new Date();
    var dayofweek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    header1Date2.innerHTML = `${tarik}, ${month}, ${year}`;

    if (hours < 12) {
        header1Date.innerHTML = `${dayofweek}, ${hours}:${minutes}:${seconds}PM`
    } else {
        header1Date.innerHTML = `${dayofweek}, ${hours}:${minutes}:${seconds} PM`
    }
}
setInterval(() => {
    timeDate()

}, 1000);
