import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

function FormSuccess({ message }: FormSuccessProps) {
  return (
    <div
      className={`${
        message ? "flex" : "hidden"
      } capitalize w-full p-3 text-sm flex justify-start gap-x-2 items-center rounded-md text-emerald-500 bg-emerald-500/15`}
    >
      <CheckCircledIcon className="w-4 h-4" />
      {message}
    </div>
  );
}

export default FormSuccess;
