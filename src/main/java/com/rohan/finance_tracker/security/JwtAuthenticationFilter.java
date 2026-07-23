package com.rohan.finance_tracker.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;


@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {


    private final JwtService jwtService;


    public JwtAuthenticationFilter(
            JwtService jwtService
    ) {

        this.jwtService = jwtService;
    }


    @Override
    protected void doFilterInternal(

            HttpServletRequest request,

            HttpServletResponse response,

            FilterChain filterChain

    ) throws ServletException, IOException {


        // ======================================
        // 1. GET AUTHORIZATION HEADER
        // ======================================

        String authorizationHeader =
                request.getHeader(
                        "Authorization"
                );

        // Temporary debugging
        System.out.println(
                "===================================================="
        );
        System.out.println(
                "Authorization Header = " + authorizationHeader
        );


        // ======================================
        // 2. CHECK WHETHER BEARER TOKEN EXISTS
        // ======================================

        if (
                authorizationHeader == null
                        ||
                !authorizationHeader
                        .startsWith("Bearer ")
        ) {

            // Temporary debugging
            System.out.println(
                    "No Bearer token found on request. Skipping JWT authentication."
            );

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // ======================================
        // 3. REMOVE "Bearer " FROM TOKEN
        // ======================================

        String token =
                authorizationHeader
                        .substring(7);


        try {

            // Temporary debugging
            boolean tokenValid =
                    jwtService
                            .isTokenValid(token);

            System.out.println(
                    "Token exists = true, Token valid = " + tokenValid
            );

            // ==================================
            // 4. VALIDATE JWT
            // ==================================

            if (
                    tokenValid
            ) {


                // ==============================
                // 5. EXTRACT EMAIL
                // ==============================

                String email =
                        jwtService
                                .extractEmail(token);


                // Temporary debugging

                System.out.println(
                        "JWT EMAIL = " + email
                );


                // ==============================
                // 6. CREATE AUTHENTICATION
                // ==============================

                UsernamePasswordAuthenticationToken
                        authentication =

                        new UsernamePasswordAuthenticationToken(

                                email,

                                null,

                                Collections.singletonList(

                                        new SimpleGrantedAuthority(
                                                "ROLE_USER"
                                        )

                                )

                        );


                // ==============================
                // 7. PUT USER INTO
                //    SPRING SECURITY CONTEXT
                // ==============================

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(
                                authentication
                        );

                // Temporary debugging
                System.out.println(
                        "Authentication set in SecurityContext = "
                                + SecurityContextHolder
                                        .getContext()
                                        .getAuthentication()
                );

            } else {

                // Temporary debugging
                System.out.println(
                        "Token validation failed. Authentication NOT set."
                );

            }


        } catch (Exception e) {

            System.out.println(
                    "JWT Authentication Error: "
                            + e.getMessage()
            );

            e.printStackTrace();

        }


        // ======================================
        // 8. CONTINUE REQUEST
        // ======================================

        filterChain.doFilter(
                request,
                response
        );

    }
}