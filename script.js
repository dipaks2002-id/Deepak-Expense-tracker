let transactions = JSON.parse(localStorage.getItem("data")) || [];

function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if(desc === "" || amount === "") return;

  let transaction = {
    id: Date.now(),
    desc,
    amount: parseFloat(amount),
    type,
    date: new Date()
  };

  transactions.push(transaction);
  let msg = document.getElementById("message");

if (type === "expense") {
  msg.innerText = "No worries, you will earn more 💪";
} else {
  msg.innerText = "Yay, you worked for it, never stop 🚀";
}

setTimeout(() => {
  msg.innerText = "";
}, 3000);
  localStorage.setItem("data", JSON.stringify(transactions));
  render();
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {

    let li = document.createElement("li");

    let formattedDate = new Date(t.date || Date.now()).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    li.innerHTML = `
      <div>
        <strong>${t.desc}</strong><br>
        ₹${t.amount}<br>
        <small>${formattedDate}</small>
      </div>
      <button class="delete" onclick="deleteTransaction(${t.id})">X</button>
    `;

    list.appendChild(li);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  let balance = income - expense;
  document.getElementById("balance").innerText = balance;

  // Monthly Profit
  let now = new Date();
  let monthlyIncome = 0;
  let monthlyExpense = 0;

  transactions.forEach(t => {
    let d = new Date(t.date || Date.now());
    if (d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()) {

      if (t.type === "income") monthlyIncome += t.amount;
      else monthlyExpense += t.amount;
    }
  });

  let monthlyProfit = monthlyIncome - monthlyExpense;
  let profitElement = document.getElementById("monthlyProfit");

  if (profitElement) {
    profitElement.innerText = monthlyProfit;

    if (monthlyProfit >= 0) {
      profitElement.classList.remove("negative");
      profitElement.classList.add("positive");
    } else {
      profitElement.classList.remove("positive");
      profitElement.classList.add("negative");
    }
  }
}
render();
