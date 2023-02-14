import { Component } from '@angular/core';
import { Account } from './interfaces/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  accounts: Account[] = [];
  errorMessage = '';
  name = '';
  toId = 0;
  fromId = 0;
  transferedBalance = 0;
  deposit = 0;

  addAccount(name: string, deposit: number): void {
    this.errorMessage = '';
    if (deposit < 0) {
      this.errorMessage = 'Deposit amount must be non-negative.';
      return;
    }

    const newAccount: Account = {
      id: this.accounts.length + 1,
      name,
      balance: deposit
    };
    this.accounts.push(newAccount);
    this.name = '';
    this.deposit = 0;
  }

  transferMoney(fromId: number, toId: number): void {
    this.errorMessage = '';
    if (fromId <= 0 || toId <= 0) {
      this.errorMessage = 'Account IDs must be positive numbers.';
      return;
    }

    const fromAccount = this.accounts.find(acc => acc.id === fromId);
    const toAccount = this.accounts.find(acc => acc.id === toId);

    if (!fromAccount || !toAccount) {
      this.errorMessage = 'One or more accounts do not exist.';
      return;
    }

    if (fromAccount.balance < this.transferedBalance) {
      this.errorMessage = 'Source account does not have enough money.';
      return;
    }

    fromAccount.balance -= this.transferedBalance;
    toAccount.balance += this.transferedBalance;

    this.fromId = 0;
    this.toId = 0;
    this.transferedBalance = 0;
  }

  deleteAccount(id: number): void {
    const index = this.accounts.findIndex(acc => acc.id === id);
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }
}
