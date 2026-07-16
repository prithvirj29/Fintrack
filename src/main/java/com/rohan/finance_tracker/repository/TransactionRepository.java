package com.rohan.finance_tracker.repository;

import com.rohan.finance_tracker.entity.Transaction;
import com.rohan.finance_tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUser(User user);

}