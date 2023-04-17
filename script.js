'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = movements => {
  containerMovements.innerHTML = '';

  movements.forEach((m, i) => {
    const type = m > 0 && "deposit" || "withdrawal";
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">2 ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${m}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML("afterbegin", html);

  })
}

displayMovements(account1.movements)

const createuserNames=(accounts)=>{
  accounts.forEach(o=>o.userName=o.owner.toLowerCase().split(" ").map(n=>n[0]).join(""));
}
createuserNames(accounts)

const calDisplaybalance=function(movements){
  return movements.reduce((acc,mov)=>acc+mov);
}

labelBalance.textContent=`${calDisplaybalance(account1.movements)} EUR`;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


/////////////////////////////////////////////////

const movementsdescription = movements.map((m, i) => `Movement ${++i} you ${m > 0 && "deposited" || "withdrew"} ${Math.abs(m)}`);

const reducedMovements=movements.reduce((acc,curr)=> acc+curr,0);

const deposits=movements.filter(n=>n>0);
const withdrawals=movements.filter(n=>n<0);

// Challenge #2

// data set 1 [5,2,4,1,15,8,3]
// data set 2 [16,6,10,5,6,1,4]

const dogAgeToHumanAge=function(dogList){
  return dogList.map(a=>a<=2?a*2:16+(a*4)).filter(a=>a>=18).reduce((acc,a,i,arr)=>acc+a/arr.length);
}

console.log(dogAgeToHumanAge([5,2,4,1,15,8,3]));
console.log(dogAgeToHumanAge([16,6,10,5,6,1,4]));