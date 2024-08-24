import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { TextField, Button } from '@mui/material'

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
  const BASE_PRICE = 11200
  const FLOOR_RISE = 20
  const AMENITIES = 400
  const HVAC = 360
  const PARKING = 1250000
  const DOCS = 10000
  const CORPUS = 100
  const MAINTENANCE = 84
  const GST1 = 5
  const GST2 = 18

  const [area, setArea] = useState(4365)
  const [floor, setFloor] = useState(20)
  const [cost, setCost] = useState('')

  const calculateCost = () => {
    const total1 =
      area * BASE_PRICE +
      (floor - 6) * (FLOOR_RISE * area) +
      area * AMENITIES +
      area * HVAC +
      PARKING
    const total2 = DOCS + area * CORPUS + area * MAINTENANCE
    const total1GST = (total1 * GST1) / 100
    const total2GST = (total2 * GST2) / 100
    const total = total1 + total2 + total1GST + total2GST
    setCost(total.toString())
  }

  return (
    <>
      <ThemeProvider theme={baseTheme}>
        <h1>Grava</h1>
        <div className='card'></div>
        <TextField
          fullWidth
          id='Sqft'
          name='area'
          label='area'
          variant='outlined'
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
        />
        <TextField
          fullWidth
          id='Floor'
          name='floor'
          label='floor'
          variant='outlined'
          value={floor}
          onChange={(e) => setFloor(Number(e.target.value))}
        />
        <Button variant='outlined' type='submit' onClick={calculateCost}>
          Submit
        </Button>

        <h1>Cost: {cost}</h1>
      </ThemeProvider>
    </>
  )
}

export default App
