import { createForm } from "remix-forms";
import type { FormProps, FormSchema } from "remix-forms";
import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useTransition as useNavigation,
} from "@remix-run/react";
import { Label as FBLabel, TextInput } from "flowbite-react";
import { forwardRef } from "react";

const RemixForm = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

function Button({ className, ...props }: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className="mt-6 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      {...props}
    />
  );
}

function Error(props: JSX.IntrinsicElements["div"]) {
  return <div className="m-1 text-sm text-red-600" {...props} />;
}

function Field({ className, ...props }: JSX.IntrinsicElements["div"]) {
  return <div className="flex h-24 flex-col" {...props} />;
}

const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"]>(
  ({ type = "text", className, ...props }, ref) => (
    <div>
      <div className="mb-2 block"></div>
      <TextInput
        ref={ref as any}
        type={type}
        placeholder="Input Gray"
        required={true}
        color="gray"
        {...props}
      />
    </div>
  )
);

Input.displayName = "Input";

function Label({ className, ...props }: JSX.IntrinsicElements["label"]) {
  return <FBLabel ref={props.ref as any} {...props} />;
}

function Form<Schema extends FormSchema>(props: FormProps<Schema>) {
  return (
    <RemixForm
      className="flex w-full max-w-sm flex-col gap-6"
      buttonComponent={Button}
      errorComponent={Error}
      fieldComponent={Field}
      inputComponent={Input}
      labelComponent={Label}
      {...props}
    />
  );
}

export { Form };
