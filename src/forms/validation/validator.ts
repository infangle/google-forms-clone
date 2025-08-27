// src/forms/validation/validators.ts

export type ValidatorFn = (value: any, allValues?: Record<string, any>) => string | null;

// Required field validator
export const required = (message = "This field is required"): ValidatorFn => {
  return (value) => {
    if (value === undefined || value === null || value === "") {
      return message;
    }
    return null;
  };
};

// Minimum length validator
export const minLength = (min: number, message?: string): ValidatorFn => {
  return (value) => {
    if (typeof value === "string" && value.trim().length < min) {
      return message || `Minimum length is ${min} characters.`;
    }
    return null;
  };
};

// Maximum length validator
export const maxLength = (max: number, message?: string): ValidatorFn => {
  return (value) => {
    if (typeof value === "string" && value.trim().length > max) {
      return message || `Maximum length is ${max} characters.`;
    }
    return null;
  };
};

// Custom validator example
export const custom = (fn: (value: any, allValues?: Record<string, any>) => boolean, message: string): ValidatorFn => {
  return (value, allValues) => {
    if (!fn(value, allValues)) {
      return message;
    }
    return null;
  };
};
