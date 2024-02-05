import { createContext, useContext, useMemo } from 'react';
import { ApiClient } from '@/utils/apiClient'; 
import {useRouter} from 'next/router'

const ApiClientContext = createContext({
  client: null,
  logout: () => {},
});

export const useApiClient = () => useContext(ApiClientContext);

export const ApiClientProvider = ({ children }) => {

  const router = useRouter()
  const client = useMemo(() => new ApiClient(
    () => localStorage.getItem('token'), 
    () => logout()
  ), []);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login')

  };

  return (
    <ApiClientContext.Provider value={{ client, logout }}>
      {children}
    </ApiClientContext.Provider>
  );
};