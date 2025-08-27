package com.bank.management.model;

import java.util.Date;

public class Transaction {
    private Long id;
    private String type;
    private Double amount;
    private Date date;
    private Long accountId;

    public Transaction(String type, Double amount, Long accountId) {
        this.type = type;
        this.amount = amount;
        this.accountId = accountId;
        this.date = new Date();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }
}
