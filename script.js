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

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = '';

  let movs = sort ? movements.slice().sort((a, b) => a - b) : movements;


  movs.forEach((m, i) => {
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


const calDisplaybalance = function (acc) {
  return acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
}


const createuserNames = (accounts) => {
  accounts.forEach(o => o.userName = o.owner.toLowerCase().split(" ").map(n => n[0]).join(""));
}
createuserNames(accounts)

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(m => m > 0).reduce((acc, m) => acc + m, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements.filter(m => m < 0).reduce((acc, m) => acc + m, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`

  const interest = acc.movements.filter(m => m > 0).map(m => m * acc.interestRate).filter(m => m >= 1).reduce((acc, m) => acc + m, 0);
  labelSumInterest.textContent = `${interest}€`
}

const updateUI = function (acc) {
  labelBalance.textContent = `${calDisplaybalance(acc)} €`;

  displayMovements(acc.movements);
  //display the summary
  calcDisplaySummary(acc);
}

let currentAccount;
btnLogin.addEventListener("click", e => {
  e.preventDefault();

  currentAccount = accounts.find(acc => inputLoginUsername.value === acc.userName);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(" ")[0]}`
    //display the ui
    containerApp.style.opacity = 1;

    //display the balance
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount)
  }
});

btnTransfer.addEventListener("click", e => {
  e.preventDefault();
  let receiverAccount = accounts.find(a => a.userName === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  if (amount > 0 && currentAccount.balance >= amount && receiverAccount && receiverAccount.userName !== currentAccount.userName) {
    currentAccount.movements.push(-amount)
    receiverAccount.movements.push(amount)

    inputTransferTo.value = inputTransferAmount.value = "";
    inputTransferAmount.blur();

    updateUI(currentAccount);
  }
})

btnLoan.addEventListener("click", e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(a => a > amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = ""
  }
})

btnClose.addEventListener("click", e => {
  e.preventDefault();
  // inputCloseUsername
  // inputClosePin

  const closingUserName = inputCloseUsername.value;
  const closingUserPin = Number(inputClosePin.value)
  if (currentAccount.userName === closingUserName && currentAccount.pin === closingUserPin) {
    const closingAccountIndex = accounts.findIndex(a => a.userName === closingUserName && a.pin === closingUserPin)
    containerApp.style.opacity = 0;
    accounts.splice(closingAccountIndex, 1);
    closingUserName = inputClosePin.value = "";
  }
})

let sorted = false;
btnSort.addEventListener("click", e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

// Array.from(document.querySelectorAll(".movements__value"), el => {
//   return el.textContent.replace("€", "");
// });

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

const reducedMovements = movements.reduce((acc, curr) => acc + curr, 0);

const deposits = movements.filter(n => n > 0);
const withdrawals = movements.filter(n => n < 0);

const calcAverageHumanAge = function (dogList) {
  return dogList.map(a => a <= 2 ? a * 2 : 16 + (a * 4)).filter(a => a >= 18).reduce((acc, a, i, arr) => acc + a / arr.length, 0);
}

const account = accounts.find(o => o.owner === "Jessica Davis");
// console.log(account);

// for (let a of Object.values(accounts)) {
//   if (a.owner === "Jessica Davis") {
//     console.log(a);
//   }
// }