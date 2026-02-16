function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemsPage = document.querySelectorAll(".fullElem");
  var allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemsPage[elem.id].style.display = "block";
    });
  });

  allFullElemsBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemsPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  var form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");
    let sum = "";
    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        ` <div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp </span></h5>
              <button id=${idx}>Mark as completed</button>
            </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();

    taskCheckbox.checked = false;
    taskDetailsInput.value = "";
    taskInput.value = "";
  });
}
todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var saveData = dayPlanData[idx] || "";
    wholeDaySum =
      wholeDaySum +
      `    <div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value=${saveData}>
          </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;
  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivationalQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationalAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    try {
      let response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
          "X-Api-Key": "bRuwAsL+E7ExIZkqMgI/gQ==kzDeQhOPy5wX84mt",
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();

      // API returns an array
      motivationalQuoteContent.innerHTML = data[0].quote;
      motivationalAuthor.innerHTML = `- ${data[0].author}`;
    } catch (error) {
      console.log("Error:", error);
    }
  }

  fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".pomodoro-fullpage .session");
  var isWorkSession = true;

  let timerInterval = null;
  let totalSeconds = 25 * 60;
  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    updateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function weatherFunctionality() {
  var header = document.querySelector("header");
  var weatherapi = "43584a7d51644bb697b95926260401";
  var city = "Mumbai";
  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var heatIndex = document.querySelector(".header2 .heatIndex");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");
  var cityName = document.querySelector(".header1 h4");

  var data = null;
  async function weatherAPICall() {
    var response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${weatherapi}&q=${city}`
    );
    data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity : ${data.current.humidity}%`;
    heatIndex.innerHTML = `Heat Index: ${data.current.heatindex_c}°C`;
    cityName.innerHTML = `${data.location.name} , ${data.location.region}`;
  }

  weatherAPICall();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let monthName = [
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
      "December",
    ];
    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthName[date.getMonth()];
    var year = date.getFullYear();
    header1Date.innerHTML = `${tarik} ${month}, ${year}`;
    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} PM`;
      header.style.backgroundImage = `url(${"https://images.unsplash.com/photo-1508020963102-c6c723be5764?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} AM`;
      header.style.backgroundImage = `url(${"https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2t5fGVufDB8MHwwfHx8MA%3D%3D"})`;
    }
  }
  setInterval(() => {
    timeDate();
  });
}

weatherFunctionality();
