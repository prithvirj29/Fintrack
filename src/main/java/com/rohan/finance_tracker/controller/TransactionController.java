package com.rohan.finance_tracker.controller;

import com.rohan.finance_tracker.dto.DashboardResponse;
import com.rohan.finance_tracker.dto.TransactionRequest;
import com.rohan.finance_tracker.entity.Transaction;
import com.rohan.finance_tracker.service.TransactionService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;
import com.rohan.finance_tracker.dto.DashboardResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("*")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @PostMapping
    public String addTransaction(@RequestBody TransactionRequest request) {
        return service.addTransaction(request);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return service.getAllTransactions();
    }

    @PutMapping("/{id}")
    public String updateTransaction(@PathVariable Long id,
                                    @RequestBody TransactionRequest request) {

        return service.updateTransaction(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {

        return service.deleteTransaction(id);
    }
    @GetMapping("/dashboard")
public DashboardResponse dashboard() {
    return service.getDashboard();
}
@GetMapping("/export")
public void exportCsv(HttpServletResponse response) throws IOException {

    response.setContentType("text/csv");
    response.setHeader("Content-Disposition",
            "attachment; filename=transactions.csv");

    PrintWriter writer = response.getWriter();

    writer.println("Title,Amount,Type,Category,Date,Description");

    List<Transaction> transactions = service.getAllTransactions();

    for (Transaction t : transactions) {

        writer.println(
                t.getTitle() + "," +
                t.getAmount() + "," +
                t.getType() + "," +
                t.getCategory() + "," +
                t.getDate() + "," +
                t.getDescription()
        );
    }

    writer.flush();
}
}