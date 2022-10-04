import { v4 } from 'uuid';
export class BankAccount {
  private _balance = 5000;
  private _transactions: Transaction[] = [];
  constructor(public name: NameInfo) {}
  get balance() {
    return this._balance;
  }

  getLastTransaction(): Transaction | undefined {
    return this._transactions[0];
  }
  deposit(amount: number): void {
    const newBalance = this._balance + amount;
    const tx: Transaction = {
      id: 'TX' + v4(),
      amountOfTransaction: amount,
      balanceBeforeTransaction: this._balance,
      balanceAfterTransaction: newBalance,
      type: 'deposit',
      posted: new Date().toISOString(),
    };
    this._balance = newBalance;
    this._transactions = [tx, ...this._transactions];
  }
  withdraw(amount: number): void {
    const newBalance = this._balance - amount;
    const tx: Transaction = {
      id: 'TX' + v4(),
      amountOfTransaction: amount,
      balanceBeforeTransaction: this._balance,
      balanceAfterTransaction: newBalance,
      type: 'withdrawal',
      posted: new Date().toISOString(),
    };
    this._balance = newBalance;
    this._transactions = [tx, ...this._transactions];
  }
}

interface NameInfo {
  first: string;
  last: string;
  mi?: string;
}

export interface Transaction {
  readonly id: string;
  readonly type: 'deposit' | 'withdrawal';
  readonly amountOfTransaction: number;
  readonly balanceBeforeTransaction: number;
  readonly balanceAfterTransaction: number;
  readonly posted: string; // An ISO-8601 string of the date and time of the transaction
}
