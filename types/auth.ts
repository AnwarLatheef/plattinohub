export interface Customer {
    id: string;
    name: string;
    phone: string;
    phoneVerified: boolean;
    email?: string;
    emailVerified: boolean;
    
}

export interface AuthSession {
    accessToken: string;
    customer: Customer;
    expiresAt: string;
}

export interface LoginRequest {
    phone: string;
    password: string;
}

export interface OtpRequest {
    phone: string;
}

export type PhoneVerificationPurpose =
    | "registration"
    | "change-phone"
    | "password-reset";

export interface OtpVerification {
    phone: string;
    otp: string;
    purpose: PhoneVerificationPurpose;
}

export interface RegisterRequest {
    name: string;
    phone: string;
    email?: string;
    password: string;
}

export interface PendingRegistration {
    name: string;
    phone: string;
    email?: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    session?: AuthSession;
}

export interface EmailVerificationRequest {
    email: string;
}

export interface EmailVerification {
    email: string;
    code: string;
}

export interface ChangePhoneRequest {
    phone: string;
}

export interface ChangeEmailRequest {
    email: string;
}