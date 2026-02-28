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
    type
  };

  transactions.push(transaction);
  localStorage.setItem("data", JSON.stringify(transactions));
  render();
}

function render() {
  let list = document.getElementById("list");
  let balance = 0;
  list.innerHTML = "";

  transactions.forEach(t => {
    let li = document.createElement("li");
    li.innerText = t.desc + " - ₹" + t.amount;
    list.appendChild(li);

    if(t.type === "income") balance += t.amount;
    else balance -= t.amount;
  });

  document.getElementById("balance").innerText = balance;
}

render();
