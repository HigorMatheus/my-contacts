import { useCallback } from 'react';
import { useIsMounted } from './useIsMounted';

export const useSafeAsyncAction = () => {
  const isMounted = useIsMounted();

  const rumSafeAsyncAction = useCallback(
    (callback) => {
      if (isMounted()) {
        callback();
      }
    },
    [isMounted],
  );

  return rumSafeAsyncAction;
};
