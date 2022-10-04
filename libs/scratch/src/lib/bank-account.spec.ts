import { BankAccount, Transaction } from './banking/bank-account';
import * as uuid from 'uuid';
describe('The Bank Account', () => {
  describe('What a new Account Looks Like', () => {
    let account: BankAccount;

    beforeEach(() => {
      account = new BankAccount({ first: 'Joe', last: 'Schmidt' });
    });
    it('has name information', () => {
      // expect(account.name.first).toBe('Joe');
      // expect(account.name.last).toBe('Schmidt');

      expect(account.name).toEqual({
        first: 'Joe',
        last: 'Schmidt',
        mi: undefined,
      });
    });
    it('has the default opening balance', () => {
      expect(account.balance).toEqual(5000);
    });
  });

  describe('Banking Transactions', () => {
    let account: BankAccount;

    beforeEach(() => {
      account = new BankAccount({ first: 'Joe', last: 'Schmidt' });
    });
    describe('Making Deposits', () => {
      it('increases the balance with a deposit', () => {
        const openingBalance = account.balance;
        const amountToDeposit = 100;

        account.deposit(amountToDeposit);

        expect(account.balance).toEqual(openingBalance + amountToDeposit);
      });
    });

    describe('Making Withdrawals', () => {
      it('decreases the balance when you withdraw', () => {
        const openingBalance = account.balance;
        const amountToWithdraw = 100;

        account.withdraw(amountToWithdraw);

        expect(account.balance).toEqual(openingBalance - amountToWithdraw);
      });
    });
  });

  describe('The Transaction Log', () => {
    it('Logs Deposits', () => {
      // given
      const NOW = '1969-04-20T23:59:00.838Z';
      const mockedNow = new Date(NOW);
      jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockedNow as unknown as string);

      jest.spyOn(uuid, 'v4').mockReturnValue('867-5309');

      const account = new BankAccount({ first: 'Joe', last: 'Schmidt' });
      const amountOfDeposit = 42.23;
      const openingBalnce = account.balance;

      // when
      account.deposit(amountOfDeposit);
      // then
      const tx = account.getLastTransaction();
      const expected: Transaction = {
        id: 'TX867-5309',
        type: 'deposit',
        amountOfTransaction: amountOfDeposit,
        balanceBeforeTransaction: openingBalnce,
        balanceAfterTransaction: openingBalnce + amountOfDeposit,
        posted: NOW,
      };
      expect(tx).toEqual(expected);
      // tx.amountOfTransaction = 100_000;
      expect(account.getLastTransaction()?.amountOfTransaction).toEqual(
        amountOfDeposit
      );
    });
    it('What if there are no transactions', () => {
      const account = new BankAccount({ first: 'Joe', last: 'Schmidt' });

      const lastTranaction = account.getLastTransaction();
      if (lastTranaction !== undefined) {
        expect(lastTranaction.type).toBe('deposit');
      } else {
        expect(lastTranaction).toBe(undefined);
      }
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
