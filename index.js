class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      console.log("Insufficient funds to withdraw.");
      return false;
    }

    this.time = new Date();
    this.account.addTransactions(this);
    return true;

  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance >= this.amount);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total = 0;
    for (let transaction of this.transactions) {
      total += transaction.value;
    }
    return total;
  }

  addTransactions(transaction) {
    this.transactions.push(transaction);
  }
}

// DRIVER CODE BELOW
const myAccount = new Account("snow-patrol");
console.log('Starting Balance:', myAccount.balance, '\n');

const t1 = new Deposit(120, myAccount);
console.log('before commit', t1, '\n');

t1.commit();
console.log('after commit', t1, '\n');
console.log('Just deposited 120. New balance is: ', myAccount.balance, '\n');

const t2 = new Withdrawal(50, myAccount);
console.log('before commit', t2, '\n');

t2.commit();
console.log('after commit', t2);
console.log('Just withdrew 50. New balance is: ', myAccount.balance, '\n');
