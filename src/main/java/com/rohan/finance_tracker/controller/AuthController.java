package com.rohan.finance_tracker.controller;

import com.rohan.finance_tracker.dto.LoginRequest;
import com.rohan.finance_tracker.dto.LoginResponse;
import com.rohan.finance_tracker.dto.RegisterRequest;
import com.rohan.finance_tracker.service.AuthenticationService;
import com.rohan.finance_tracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;
    private final AuthenticationService authenticationService;

    public AuthController(UserService userService,
                          AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authenticationService.login(request);
    }
}