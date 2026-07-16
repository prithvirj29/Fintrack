package com.rohan.finance_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private Double totalIncome;
    private Double totalExpense;
    private Double balance;

}