import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Apartment from './Apartment'
import { FormControlLabel, Switch } from '@mui/material'

const baseTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#00837E',
      // secondary: '#FF6C36',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#ffffff',
    },
  },
})

function App() {
  const [comparing, setComparing] = useState(false)
  return (
    <>
      <ThemeProvider theme={baseTheme}>
        <h1 className='m-10'>Grava Apartment Pricing</h1>
        <div className='card m-10'>
          <FormControlLabel
            control={
              <Switch
                checked={comparing}
                onChange={() => setComparing(!comparing)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='Compare'
          />
          <br></br>
          <br></br>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Apartment />
            {comparing && <Apartment />}
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
