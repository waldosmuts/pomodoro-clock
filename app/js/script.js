let workTime = 25;
let restTime = 5;
let breakTime = 15;

let timerMin, timer;
let currStatus = timerSec = 0;
let currCycle = 1;
const notify = new Audio("./audio/notify.wav");

$(document).ready(function () {
    $(".start__status").hide();
    $(".start__timer").hide();
    $(".main__skip").hide();
});

$("#work-add").click(function (e) {
    e.preventDefault();
    workTime += 1;
    updateDisplay();
});

$("#work-sub").click(function (e) {
    e.preventDefault();
    workTime > 1 ? workTime -= 1 : workTime = 1;
    updateDisplay();
});

$("#rest-add").click(function (e) {
    e.preventDefault();
    restTime += 1;
    updateDisplay();
});

$("#rest-sub").click(function (e) {
    e.preventDefault();
    restTime > 1 ? restTime -= 1 : restTime = 1;
    updateDisplay();
});

$("#break-add").click(function (e) {
    e.preventDefault();
    breakTime += 1;
    updateDisplay();
});

$("#break-sub").click(function (e) {
    e.preventDefault();
    breakTime > 1 ? breakTime -= 1 : breakTime = 1;
    updateDisplay();
});

function updateDisplay() {
    $("#work-input").attr("value", workTime);
    $("#rest-input").attr("value", restTime);
    $("#break-input").attr("value", breakTime);
};

$(".start__button").click(function (e) {
    e.preventDefault();
    $(".main__start").fadeOut(200, function () {
        $(".start__button").hide();
        $(".start__status").show();
        $(".start__timer").show();
        $(".main__start").addClass("active");
        $(".active").click(function (e) {
            if ($(".main__start").hasClass("paused")) {
                timer = setInterval(updateTimer, 1000);
                $(".main__start").removeClass("paused");
            } else {
                clearInterval(timer);
                $(".main__start").addClass("paused");
            }
        });
        $(".main__start").fadeIn(400, function () {
            $("main").css("flex-direction", "column");
            $(".main__skip").slideDown();
        });
    });
    $(".main__form").fadeOut(200);
    startTimer();
});

$(".main__start").hover(function () {
    $(".start__status").text("Stop");
}, function () {
    updateStatus();
});

$(".main__skip").click(function (e) {
    e.preventDefault();
    timerMin = timerSec = 0;
    if ($(".main__start").hasClass("paused")) {
        timer = setInterval(updateTimer, 1000);
        $(".main__start").removeClass("paused");
    }
});

function startTimer() {
    timerMin = workTime;
    $(".start__timer").text(`${timerMin.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${timerSec.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!timerMin && !timerSec) {
        notify.play();
        currStatus += 1;
        currStatus > 1 ? currStatus = 0 : currStatus = currStatus;
        if (currCycle % 4 === 0) {
            if (currStatus === 0) {
                timerMin = workTime;
            } else {
                currStatus = 2;
                timerMin = breakTime;
                currCycle += 1;
            }
        } else {
            if (currStatus === 0) {
                timerMin = workTime;
            } else {
                timerMin = restTime;
                currCycle += 1;
            }
        }
        updateStatus();
    }
    if (timerSec === 0) {
        timerMin -= 1;
        timerSec = 59;
    } else {
        timerSec -= 1;
    }
    $(".start__timer").text(`${timerMin.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${timerSec.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`);
    $("title").text(`Pomodoro Clock - ${timerMin.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${timerSec.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`);
}

function updateStatus() {
    if (currStatus === 0) {
        $(".start__status").text("Work");
    } else if (currStatus === 1) {
        $(".start__status").text("Rest");
    } else {
        $(".start__status").text("Break");
    }
}