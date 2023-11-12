const dayLabel = document.getElementById('day-label');
const monthLabel = document.getElementById('month-label');
const yearLabel = document.getElementById('year-label');


let dayInput = document.getElementById('day');
let monthInput = document.getElementById('month');
let yearInput = document.getElementById('year');

let dayError = document.querySelector('.error-text__day');
let monthError = document.querySelector('.error-text__month');
let yearError = document.querySelector('.error-text__year');

const btn = document.getElementById('btn');

let calculatedYears = document.getElementById('calculated-years');
let calculatedMonths = document.getElementById('calculated-months');
let calculatedDays = document.getElementById('calculated-days');


dayInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, "");
});

monthInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, "");
});

yearInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, "");
});



function alertError(msg, inputID) {
    switch (inputID) {
        case "day":
            dayError.textContent = msg;
            dayLabel.classList.add("error");
            monthLabel.classList.add("error");
            yearLabel.classList.add("error");
            dayInput.classList.add("error-input");
            monthInput.classList.add("error-input");
            yearInput.classList.add("error-input");
            break;
        case "month":
            monthError.textContent = msg;
            dayLabel.classList.add("error");
            monthLabel.classList.add("error");
            yearLabel.classList.add("error");
            dayInput.classList.add("error-input");
            monthInput.classList.add("error-input");
            yearInput.classList.add("error-input");
            break;
        case "year":
            yearError.textContent = msg;
            dayLabel.classList.add("error");
            monthLabel.classList.add("error");
            yearLabel.classList.add("error");
            dayInput.classList.add("error-input");
            monthInput.classList.add("error-input");
            yearInput.classList.add("error-input");
            break;
        default:
            break;
    }
}

function isValidNumber(value) {
    return !isNaN(value) && isFinite(value) && Number.isInteger(Number(value));
}

function leapYear(year) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

function showAge() {
    let day = parseInt(dayInput.value, 10);
    let month = parseInt(monthInput.value, 10);
    let year = parseInt(yearInput.value, 10);

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    let ageYears = currentYear - year;
    let ageMonths = currentMonth - month;
    let ageDays = currentDay - day;

    if (ageDays < 0) {
        ageMonths--;
        ageDays += 30;
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    if (!isNaN(ageYears) && !isNaN(ageMonths) && !isNaN(ageDays)) {
        calculatedYears.innerHTML = ageYears;
        calculatedMonths.innerHTML = ageMonths;
        calculatedDays.innerHTML = ageDays;
    } else {
        calculatedYears.innerHTML = "--";
        calculatedMonths.innerHTML = "--";
        calculatedDays.innerHTML = "--";
    }
}


function calculateAge() {
    const inputsID = ['day', 'month', 'year'];

    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";

    let isError = false;

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    inputsID.forEach(inputID => {
        let input = document.getElementById(inputID);
        let value = input.value;

        if (value === "") {
            alertError("This field is required", inputID);
            isError = true;
        } else if (!isValidNumber(value)) {
            alertError("Enter a valid number", inputID);
            isError = true;
        } else {

            let numericValue = parseInt(value, 10);

            if (inputID === "day" && (numericValue < 1 || numericValue > 31)) {
                alertError("Must be a valid day", inputID);
                isError = true;
            } else if (inputID === "month" && (numericValue < 1 || numericValue > 12)) {
                alertError("Must be a valid month", inputID);
                isError = true;
            } else if (inputID === "year" && (numericValue > currentYear)) {
                alertError("Must be in the past", inputID);
                isError = true;
            } else if ((inputID === "month" && (numericValue === 2)) && (inputID === "day" && (numericValue > 29))) {
                alertError("Must be a valid date", inputID === "day");
                isError = true;
            }
        }

        if (parseInt(monthInput.value, 10) === 2 && parseInt(dayInput.value, 10) > 29 && !leapYear(parseInt(yearInput.value, 10))) {
            alertError("Must be a valid date", "day");
            isError = true;
        } else if ([4, 6, 9, 11].includes(parseInt(monthInput.value, 10)) && parseInt(dayInput.value, 10) > 30) {
            alertError("Must be a valid date", "day");
            isError = true;
        } else if (yearInput.value > currentYear) {
            isError = true;
        } else if (isError === false) {
            calculatedYears.classList.add('age-field');
            calculatedMonths.classList.add('age-field');
            calculatedDays.classList.add('age-field');
            showAge();

            dayLabel.classList.remove("error");
            monthLabel.classList.remove("error");
            yearLabel.classList.remove("error");
            dayInput.classList.remove("error-input");
            monthInput.classList.remove("error-input");
            yearInput.classList.remove("error-input");

            setTimeout(() => {
                calculatedYears.classList.remove('age-field');
                calculatedMonths.classList.remove('age-field');
                calculatedDays.classList.remove('age-field');
            }, 2000);
        }
    })

}

btn.addEventListener("click", calculateAge);