package com.rohan.finance_tracker.dto;

import com.rohan.finance_tracker.entity.Category;
import com.rohan.finance_tracker.entity.TransactionType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionRequest {

    private String title;

    private Double amount;

    private TransactionType type;

    private Category category;

    private LocalDate date;

    private String description;

}