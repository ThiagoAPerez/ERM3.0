package com.elrapidin.api.exception;

public class NotFoundException extends ApiException {

    public NotFoundException(String message) {
        super(message);
    }

    @Override
    public int getStatus() {
        return 404;
    }
}
