import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { publicRoutes, privateRoutes } from './routes'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'

const theme = createTheme()

function App() {
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
  )
}

export default App