'use client';

import { useAppSelector } from '../../../state/store-provider';

export const useAuthSession = () => {
  const { status, session, user, lastError } = useAppSelector((state) => state.auth);

  return {
    status,
    session,
    user,
    lastError,
    isAuthenticated: status === 'authenticated' && !!session,
    isLoading: status === 'unknown',
  } as const;
};
