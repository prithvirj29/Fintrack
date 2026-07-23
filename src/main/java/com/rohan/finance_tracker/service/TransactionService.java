package com.rohan.finance_tracker.service;

import com.rohan.finance_tracker.dto.DashboardResponse;
import com.rohan.finance_tracker.dto.TransactionRequest;
import com.rohan.finance_tracker.entity.Transaction;
import com.rohan.finance_tracker.entity.User;
import com.rohan.finance_tracker.repository.TransactionRepository;
import com.rohan.finance_tracker.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;


    // ==========================================
    // CONSTRUCTOR DEPENDENCY INJECTION
    // ==========================================

    public TransactionService(
            TransactionRepository transactionRepository,
            UserRepository userRepository
    ) {

        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }


    // ==========================================
    // GET CURRENT LOGGED-IN USER
    // ==========================================

private User getCurrentUser() {

    Authentication authentication =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    System.out.println(
            "======================================"
    );

    // Temporary debugging
    System.out.println(
            "AUTHENTICATION OBJECT = " + authentication
    );

    if (authentication != null) {

        // Temporary debugging
        System.out.println(
                "AUTHENTICATION IS AUTHENTICATED = "
                        + authentication.isAuthenticated()
        );

        System.out.println(
                "AUTHENTICATION PRINCIPAL = "
                        + authentication.getPrincipal()
        );
    }

    if (authentication == null) {
        throw new RuntimeException(
                "Authentication is null"
        );
    }

    String email = authentication.getName();

    System.out.println(
            "AUTHENTICATED EMAIL = " + email
    );

    boolean userExists = userRepository
            .findByEmail(email)
            .isPresent();

    // Temporary debugging
    System.out.println(
            "USER FOUND IN DATABASE = " + userExists
    );

    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Authenticated user not found: " + email
                    )
            );

    System.out.println(
            "CURRENT USER ID = " + user.getId()
    );

    System.out.println(
            "CURRENT USER EMAIL = " + user.getEmail()
    );

    System.out.println(
            "======================================"
    );

    return user;
}


    // ==========================================
    // ADD TRANSACTION
    // ==========================================

    public String addTransaction(
            TransactionRequest request
    ) {

        User user = getCurrentUser();

        Transaction transaction =
                Transaction.builder()

                        .title(
                                request.getTitle()
                        )

                        .amount(
                                request.getAmount()
                        )

                        .type(
                                request.getType()
                        )

                        .category(
                                request.getCategory()
                        )

                        .date(
                                request.getDate()
                        )

                        .description(
                                request.getDescription()
                        )

                        .user(user)

                        .build();


        transactionRepository.save(
                transaction
        );


        return "Transaction Added Successfully";
    }


    // ==========================================
    // GET ALL TRANSACTIONS
    // ==========================================

    public List<Transaction> getAllTransactions() {

        User user = getCurrentUser();

        return transactionRepository
                .findByUser(user);
    }


    // ==========================================
    // DELETE TRANSACTION
    // ==========================================

    public String deleteTransaction(Long id) {

        User user = getCurrentUser();

        Transaction transaction =
                transactionRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Transaction not found or you do not have permission to delete it"
                                )
                        );


        transactionRepository.delete(
                transaction
        );


        return "Transaction Deleted Successfully";
    }


    // ==========================================
    // UPDATE TRANSACTION
    // ==========================================

    public String updateTransaction(
            Long id,
            TransactionRequest request
    ) {

        User user = getCurrentUser();


        Transaction transaction =
                transactionRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Transaction not found or you do not have permission to update it"
                                )
                        );


        transaction.setTitle(
                request.getTitle()
        );

        transaction.setAmount(
                request.getAmount()
        );

        transaction.setType(
                request.getType()
        );

        transaction.setCategory(
                request.getCategory()
        );

        transaction.setDate(
                request.getDate()
        );

        transaction.setDescription(
                request.getDescription()
        );


        transactionRepository.save(
                transaction
        );


        return "Transaction Updated Successfully";
    }


    // ==========================================
    // DASHBOARD
    // ==========================================

    public DashboardResponse getDashboard() {

        User user = getCurrentUser();


        List<Transaction> transactions =
                transactionRepository
                        .findByUser(user);


        double income = 0;

        double expense = 0;


        for (Transaction transaction : transactions) {

            if (
                    transaction
                            .getType()
                            .name()
                            .equals("INCOME")
            ) {

                income +=
                        transaction.getAmount();

            } else if (
                    transaction
                            .getType()
                            .name()
                            .equals("EXPENSE")
            ) {

                expense +=
                        transaction.getAmount();
            }
        }


        double balance =
                income - expense;


        return new DashboardResponse(
                income,
                expense,
                balance
        );
    }


    // ==========================================
    // EXPORT TRANSACTIONS
    // ==========================================

    public List<Transaction> exportTransactions() {

        User user = getCurrentUser();


        return transactionRepository
                .findByUser(user);
    }

}