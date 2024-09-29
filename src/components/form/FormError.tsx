import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

function FormError({ message }: FormErrorProps) {
  return (
    <div
      className={`${
        message ? "flex" : "hidden"
      } capitalize w-full p-3 text-sm justify-start gap-x-2 items-center rounded-md text-red bg-red-100`}
    >
      <ExclamationTriangleIcon className="w-4 h-4" />
      {message}
    </div>
  );
}

export default FormError;
