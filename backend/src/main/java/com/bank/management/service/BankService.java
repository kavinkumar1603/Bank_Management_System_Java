package com.bank.management.service;

import com.bank.management.model.Account;
import com.bank.management.model.Transaction;
import java.util.ArrayList;
import java.util.List;

public class BankService {
    private Account account;
    private List<Transaction> transactions;

    public BankService() {
        this.account = new Account();
        this.transactions = new ArrayList<>();
    }

    public synchronized boolean deposit(Double amount) {
        if (amount <= 0) {
            return false;
        }

        account.setBalance(account.getBalance() + amount);
        transactions.add(new Transaction("DEPOSIT", amount, account.getId()));
        return true;
    }

    public synchronized boolean withdraw(Double amount) {
        if (amount <= 0 || amount > account.getBalance()) {
            return false;
        }

        account.setBalance(account.getBalance() - amount);
        transactions.add(new Transaction("WITHDRAW", amount, account.getId()));
        return true;
    }

    public Double getBalance() {
        return account.getBalance();
    }

    public List<Transaction> getTransactions() {
        return new ArrayList<>(transactions);
    }
}
