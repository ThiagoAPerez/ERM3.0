package com.elrapidin.api.exception;

public class UnauthorizedException extends ApiException {

    public UnauthorizedException(String message) {
        super(message);
    }

    @Override
    public int getStatus() {
        return 401;
    }
}
