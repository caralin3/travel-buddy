package com.example.travelbuddybackend.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.util.Date;

public class ErrorResponse<T> {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private Date timestamp;
    private int code;
    private String status;
    private String message;
    private String stackTrace;
    private T data;

    public ErrorResponse() {
        timestamp = new Date();
    }

    public ErrorResponse(HttpStatus httpStatus, String message) {
        this();
        this.code = httpStatus.value();
        this.status = httpStatus.name();
        this.message = message;
    }

    public ErrorResponse(HttpStatus httpStatus, String message, String stackTrace) {
        this(httpStatus, message);
        this.stackTrace = stackTrace;
    }

    public ErrorResponse(HttpStatus httpStatus, String message, T data) {
        this(httpStatus, message);
        this.data = data;
    }

    public ErrorResponse(HttpStatus httpStatus, String message, String stackTrace, T data) {
        this(httpStatus, message, stackTrace);
        this.data = data;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
