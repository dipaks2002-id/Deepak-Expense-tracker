let transactions = JSON.parse(localStorage.getItem("data")) || [];

/* =========================
   ADD TRANSACTION
========================= */
function addTransaction() {
  let descInput = document.getElementById("desc");
  let amountInput = document.getElementById("amount");
  let typeInput = document.getElementById("type");
  let messageBox = document.getElementById("message");

  let desc = descInput.value.trim();
  let amount = parseFloat(amountInput.value);
  let type = typeInput.value;

  // Validation
  if (!desc || isNaN(amount)) {
    alert("Please enter valid description and amount.");
    return;
  }

  let transaction = {
    id: Date.now(),
    desc: desc,
    amount: amount,
    type: type,
    date: new Date().toISOString()  // safer format
  };

  transactions.push(transaction);

  localStorage.setItem("data", JSON.stringify(transactions));

  // Motivational message
  if (type === "expense") {
    messageBox.innerText = "No worries, you will earn more 💪";
  } else {
    messageBox.innerText = "Yay, you worked for it, never stop 🚀";
  }

  setTimeout(() => {
    messageBox.innerText = "";
  }, 3000);

  // Clear inputs
  descInput.value = "";
  amountInput.value = "";

  render();
}


/* =========================
   DELETE TRANSACTION
========================= */
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("data", JSON.stringify(transactions));
  render();
}


/* =========================
   RENDER FUNCTION
========================= */
function render() {
  let list = document.getElementById("list");
  let balanceElement = document.getElementById("balance");
  let profitElement = document.getElementById("monthlyProfit");

  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {

    let li = document.createElement("li");

    let formattedDate = new Date(t.date).toLocaleDateString("en-IN", {
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

    if (t.type === "income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
    }
  });

  let balance = income - expense;
  balanceElement.innerText = balance;


  /* =========================
     MONTHLY PROFIT
  ========================= */

  let now = new Date();
  let monthlyIncome = 0;
  let monthlyExpense = 0;

  transactions.forEach(t => {
    let d = new Date(t.date);

    if (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    ) {
      if (t.type === "income") {
        monthlyIncome += Number(t.amount);
      } else {
        monthlyExpense += Number(t.amount);
      }
    }
  });

  let monthlyProfit = monthlyIncome - monthlyExpense;

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


/* =========================
   INITIAL LOAD
========================= */
render();