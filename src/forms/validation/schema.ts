// src/forms/validation/schema.ts
import type { ValidatorFn } from "./validator";

export type FieldSchema = ValidatorFn[];
export type FormSchema = Record<string, FieldSchema>;

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string | null>;
}

export const validateField = (value: any, validators: FieldSchema, allValues?: Record<string, any>): string | null => {
  for (const validator of validators) {
    const error = validator(value, allValues);
    if (error) return error; // return first error encountered
  }
  return null;
};

export const validateForm = (values: Record<string, any>, schema: FormSchema): ValidationResult => {
  const errors: Record<string, string | null> = {};
  let isValid = true;

  for (const field in schema) {
    const fieldValidators = schema[field];
    const error = validateField(values[field], fieldValidators, values);
    errors[field] = error;
    if (error) isValid = false;
  }

  return { isValid, errors };
};
