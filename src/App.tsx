import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { publicRoutes, privateRoutes } from './routes'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import { store } from './store'
import { checkAuth } from './store/slices/authSlice'

const theme = createTheme({
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App