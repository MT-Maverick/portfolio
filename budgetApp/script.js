//Total Balance
const BalanceEl = document.querySelector('.balance-value');

//Balance Values 
const Income_TotalEl = document.querySelector('.income-value');
const Expenses_TotalEl = document.querySelector('.expenses-value');

//Tab Buttons
const ExpenseBtn = document.querySelector('.Expense-Button'); 
const IncomeBtn = document.querySelector('.Income-Button'); 
const AllBtn = document.querySelector('.All-Button'); 

const ExpenseEl = document.querySelector('#Expenses'); 
const IncomeEl = document.querySelector('#Income'); 
const AllEl = document.querySelector('#All'); 

//List of transactions 
const ExpenseList = document.querySelector('.Expense-List'); 
const IncomeList = document.querySelector('.Income-List'); 
const AllList = document.querySelector('.All-List'); 

//Entery Commands 
const AddIncome = document.querySelector('.Income-Input'); 
const IncomeAmt = document.querySelector('#Income-Value-Amount'); 
const IncomeTxt = document.querySelector('#Income-Title-Input'); 
const AddExpense = document.querySelector('.Expense-Input'); 
const ExpenseAmt = document.querySelector('#Expense-Value-Amount'); 
const ExpenseTxt = document.querySelector('#Expense-Title-Input'); 

//Activating and Deactivating Toggle Btns** //incomeBtn(**Transitions**): 
IncomeBtn.addEventListener('click', function () { active(IncomeBtn); inactive([ExpenseBtn, AllBtn]); 
    show(IncomeEl); 
    hide([ExpenseEl, AllEl]); 
}); 

//ExpenseBtn(**Transitions**): 
ExpenseBtn.addEventListener('click', function () { active(ExpenseBtn); inactive([IncomeBtn, AllBtn]);
     show(ExpenseEl); 
     hide([IncomeEl, AllEl]); 
    }); 

    //AllBtn(**Transitions**): 
AllBtn.addEventListener('click', function () { active(AllBtn); inactive([ExpenseBtn, IncomeBtn]);
     show(AllEl);
      hide([ExpenseEl, IncomeEl]);
     }); 

// Display option funcion: 
function active(element) { element.classList.add('active');
 element.classList.remove('inactive'); } 

 //Shows the elements in the ledger:
 function show(element) { element.classList.remove('hide'); } 

 //Hides the ledger info: 
function hide(elements) { elements.forEach(element => { element.classList.add('hide'); }); } 

//Reduces the visibility of the button: 
function inactive(elements) { elements.forEach(element => { element.classList.remove('active');
 element.classList.add('inactive'); }); } 

 //Declerations for EnteryList: 
let ENTRY_LIST=[]; 
let Balance = 0, Income = 0, Expenses = 0; 
const Delete = "delete"; 

//AddIncome function: 
AddIncome.addEventListener('click', function () { if (!(IncomeTxt.value && IncomeAmt.value)) return;
let income = { type: "income", title: IncomeTxt.value, amount: parseFloat(IncomeAmt.value), };
ENTRY_LIST.push(income); ClearInput([IncomeTxt, IncomeAmt]); updateUI(); }); 

//AddExpense function: 
AddExpense.addEventListener('click', function () { if (!(ExpenseTxt.value && ExpenseAmt.value)) return;
let expense = { type: "expense", title: ExpenseTxt.value, amount: parseFloat(ExpenseAmt.value), };
ENTRY_LIST.push(expense); ClearInput([ExpenseTxt, ExpenseAmt]);
updateUI(); });

//List EditOrDelete Decleration: 
IncomeList.addEventListener('click',DeleteOrEdit);
ExpenseList.addEventListener('click',DeleteOrEdit);

//DeleteOrEdit Function: 
function DeleteOrEdit(icon){
const targetBtn = icon.target;
if (targetBtn.id=='delete') {
    const entry = targetBtn.parentNode;
    deleteEntry(entry);
}
}

