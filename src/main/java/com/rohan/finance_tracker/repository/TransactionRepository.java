package com.rohan.finance_tracker.repository;

import com.rohan.finance_tracker.entity.Transaction;
import com.rohan.finance_tracker.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {


    // Get all transactions belonging to a user

    List<Transaction> findByUser(
            User user
    );


    // Find transaction only when
    // transaction ID AND user match

    Optional<Transaction> findByIdAndUser(
            Long id,
            User user
    );

}