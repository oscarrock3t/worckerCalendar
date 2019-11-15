var	nameMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	nameDays = ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
	monthes = document.querySelectorAll('.month'),
	stateDate = new Date();

window.onload = () => {
	renderMonth();
	currentTime();
	currentDate();
}
//--------------------------------------------------

setInterval(function() {
currentTime();
},1000); 

function currentDate() {
	currentDay = date.getDate(),
	currentMonth = date.getMonth(),
	currentYear = date.getYear()%100,
	nameToday = date.getDay();
	document.querySelector('.today-day').innerHTML = `${nameDays[nameToday]}, ${currentDay} ${monthToday()} 20${currentYear}`;
	function monthToday() {
		return currentMonth == 2 || currentMonth == 7 ?	nameMonth[currentMonth] + 'а' :	nameMonth[currentMonth].slice(0,-1) + 'я';
	};
};

function currentTime() {
	date = new Date(),
	currentHour = beautifyNumbers(date.getHours()),
	currentMinute = beautifyNumbers(date.getMinutes()),
	currentSecond = beautifyNumbers(date.getSeconds());
	document.querySelector('.today-time').innerHTML = `${currentHour}:${currentMinute}:${currentSecond}`;
	function beautifyNumbers(i) {
		return i < 10 ?  '0' + i : i;
	};	
};
//----------------------------------------------
function renderMonth() {
	monthes.forEach((e, i) => {
	e.querySelector('.month-title').append(nameMonth[i]);
	let monthLength = new Date(parseInt('20'+stateDate.getYear()%100),i,0);
	for (let j = 1; j < monthLength.getDay() + 1 ;j++) {
		e.querySelector('.month-days').innerHTML += '<span></span>';
		console.log();
	}	
	monthLength.setMonth(i+1,0);
	for (let j = 1; j <= monthLength.getDate(); j++) {
		e.querySelector('.month-days').innerHTML += `<p class='day'>${j}</p>`;
	}	
	});
	todayDay();
};

function todayDay() {
	today = monthes[stateDate.getMonth()].querySelector('.month-days').querySelectorAll('p').item(stateDate.getDate()-1);
	monthes[stateDate.getMonth()].className += ' current-month';
	today.className += ' today';
}
//---------------------------------------------------


function test() {
	console.log('123');
}