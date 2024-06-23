import React, {useDebugValue, useEffect, useState} from "react";

export const useLocalStorage = <S>(
  key: string,
  initialState?: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState as S);

  useDebugValue(state);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setState(parse(item));
      } else if (typeof initialState === "function") {
        setState((initialState as () => S)());
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [key, initialState]);

  useEffect(() => {
    try {
      if (
        state !== null &&
        state !== "" &&
        !(Array.isArray(state) && state.length === 0) &&
        !(typeof state === "object" && Object.keys(state).length === 0)
      ) {
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [key, state]);

  return [state, setState];
};

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
