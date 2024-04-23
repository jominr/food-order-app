import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes.tsx'
import './global.css'
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    // react query fetch all the queries again anytime the user has clicked away from the Chrome window and decides to come back
    queries: {
      refetchOnWindowFocus: false,
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client = {queryClient}>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors/>
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
