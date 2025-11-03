// hooks/useLocalStorage.ts
// Fix: Import React to resolve 'Cannot find namespace React' error.
import React, { useState, useEffect, useRef } from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved';

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>, SaveStatus] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Gagal memuat data dari localStorage untuk key "${key}"`, error);
      return initialValue;
    }
  });

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const debounceTimeout = useRef<number | null>(null);

  // useEffect to update local storage when the state changes
  useEffect(() => {
    // Clear any existing timeout to reset the debounce timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Don't save initial value on first render
    if (JSON.stringify(storedValue) === JSON.stringify(initialValue)) {
        setSaveStatus('idle');
    } else {
        setSaveStatus('saving');
    }

    debounceTimeout.current = window.setTimeout(() => {
      try {
        const valueToStore = JSON.stringify(storedValue);
        window.localStorage.setItem(key, valueToStore);
        if (saveStatus !== 'idle') {
          setSaveStatus('saved');
        }
      } catch (error) {
        console.error(`Gagal menyimpan data ke localStorage untuk key "${key}"`, error);
        // Optionally, handle the error (e.g., show a notification)
      }
    }, 500); // 500ms debounce delay

    // Reset status to idle after a few seconds
    const idleTimeout = setTimeout(() => {
        if(saveStatus === 'saved') {
            setSaveStatus('idle');
        }
    }, 2000);

    // Cleanup timeouts on component unmount or before re-running the effect
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      clearTimeout(idleTimeout);
    };
  }, [key, storedValue, initialValue]);

  return [storedValue, setStoredValue, saveStatus];
}

export default useLocalStorage;