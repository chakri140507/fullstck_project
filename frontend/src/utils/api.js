const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/login`,
    SOCIAL_LOGIN: `${API_BASE_URL}/api/auth/social-login`,
    REGISTER: `${API_BASE_URL}/api/register`,
    JOBS: `${API_BASE_URL}/api/jobs`,
    APPLICATIONS: `${API_BASE_URL}/api/applications`,
    USERS: `${API_BASE_URL}/api/users`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/forgot-password`,
    OTP_SEND: `${API_BASE_URL}/api/otp/send`,
    OTP_SEND_FORGOT: `${API_BASE_URL}/api/otp/send-forgot-password`,
    VERIFY_OTP: `${API_BASE_URL}/api/verify-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/api/reset-password`,
    ADMIN: `${API_BASE_URL}/api/admin`,
    STUDENT: `${API_BASE_URL}/api/student`,
};

export const fetchWithBase = async (endpoint, options = {}) => {
    const response = await fetch(endpoint, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    return response;
};
