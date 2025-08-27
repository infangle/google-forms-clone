import type { ValidatorFn } from "./validator";
import { required, minLength, maxLength } from "./validator";

// Define the form schema with validators
export type FormSchema = {
  [key: string]: ValidatorFn[];
};

// Create a schema for the form
export const createFormSchema: FormSchema = {
  title: [
    required("Title is required"),
    minLength(5, "Title must be at least 5 characters long"),
  ],
  description: [
    maxLength(200, "Description cannot exceed 200 characters"),
  ],
};

// Create a schema for editing the form
export const editFormSchema: FormSchema = {
  title: [
    required("Title is required"),
    minLength(5, "Title must be at least 5 characters long"),
  ],
  description: [
    maxLength(200, "Description cannot exceed 200 characters"),
  ],
};

// Validation functions
export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string | null>;
};

export const validateField = (value: any, validators: ValidatorFn[], allValues: Record<string, any>): string | null => {
  for (const validator of validators) {
    const error = validator(value, allValues);
    if (error) {
      return error;
    }
  }
  return null;
};

export const validateForm = (values: Record<string, any>, schema: FormSchema): ValidationResult => {
  const errors: Record<string, string | null> = {};
  let isValid = true;

  for (const key in schema) {
    const error = validateField(values[key], schema[key], values);
    if (error) {
      errors[key] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};
