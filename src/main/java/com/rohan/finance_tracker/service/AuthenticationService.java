package com.rohan.finance_tracker.service;

import com.rohan.finance_tracker.dto.LoginRequest;
import com.rohan.finance_tracker.dto.LoginResponse;
import com.rohan.finance_tracker.entity.User;
import com.rohan.finance_tracker.repository.UserRepository;
import com.rohan.finance_tracker.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder encoder,
                                 JwtService jwtService) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token);
    }
}