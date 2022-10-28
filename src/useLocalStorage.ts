import React, { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved || "null") as T | null;
  return initial || defaultValue;
}

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
