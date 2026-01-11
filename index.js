let all_trans = [];

const tran_form = document.getElementById("transactionForm");
const tran_list = document.getElementById("transactionList");

const totalBal = document.getElementById("totalBalance");
const totalInc = document.getElementById("totalIncome");
const totalExp = document.getElementById("totalExpense");

const updateList = (type, amount, date, category) => {
  const itemEl = document.createElement("li");
  const iconEl = document.createElement("div");
  const detailEl = document.createElement("div");
  const nameEl = document.createElement("div");
  const dateEl = document.createElement("div");
  const amountEl = document.createElement("div");
  const buttonEl = document.createElement("button");

  itemEl.classList.add("transaction-item");
  iconEl.classList.add("transaction-icon");
  detailEl.classList.add("transaction-details");
  nameEl.classList.add("transaction-name");
  dateEl.classList.add("transaction-date");
  amountEl.classList.add("transaction-amount");
  buttonEl.classList.add("transaction-delete");

  iconEl.innerText = type === "Income" ? "↑" : "↓";
  iconEl.classList.add(type === "Income" ? "income" : "expense");

  nameEl.innerText = category;
  nameEl.style.textTransform = "capitalize";
  dateEl.innerText = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  amountEl.innerText = (type === "Income" ? "+" : "-") + "$" + amount;
  amountEl.classList.add(type === "Income" ? "income" : "expense");

  buttonEl.innerText = "x";

  buttonEl.addEventListener("click", deleteTrans);

  detailEl.appendChild(nameEl);
  detailEl.appendChild(dateEl);
  itemEl.appendChild(iconEl);
  itemEl.appendChild(detailEl);
  itemEl.appendChild(amountEl);
  itemEl.appendChild(buttonEl);

  tran_list.prepend(itemEl);
};

const deleteTrans = (e) => {
  const btn = e.currentTarget;
  const element = btn.closest(".transaction-item");
  const index = Array.from(tran_list.children).indexOf(element);
  all_trans.splice(index, 1);
  updateBal();
  element.remove();
};

const updateBal = () => {
  let income = 0;
  let expense = 0;
  let balance = 0;

  all_trans.map((trans) => {
    if (trans.type === "Income") {
      income += parseFloat(trans.amount);
      balance += parseFloat(trans.amount);
    } else {
      expense += parseFloat(trans.amount);
      balance -= parseFloat(trans.amount);
    }
  });

  totalBal.innerText = "$" + balance;
  totalInc.innerText = "$" + income;
  totalExp.innerText = "$" + expense;
};

tran_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = e.target.type.value;
  const amount = e.target.amount.value;
  const date = e.target.date.value;
  const category = e.target.category.value;

  console.log(type, amount, date, category);
  updateList(type, amount, date, category);
  all_trans.unshift({ type, amount, date, category });
  updateBal();
  tran_form.reset();
});
