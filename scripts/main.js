var	nameMonth = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
	ruNameDays = ['воскресенье', 'понедельник','вторник','среда','четверг','пятница','суббота'],
	ruShortNameDays = ['вс','пн','вт','ср','чт','пт','сб'],
	euNameDays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],
	euShortNameDays = ['su','mo','tu','we','th','fr','sa'],
	monthes = document.querySelectorAll('.month'),
	stateDate = new Date();

window.onload = () => {
	renderCalendar();
	currentTime();
	currentDate();
}
//--------------------------------------------------

function currentDate() {
	currentDay = date.getDate(),
	currentMonth = date.getMonth(),
	currentYear = date.getYear()%100,
	nameToday = date.getDay();
	document.querySelector('.today-day').innerHTML = `${ruNameDays[nameToday]}, ${currentDay} ${monthToday()} 20${currentYear}`;
	function monthToday() {
		return currentMonth == 2 || currentMonth == 7 ?	nameMonth[currentMonth] + 'а' :	nameMonth[currentMonth].slice(0,-1) + 'я';
	};
	setInterval(function() {
		currentTime();
	},1000); 
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
	allDays = Array.prototype.slice.call(document.querySelectorAll('.day'));	//массив всех ДНИ
	elapsedDays = function() { 													//количество прошедших дней - равен текущему дню из года
		for(let i = 0; i < allDays.length; i++) {
			if(!$(allDays[i]).hasClass('today')) {continue;} else {return i;}
		}
	};

};
function todayDay() {
	today = monthes[stateDate.getMonth()].querySelector('.month-days').querySelectorAll('p').item(stateDate.getDate()-1);
	monthes[stateDate.getMonth()].className += ' current-month';
	today.className += ' today';
}
//---------------------------------------------------

//МЕТОДОМ ПРОФИЛЕЙ
//т.е.
//ВЫБИРАЕТСЯ ПРОФИЛЬ
//ВЫБИРАЕТСЯ ПЕРВЫЙ РАБОЧИЙ ДЕНЬ СМЕНЫ
//РАСЧИТЫВАЕТСЯ ГРАФИК РАБОЧИХ ДНЕЙ

$(document).on('click', '.day', function () {
	allDays.forEach((e) =>{
		$(e).removeClass('selectedDay');
	});
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



});