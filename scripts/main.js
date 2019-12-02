var	nameMonth = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
	ruNameDays = ['воскресенье', 'понедельник','вторник','среда','четверг','пятница','суббота'],
	ruShortNameDays = ['вс','пн','вт','ср','чт','пт','сб'],
	euNameDays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],
	euShortNameDays = ['su','mo','tu','we','th','fr','sa'],
	monthes = document.querySelectorAll('.month'),
	stateDate = new Date(),
	schedule = 0;
renderCalendar();
currentTime();
currentDate();


function currentDate() {
	currentDay = date.getDate(),
	currentMonth = date.getMonth(),
	currentYear = date.getYear()%100,
	nameToday = date.getDay();
	document.querySelector('.today-day').innerHTML = `${ruNameDays[nameToday]}, ${currentDay} ${monthToday()} 20${currentYear}`;
	setInterval(function() {
		currentTime();
	},1000); 
};

function monthToday() {
	return currentMonth == 2 || currentMonth == 7 ?	nameMonth[currentMonth] + 'а' :	nameMonth[currentMonth].slice(0,-1) + 'я';
};

function beautifyNumbers(i) {
	return i < 10 ?  '0' + i : i;
};	

function currentTime() {
	date = new Date(),
	currentHour = beautifyNumbers(date.getHours()),
	currentMinute = beautifyNumbers(date.getMinutes()),
	currentSecond = beautifyNumbers(date.getSeconds());
	document.querySelector('.today-time').innerHTML = `${currentHour}:${currentMinute}:${currentSecond}`;
};

function renderCalendar() { 													//добавление в ХТМЛ - названий и количество дней в месяц
	monthes.forEach((e, i) => { 												//для каждого блока
		e.querySelector('.month-title').append(nameMonth[i]); 					//добавление заголовков
		let monthLength = new Date(parseInt('20'+stateDate.getYear()%100),i,0); //добвление пустых ячеек для заполнения недели
		for (let j = 0; j < monthLength.getDay();j++) {
			e.querySelector('.month-days').innerHTML += '<span></span>';
		}	
		monthLength.setMonth(i+1,0);											//добавление чисел в месяц
		for (let j = 1; j <= monthLength.getDate(); j++) {
			e.querySelector('.month-days').innerHTML += `<p class="day">${j}</p>`;
		}	
	});
	todayDay();																	//выбор текущего-сегодняшнего дня
	allDays = Array.prototype.slice.call(document.querySelectorAll('.day'));	//из NodeList в массив
};

function elapsedDays() { 													//количество прошедших дней - равен текущему дню из года
	for(let i = 0; i < allDays.length; i++) {
		if(!$(allDays[i]).hasClass('today')) {continue;} else {return i;}
	}
};

function todayDay() {
	today = monthes[stateDate.getMonth()].querySelector('.month-days').querySelectorAll('p').item(stateDate.getDate()-1);
	monthes[stateDate.getMonth()].className += ' current-month';
	today.className += ' today';
}

function removeSelectSchedule(elem){ 
	let schedules = document.querySelectorAll('.schedule-variable');
	schedules.forEach((e) => {
		$(e).removeClass('selectedSchedule');
	});
	$(elem).addClass('selectedSchedule');
	allDays.forEach((e) =>{
		$(e).removeClass('selectedDay');
	});
}

$(document).on('click', '.schedule-5for2', function() {
	schedule = '5for2';
	removeSelectSchedule(this);
});

$(document).on('click', '.schedule-2for2', function() {
	schedule = '2for2';
	removeSelectSchedule(this);
});

$(document).on('click', '.schedule-1for1', function() {
	schedule = '1for1';
	removeSelectSchedule(this);
});

$(document).on('click', '.day', function () {
	allDays.forEach((e) =>{
		$(e).removeClass('selectedDay');
	});
	switch (schedule) {
		case '5for2':
			for(let i = allDays.indexOf(this); i < allDays.length; i++) {
				$(allDays[i]).addClass('selectedDay');
				$(allDays[i+1]).addClass('selectedDay');
				$(allDays[i+2]).addClass('selectedDay');
				$(allDays[i+3]).addClass('selectedDay');
				$(allDays[i+4]).addClass('selectedDay');
				i += 6;
			}
			for(let i = allDays.indexOf(this); i > 0; i--) {
				$(allDays[i-7]).addClass('selectedDay');
				$(allDays[i-6]).addClass('selectedDay');
				$(allDays[i-5]).addClass('selectedDay');
				$(allDays[i-4]).addClass('selectedDay');
				$(allDays[i-3]).addClass('selectedDay');
				i -= 6;
			}
		break;
		case '2for2':
			for(let i = allDays.indexOf(this); i < allDays.length; i++) {
				$(allDays[i]).addClass('selectedDay');
				$(allDays[i+1]).addClass('selectedDay');
				i += 3;
			}
			for(let i = allDays.indexOf(this); i > 0; i--) {
				$(allDays[i-3]).addClass('selectedDay');
				$(allDays[i-4]).addClass('selectedDay');
				i -= 3;
			}
		break;
		case '1for1':
			for(let i = allDays.indexOf(this); i < allDays.length; i++) {
				$(allDays[i]).addClass('selectedDay');
				i += 1;
			}
			for(let i = allDays.indexOf(this); i > 0; i--) {
				$(allDays[i-2]).addClass('selectedDay');
				i -= 1;
			}
		break;
	}

});

