import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { publicRoutes, privateRoutes } from './routes'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import { store } from './store'
import { checkAuth } from './store/slices/authSlice'
import { Analytics } from "@vercel/analytics/next"
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
       main: '#10b981',
      light: '#6ee7b7',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#065f46',
    },
    background: {
      default: '#ffffff',
     },
    text: {
      primary: '#042f1b',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: "'Mulish', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
})

function AppContent() {
  useEffect(() => {
    store.dispatch(checkAuth());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            {publicRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            {privateRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<PrivateRoute component={Component} />} />
            ))}
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </HelmetProvider>
  )
}

export default App