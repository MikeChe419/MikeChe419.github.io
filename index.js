class Timer {
	constructor(date, inputTitle) {
	  this.date = date;
	  this.timerID  = null;
	  this.dateNow = null;
	}
 
	init() {
		if (this.date === '') {
		  // проверяем что дата подходящая
		  alert('Дата не введена!');
  
		  return;
		}
  
		countdownTitle.textContent = this.inputTitle;
  
		this.startTimer();
	 }
 
	// запускается таймер
	startTimer() {
	  // сохраняем данные в локальное хранилище
	  localStorage.setItem('title', inputTitle.value);
	  localStorage.setItem('date', this.date);
 
	  // значение заголовка
	  countdownTitle.innerHTML = inputTitle.value;
 
	  transitionDisplay();
	  this.keepCountdown();
	  this.timerID = setInterval(this.keepCountdown.bind(this), 1000); // вызываем функцию кажду секунду
	}
 
	// логика обратного отсчета до выбранной даты
	keepCountdown() {
	  this.dateNow = moment(); // текущий момент
 
	  if (moment(this.date).diff(this.dateNow) <= 0) {
		 clearInterval(this.timerID);
		 complete.classList.remove('hide');
		 complete.textContent = `${this.inputTitle} завершился ${this.date}`;
 
		 return;
	  }
 
	  this.createDate(this.dateNow);
	}
 
	// находим целое количество дней,часов,минут и секунд в разнице между датами
	createDate(dateNow) {
	  const days = Math.floor(moment(this.date).diff(dateNow, 'days'));
	  const hours = Math.floor(moment(this.date).diff(dateNow, 'hours') % 24);
	  const minutes = Math.floor(moment(this.date).diff(dateNow, 'minutes') % 60);
	  const seconds = Math.floor(moment(this.date).diff(dateNow, 'seconds') % 60);
 
	  // складываем полученные значения по следующему формату: дни:часы:минуты:секунды
	  numbers.textContent = 
	  `${this.addZero(days)}:${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
	}
 
	// проверка значений, все значения из 2х цифр и чтобы смотрелось лучше добавляем 0 к числам меньше 10
	addZero(dateID) {
	 return dateID < 10 ? `0${dateID}` : dateID;
	}
 }

const inputTitle = document.querySelector('#title-date');
const countdownTitle = document.querySelector('h1');
const inputDate = document.querySelector('#date');
const numbers = document.querySelector('.numbers');
const complete = document.querySelector('.complete');

const buttonStart = document.querySelector('#btn');
const buttonReset = document.querySelector('#btn-reset');
const blockInput = document.querySelector('.input');
const blockOutput = document.querySelector('.output');

let timer;

// изменить отображение и начать подсчет самого обратного отсчета
// скрываем кнопку "Начать" и выводим кнопку "Сброс"
const transitionDisplay = () => {
	buttonStart.classList.add('hide');
	buttonReset.classList.remove('hide');
	blockInput.classList.add('hide');
	blockOutput.classList.remove('hide');
 };

// точка входа, начало работы таймера, сохранение текущей даты и переход к следующему внешнему виду отображения на экране
function startCountdown() {
  timer = new Timer(inputDate.value);
  timer.init();

  buttonReset.addEventListener('click', reset);
}

// обнуляем значения полей ввода, сбрасываем все до начального состояния
function reset() {
  countdownTitle.textContent = 'Создать новый таймер обратного отсчета';
  blockInput.classList.remove('hide');
  blockOutput.classList.add('hide');
  buttonReset.classList.add('hide');
  buttonStart.classList.remove('hide');

  inputTitle.value = '';
  inputDate.value = '';

  // удаляем информацию из LocalStorage при сбросе таймера
  localStorage.removeItem('title');
  localStorage.removeItem('date');
  clearInterval(timer.timerID);
}

// заполняется при обновлении страницы и получать эти значения из localStorage
const pageRefresh = () => {
  const title = localStorage.getItem('title');
  const date = localStorage.getItem('date');

  if (!title && !date) {
    return;
  }

  inputTitle.value = title;
  inputDate.value = date;

  startCountdown();
};

buttonStart.addEventListener('click', startCountdown); // кнопка начать
// проверяем есть ли значение в localStorage и если есть переходим к дальнейшей работе
pageRefresh();