//Delete Function: 
function deleteEntry(entry){ ENTRY_LIST.splice(entry.id,1); updateUI(); }

//Cleares the inputs in the arrays:
function ClearInput(Array) { Array.forEach(Input => { Input.value = ""; }); } 

//Calculates the toal balance for income and expenses: 
function calculateTotal(type, ENTRY_LIST) { let sum = 0; ENTRY_LIST.forEach(entry => { if (entry.type == type) { sum += entry.amount } }); return sum; } 

//Clears the HTML display of the inputs: 
function clearElement(Arrayelemnets) { Arrayelemnets.forEach((element) => { element.innerHTML = ""; }); } 

//Calculaes the total-balance: 
function calculateTotalBalance(Income, Expense) { return Income - Expense; } 

//Displays the entry list on the ledger book: 
function showEntry(list, type, title, amount, id) {
const entry = `<li id="${id}" class="${type}">
<div class="${type}-entry">${title} R${amount}</div>
<img id="delete" src="Delete.png">
</li>`;

 list.insertAdjacentHTML("afterbegin", entry); } 

//Declerations for Circle: 
const chartEl = document.querySelector('.Chart'); 
chartEl.width = 150; 
chartEl.height = 150;  
const ctx = chartEl.getContext('2d'); 
const R = 70; 
ctx.lineWidth = 10; 
//Function for implimenting the circle sketch: 
function DrawCircle(color, ratio, antclockwise) {
    ctx.strokeStyle = color; 
    ctx.beginPath(); 
    ctx.arc(chartEl.width / 2, chartEl.height / 2, R, 0, ratio * Math.PI * 2, antclockwise); ctx.stroke(); 
} 

//Updates the circle: 
function updateChart(Income, Expenses) { 
    ctx.clearRect(chartEl.width, chartEl.height,150,150); 
    let ratio = Income / (Income + Expenses); 
    DrawCircle("#00FF00", ratio, false); 
    DrawCircle("#FF0000", ratio-1, true); 
} 

//Updates the UI: 
function updateUI() { 

Income = calculateTotal('income', ENTRY_LIST);
Expenses = calculateTotal('expense', ENTRY_LIST); 
Balance = Math.abs(calculateTotalBalance(Income, Expenses)); 

let sign = (Income >= Expenses) ? "R" : "-R"; 
BalanceEl.innerHTML = `<div class="Tbal"><h2>${sign}${Balance}</h2></div>`; 
Income_TotalEl.innerHTML = `R${Income}`; 
Expenses_TotalEl.innerHTML = `R${Expenses}`; 

clearElement([IncomeList, ExpenseList, AllList]); 
ENTRY_LIST.forEach((entry, index) => { 
    if (entry.type == 'income') { showEntry(IncomeList, entry.type, entry.title, entry.amount, index); } 
else if (entry.type == 'expense') { showEntry(ExpenseList, entry.type, entry.title, entry.amount, index); } 
showEntry(AllList, entry.type, entry.title, entry.amount, index); }); 
updateChart(Income, Expenses); 
saveLedger(ENTRY_LIST);
}

function saveLedger(list){
    let incomeArr =[];
    let expenseArr =[];
    for (const i of list) {
        if(i.type == 'income'){incomeArr.push(i)}
        else{expenseArr.push(i)}
        localStorage.clear();
        localStorage.setItem("income",JSON.stringify(incomeArr));
        localStorage.setItem("expense",JSON.stringify(expenseArr));
        localStorage.setItem("all",JSON.stringify(incomeArr.concat(expenseArr)));
    }
}

window.onload=function () {
    console.log(localStorage.length);
    
    if (localStorage.length>0) {
        let Data = localStorage.getItem('all');
        let data=JSON.parse(Data);
               
        if (ENTRY_LIST.length==0||ENTRY_LIST.length>=0) {
            for (const i of data) {
                ENTRY_LIST.push(i);
            }
        }
    }
updateUI();
}