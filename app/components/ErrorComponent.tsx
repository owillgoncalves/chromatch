import { HiArrowLeft, HiExclamationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { Link } from "@remix-run/react";

export function ErrorComponent({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-stone-800 bg-opacity-75">
      <Alert
        color="failure"
        additionalContent={
          <>
            <div className="mt-2 mb-4 text-lg text-red-700 dark:text-red-800">
              {message}
            </div>
            <div className="flex">
              <Link to="/">
                <button
                  type="button"
                  className="mr-2 inline-flex items-center rounded-lg bg-red-700 px-3 py-1.5 text-center text-base font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900"
                >
                  <HiArrowLeft className="-ml-0.5 mr-2 h-4 w-4" />
                  Go back to home
                </button>
              </Link>
            </div>
          </>
        }
        icon={HiExclamationCircle}
        className="container mx-auto max-w-lg"
      >
        <h3 className="text-lg font-medium text-red-700 dark:text-red-800">
          Error!
        </h3>
      </Alert>
    </div>
  );
}
