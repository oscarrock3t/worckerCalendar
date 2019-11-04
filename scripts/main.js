var	nameMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	nameDays = ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
	monthes = document.querySelectorAll('.month'),
	stateDate = new Date();

window.onload = () => {
	renderMonth();
	currentDate();
}

setInterval(function() {
currentDate();
},1000);

function currentDate() {
		date = new Date(),
		currentDay = date.getDate(),
		currentMonth = date.getMonth(),
		currentYear = parseInt('20'+date.getYear()%100),
		currentHour = beautifyNumbers(date.getHours()),
		currentMinute = beautifyNumbers(date.getMinutes()),
		currentSecond = beautifyNumbers(date.getSeconds()),
		nameToday = date.getDay();

		document.querySelector('.today-day').innerHTML = `${nameDays[nameToday]}, ${currentDay} ${monthToday()} ${currentYear}`;

		document.querySelector('.today-time').innerHTML = `${currentHour}:${currentMinute}:${currentSecond}`;
};
function beautifyNumbers(i) {
	if (i < 10) {
		return i = '0' + i;
	} else {
		return i;
	}
};
function renderMonth() {
	monthes.forEach((e, i) => {
	e.querySelector('.month-title').append(nameMonth[i]);
	let monthLength = new Date(parseInt('20'+stateDate.getYear()%100),i,0);
	for (let j = 1; j < monthLength.getDay() + 1 ;j++) {
		e.querySelector('.month-days').innerHTML += '<span></span>';
	}	
	monthLength.setMonth(i+1,0);
	for (let j = 1; j <= monthLength.getDate(); j++) {

		e.querySelector('.month-days').innerHTML += `<p>${j}</p>`;
	}	
	});
	todayDay();
};
function monthToday() {
		if (currentMonth == 2 || currentMonth == 7) {
			return nameMonth[currentMonth] + 'а';
		} else {
			return nameMonth[currentMonth].slice(0,-1) + 'я';
		}	
};

function todayDay() {
	today = monthes[stateDate.getMonth()].querySelector('.month-days').querySelectorAll('p').item(stateDate.getDate()-1);
	today.className = 'today';
}