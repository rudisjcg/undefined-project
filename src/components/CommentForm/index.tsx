"use client";

import { createContext, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Input from "../Input";
import { SubmitButton } from "../Form/components";

type FormValues = Record<string, string>;

interface FormContextType {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

interface FormProps {
  title: string;
  description?: string;
  linkTo?: string;
  onSubmit: (values: FormValues) => void;
  children: React.ReactNode;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export function Form({
  title,
  children,
  onSubmit,
  description,
  linkTo,
}: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form onSubmit={handleSubmit}>
        <div className="w-full text-center">
          <span>{title}</span>
          {description && <p>{description}</p>}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.Input = Input;
Form.SubmitButton = SubmitButton;
