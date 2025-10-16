import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Typography } from '@mui/material'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const Home = () => (
  <div>
    <Typography variant="h4" component="h1" gutterBottom>
      Home
    </Typography>
    <Typography variant="body1">
      Welcome to the home page.
    </Typography>
  </div>
)

const About = () => (
  <div>
    <Typography variant="h4" component="h1" gutterBottom>
      About
    </Typography>
    <Typography variant="body1">
      This is the about page.
    </Typography>
  </div>
)

export default App