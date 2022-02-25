package com.example.travelbuddybackend.api;

import com.example.travelbuddybackend.api.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;

import java.io.PrintWriter;
import java.io.StringWriter;

@ControllerAdvice
public class RestControllerAdvice {

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponse> handleNullPointerExceptions(
            Exception e
    ) {
        HttpStatus status = HttpStatus.NOT_FOUND; // 404
        return new ResponseEntity<>(
                new ErrorResponse(status, e.getMessage()),
                status
        );
    }

    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
    public ResponseEntity<ErrorResponse> handleBadRequestExceptions(
            Exception e
    ) {
        HttpStatus status = HttpStatus.BAD_REQUEST; // 400
        return new ResponseEntity<>(
                new ErrorResponse(status, e.getMessage()),
                status
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialExceptions(
            Exception e
    ) {
        HttpStatus status = HttpStatus.UNAUTHORIZED; // 401
        return new ResponseEntity<>(
                new ErrorResponse(status, "Email or password is incorrect."),
                status
        );
    }

    @ExceptionHandler(HttpClientErrorException.Unauthorized.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedRequestExceptions(
            Exception e
    ) {
        HttpStatus status = HttpStatus.UNAUTHORIZED; // 401
        return new ResponseEntity<>(
                new ErrorResponse(status, e.getMessage()),
                status
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleExceptions(
            Exception e
    ) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR; // 500

        // converting the stack trace to String
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        e.printStackTrace(printWriter);
        String stackTrace = stringWriter.toString();

        return new ResponseEntity<>(
                new ErrorResponse(status, e.getMessage(), stackTrace),
                status
        );
    }
}
