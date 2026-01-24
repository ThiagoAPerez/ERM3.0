package com.elrapidin.api.util;

import java.security.SecureRandom;

public final class DeliveryCodeGenerator {

    private static final SecureRandom RANDOM = new SecureRandom();

    private DeliveryCodeGenerator() {}

    public static String generate6Digits() {
        int number = RANDOM.nextInt(900_000) + 100_000; // 100000–999999
        return String.valueOf(number);
    }
}
