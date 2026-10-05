import { z } from "zod";

export const sellerOnboardingSchema = z
  .object({
    // Step 1: Account Credentials
    fullName: z
      .string()
      .min(2, "Owner full name must be at least 2 characters long"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please provide a valid business email address"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+-\s]+$/, "Please provide a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

    // Step 2: Store Information
    storeName: z
      .string()
      .min(3, "Store name must be at least 3 characters long"),
    storeCategory: z
      .string()
      .min(1, "Please select your primary store category"),
    storeAddress: z
      .string()
      .min(5, "Store pickup / business address is required"),

    // Step 3: Legal & Payout Details
    tradeLicenseOrNid: z
      .string()
      .min(4, "Trade license or NID number is required for verification"),
    bankOrMobileAccount: z
      .string()
      .min(5, "Bank or Mobile Banking (bKash/Nagad) account number is required"),

    agreeToSellerAgreement: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the Marketplace Seller Agreement",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
