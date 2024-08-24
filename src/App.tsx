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
    const total = Math.trunc(total1 + total2 + total1GST + total2GST)
    // setCost(total.toString())
    //display price in indian currency format with commas
    setCost(total.toLocaleString('en-IN')) // 1,23,456
  }

  return (
    <>
      <ThemeProvider theme={baseTheme}>
        <h1 className='m-10'>Grava Cost Calculator</h1>
        <div className='card m-10'>
          <TextField
            className='mb-4'
            type='number'
            fullWidth
            id='Sqft'
            name='area'
            label='Area'
            variant='outlined'
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
          />
          <TextField
            className='mb-4'
            type='number'
            fullWidth
            id='Floor'
            name='floor'
            label='Floor'
            variant='outlined'
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
          />
          <Button variant='outlined' type='submit' onClick={calculateCost}>
            Submit
          </Button>
          <Button
            className='ml-2'
            variant='outlined'
            type='submit'
            onClick={() => setCost('')}
          >
            Reset
          </Button>
          {cost && <h1 className='mt-10 text-blue-500'>Rs. {cost}</h1>}
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
