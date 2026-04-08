package com.example.studentplacement.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OTPService {

    private final Map<String, OTPEntry> otpCache = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public String generateOTP(String email) {
        String code = String.format("%06d", random.nextInt(1000000));
        otpCache.put(email, new OTPEntry(code, LocalDateTime.now().plusMinutes(5)));
        return code;
    }

    public boolean validateOTP(String email, String code) {
        if (!otpCache.containsKey(email)) {
            return false;
        }

        OTPEntry entry = otpCache.get(email);
        if (entry.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpCache.remove(email);
            return false;
        }

        boolean isValid = entry.getCode().equals(code);
        if (isValid) {
            otpCache.remove(email); // One-time use
        }
        return isValid;
    }

    private static class OTPEntry {
        private final String code;
        private final LocalDateTime expiryTime;

        public OTPEntry(String code, LocalDateTime expiryTime) {
            this.code = code;
            this.expiryTime = expiryTime;
        }

        public String getCode() { return code; }
        public LocalDateTime getExpiryTime() { return expiryTime; }
    }
}
