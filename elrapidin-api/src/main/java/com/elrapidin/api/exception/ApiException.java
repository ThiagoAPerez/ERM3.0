package com.elrapidin.api.exception;

public class ApiException extends RuntimeException {

    private final int status;

    public ApiException(String message) {
        super(message);
        this.status = 400; // default
    }

    public ApiException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
