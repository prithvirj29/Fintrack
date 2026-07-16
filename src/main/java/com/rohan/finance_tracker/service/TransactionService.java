package com.rohan.finance_tracker.service;

import com.rohan.finance_tracker.dto.DashboardResponse;
import com.rohan.finance_tracker.dto.TransactionRequest;
import com.rohan.finance_tracker.entity.Transaction;
import com.rohan.finance_tracker.entity.User;
import com.rohan.finance_tracker.repository.TransactionRepository;
import com.rohan.finance_tracker.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.rohan.finance_tracker.dto.DashboardResponse;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository,
                              UserRepository userRepository) {

        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

public String addTransaction(TransactionRequest request) {

    System.out.println("Step 1");

    User user = userRepository.findById(1L).orElseThrow();

    System.out.println("Step 2");

    Transaction transaction = Transaction.builder()
            .title(request.getTitle())
            .amount(request.getAmount())
            .type(request.getType())
            .category(request.getCategory())
            .date(request.getDate())
            .description(request.getDescription())
            .user(user)
            .build();

    System.out.println("Step 3");

    transactionRepository.save(transaction);

    System.out.println("Step 4");

    return "Transaction Added Successfully";
}

public List<Transaction> getAllTransactions() {

    User user = userRepository.findById(1L).orElseThrow();

    return transactionRepository.findByUser(user);

}
public String deleteTransaction(Long id) {

    transactionRepository.deleteById(id);

    return "Transaction Deleted Successfully";
}

public String updateTransaction(Long id, TransactionRequest request) {

    Transaction transaction = transactionRepository.findById(id)
            .orElseThrow();

    transaction.setTitle(request.getTitle());
    transaction.setAmount(request.getAmount());
    transaction.setType(request.getType());
    transaction.setCategory(request.getCategory());
    transaction.setDate(request.getDate());
    transaction.setDescription(request.getDescription());

    transactionRepository.save(transaction);

    return "Transaction Updated Successfully";
}
public DashboardResponse getDashboard() {

    User user = userRepository.findById(1L).orElseThrow();

    List<Transaction> transactions = transactionRepository.findByUser(user);

    double income = 0;
    double expense = 0;

    for (Transaction t : transactions) {

        if (t.getType().name().equals("INCOME")) {
            income += t.getAmount();
        } else {
            expense += t.getAmount();
        }
    }

    return new DashboardResponse(
            income,
            expense,
            income - expense
    );
    
}
public List<Transaction> exportTransactions() {

    User user = userRepository.findById(1L).orElseThrow();

    return transactionRepository.findByUser(user);
}
}