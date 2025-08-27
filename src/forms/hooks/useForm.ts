// src/forms/hooks/useForm.ts
import { useState } from "react";
import type {ChangeEvent} from "react";
import type {FormEvent} from "react";
import type { FormSchema, ValidationResult } from "../validation/schema";
import { validateForm, validateField } from "../validation/schema";

interface UseFormProps<T> {
  initialValues: T;
  schema: FormSchema;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Record<string, string | null>;
  touched: Record<string, boolean>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  resetForm: () => void;
  isValid: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target;
  const name = target.name;

  let val: any;

  if (target instanceof HTMLInputElement) {
    if (target.type === "checkbox") {
      const prev = values[name] || [];
      val = target.checked
        ? [...prev, target.value]
        : prev.filter((v: string) => v !== target.value);
    } else {
      val = target.value;
    }
  } else {
    // textarea or select
    val = (target as HTMLTextAreaElement | HTMLSelectElement).value;
  }

  setValues(prev => ({ ...prev, [name]: val }));

  if (touched[name]) {
    const fieldError = schema[name] ? validateField(val, schema[name], values) : null;
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  }
};


  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    if (schema[name]) {
      const fieldError = validateField(values[name], schema[name], values);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation: ValidationResult = validateForm(values, schema);
    setErrors(validation.errors);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (validation.isValid) {
      await onSubmit(values);
    }
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (schema[field as string]) {
      const fieldError = validateField(value, schema[field as string], values);
      setErrors(prev => ({ ...prev, [field as string]: fieldError }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isValid = Object.values(errors).every(err => !err);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
    isValid,
  };
}
