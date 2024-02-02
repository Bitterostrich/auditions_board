
import { useEffect } from 'react';
import { Inter } from "next/font/google";
import {ApiClientProvider} from '../contexts/ApiClientContext';
import {ApiClient} from '@/utils/apiClient'
import '../app/globals.css'

const apiClient = new ApiClient()

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  useEffect(() => {

    document.body.className = inter.className;
  }, []);

  return (
    <ApiClientProvider client={apiClient}>
      <Component {...pageProps} />
    </ApiClientProvider>
  );
}

export default MyApp;