import authData from "@/mock/auth.json";
import type {
    AuthResponse,
    AuthSession,
    ChangeEmailRequest,
    ChangePhoneRequest,
    LoginRequest,
    RegisterRequest,
    PendingRegistration,
} from "@/types/auth";


let pendingRegistration: PendingRegistration | null = null;

export function getPendingRegistration(): PendingRegistration | null {
    return pendingRegistration;
}

function createMockSession(): AuthSession {
    return {
        accessToken: "mock-access-token",
        customer: authData.customer,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    };
}

export async function login(data: LoginRequest): Promise<AuthResponse> {

    if (!data.phone){
        return {
            success:false,
            message: "Phone number is required"
        };
    }

    if (!data.password) {
        return {
            success: false,
            message: "Password is required."
        };
    }

    if (
        data.phone !== authData.customer.phone || data.password !== authData.password
    ) {
        return{
            success: false,
            message: "Invalid phone number or password.",
        };
    }

    return {
        success: true,
        message: "Login successful.",
        session: createMockSession(),
    };
    
}

export async function requestPhoneOtp(
    phone: string, 
): Promise<AuthResponse> {

    if (!phone) {
        return {
            success:false,
            message: "Phone number is required.",
        };
    }

    return {
        success: true,
        message: "OTP sent successfully.",
    };
    
}

export async function verifyPhoneOtp (
    phone: string, otp: string,
): Promise<AuthResponse> {

    if (otp !== authData.otp.phone) {
        return {
            success: false,
            message: "Invalid OTP.",
        };
    
    }

    return {
        success: true,
        message: "Phone verified successfully.",
        session: createMockSession(),
    };
}

export async function register(
    data: RegisterRequest,
): Promise<AuthResponse> {
    if (!data.name){
        return{
            success: false,
            message: "Name is required."
        };
    }

    if (!data.phone){
        return{
            success:false,
            message: "Phone is required"
        };
    }

    if (!data.password) {
        return {
        success: false,
        message: "Password is required.",
        };
    }

    return {
        success: true,
        message: "Account created successfully",
        session: createMockSession(),
    };
}


export async function requestEmailVerification(email: string): Promise<AuthResponse> {

    if (!email){
        return{
            success: false,
            message: "Email address is required."
        };
    }

    return{
        success:true,
        message: "Verification code sent to your email.",
    };
    
}

export async function VerifyEmail(email:string, code: string): Promise<AuthResponse> {

    if (code !== authData.otp.email){
        return {
            success: false,
            message: "Invalid verification code.",
        };
    }

    return {
        success: true,
        message: "Email verified successfully",
    };
    
}

export async function changePhone(data:ChangePhoneRequest,): Promise<AuthResponse> {

    if (!data.phone) {
        return {
            success: false,
            message: "Phone number is required."
        };
    }

    return {
        success: true,
        message: "Verification code sent to your new phone number.",
    };
    
}

export async function changeEmail(data:ChangeEmailRequest): Promise<AuthResponse> {

    if (!data.email){
        return {
            success: false,
            message: "Email address is required.",
        };
    }

    return {
        success: true,
        message: "Verification code sent to your new email address.",
    };
    
}


export async function  logout(): Promise<AuthResponse> {

    return{
        success: true,
        message: "Logged out successfully."
    };
    
}

export async function startRegistration(data:PendingRegistration,): Promise<AuthResponse> {

    if (!data.name) {
        return {
            success: false,
            message: "Name is required.",
        };
    }

    if (!data.phone) {
        return {
            success: false,
            message: "Phone number is required."
        };
    }

    if (!data.password) {
        return {
            success: false,
            message: "Password is required.",
        };
    }

    pendingRegistration = data;

    return requestPhoneOtp(data.phone);
    
}

export async function completeRegistration(
    otp: string,
): Promise<AuthResponse> {
    if (!pendingRegistration) {
        return {
            success: false,
            message: "No pending registration found.",
        };
    }

    const verification = await verifyPhoneOtp(
        pendingRegistration.phone,
        otp,
    );

    if (!verification.success) {
        return verification;
    }

    const registration = await register(
        pendingRegistration,
    );

    pendingRegistration = null;

    return registration;
}