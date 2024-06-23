import {useCallback, useState} from "react";

interface ErrorResponse {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
}

interface UseErrorHook {
  error: ErrorResponse | null;
  setError: (error: ErrorResponse) => void;
  clearError: () => void;
  errorMessage: (error: ErrorResponse, propertyPath: string) => string | null;
}

function errorMessage(error: ErrorResponse, propertyPath: string): string | null {
  const errorPath = propertyPath.split(".");
  let currentError: any = error?.errors;

  for (const path of errorPath) {
    if (currentError && typeof currentError !== "string" && currentError[path] !== undefined) {
      if (Array.isArray(currentError[path]) && currentError[path].length > 0) {
        currentError = currentError[path] as string[];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  return currentError ? (Array.isArray(currentError) ? currentError[0] : null) : null;
}

const useError = (): UseErrorHook => {
  const [error, setErrorState] = useState<ErrorResponse | null>(null);

  const setError = useCallback((newError: ErrorResponse) => {
    setErrorState(newError);
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return {
    error,
    setError,
    clearError,
    errorMessage,
  };
};

export default useError;
