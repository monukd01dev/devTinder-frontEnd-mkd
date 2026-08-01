import { z } from 'zod'; 
import { DELETE_CONFIRM_TEXT } from '../utils/constants';
export const loginSchema = z.object({
    emailId: z
        .string().min(1,'Reguired')
        .trim()
        .toLowerCase()
        .email({ message: "Invalid format" })
        .max(100, { message: "Email is too long" }),

    password: z
        .string().min(1,'Reguired')
        .trim()
        .min(8, { message: 'At least 8 characters' })
        .max(50, { message: 'Max 50 characters' })
});


export const signupSchema = z.object({
    firstName: z.string()
        .trim()
        .min(2, "Min 2 chars")
        .max(50, "Max 50 chars")
        .toLowerCase()
        .regex(/^[a-z\u00C0-\u024F\s\-']+$/, "Invalid name format"),

    // Optional fields need to accept empty strings ('') from forms
    lastName: z.string()
        .trim()
        .min(2, "Min 2 chars")
        .max(50, "Max 50 chars")
        .toLowerCase()
        .regex(/^[a-z\u00C0-\u024F\s\-']+$/, "Invalid name format")
        .optional()
        .or(z.literal('')),

    emailId: z.string()
        .trim()
        .min(1, "Required")
        .toLowerCase()
        .email("Invalid email format")
        .max(100, "Max 100 chars"),

    // 🔥 Strong Password Regex
    password: z.string()
        .min(8, "Min 8 chars")
        .regex(/^(?=.*[a-z])/, "Must contain a lowercase letter")
        .regex(/^(?=.*[A-Z])/, "Must contain an uppercase letter")
        .regex(/^(?=.*\d)/, "Must contain a number")
        .regex(/^(?=.*[\W_])/, "Must contain a special character")
        .max(50, "Max 50 chars"),

    // z.coerce input string ko strictly number me badal dega
    age: z.coerce.number()
        .min(18, "Must be at least 18")
        .max(120, "Invalid age"),
    
    about: z.string()
        .trim()
        .max(500, "Max 500 chars")
        .optional()
        .or(z.literal('')),
    
    // URL or empty string
    photoUrl: z.string()
        .trim()
        .url("Invalid URL format")
        .optional()
        .or(z.literal('')),

    gender: z.enum(['male', 'female', 'others'], {
        errorMap: () => ({ message: "Invalid selection" })
    }),

    skills: z.array(
        z.string()
            .trim()
            .min(1, "Cannot be empty")
            .max(30, "Max 30 chars per skill")
    )
    .max(15, "Max 15 skills allowed")
    .optional()
});

// 🔥 new Schema for Profile Update
export const profileUpdateSchema = signupSchema.omit({
    emailId: true,
    password: true,
});

export const deleteAccountSchema = z.object({
    confirmText: z.string().refine((val) => val === DELETE_CONFIRM_TEXT, {
        message: `Please type "${DELETE_CONFIRM_TEXT}" exactly to confirm.`,
    }),
});

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const updatePasswordSchema = z.object({
    // 1. Current Password (Sirf check karna hai ki khali na ho)
    currentPassword: z.string().min(1, "Current password is required"),
    
    // 2. New Password (Tera Backend wala rule yahan apply hoga)
    newPassword: z.string().regex(strongPasswordRegex, "Must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"),
    
    // 3. Confirm Password (Frontend UX ke liye)
    confirmPassword: z.string().min(1, "Please confirm your new password")
})
// 4. Logical Check 1: Naya password purane jaisa nahi hona chahiye
.refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password cannot be the same as the current one",
    path: ["newPassword"] // Error kis input box ke neeche dikhana hai
})
// 5. Logical Check 2: Confirm password match hona chahiye
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});