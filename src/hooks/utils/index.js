import { useNavigation } from '@react-navigation/core';
import { useRef, useEffect } from 'react';

// Hook
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function useBottomTabPress(callback) {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.getParent().addListener('tabPress', (e) => {
      // Prevent default behavior
      // e.preventDefault();
      if (callback) {
        callback();
      }
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);
}
