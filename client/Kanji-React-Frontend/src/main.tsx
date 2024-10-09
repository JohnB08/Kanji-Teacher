import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {router} from "./Router/Router";
import { RouterProvider } from 'react-router-dom';
import './index.css'
import { AuthProvider } from './Wrappers/FirebaseWrapper/FirebaseWrapper.tsx'
import { KanjiProvider } from './Wrappers/KanjiDataWrapper/KanjiDataWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <KanjiProvider>
          <RouterProvider router={router} />
        </KanjiProvider>
      </AuthProvider>
  </StrictMode>,
)
