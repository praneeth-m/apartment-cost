import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import data from './data.json'

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

// consts
const FLOOR_RISE = 20
const AMENITIES = 400
const HVAC = 360
const DOCS = 10000
const CORPUS = 100
const MAINTENANCE = 84
const GST1 = 5
const GST2 = 18

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#9a9a9a',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

type Tower = {
  number: number
  units: Unit[]
}

type Unit = {
  number: number
  area: number
  facing: string
  hasHomeTheatre: boolean
}

function Apartment() {
  const [tower, setTower] = useState<Tower | null>(null)
  const [unit, setUnit] = useState<Unit | null>(null)
  const [priceSqft, setPriceSqft] = useState(0)
  const [area, setArea] = useState(0)
  const [floor, setFloor] = useState(30)

  const [finalCost, setFinalCost] = useState(0)
  const [baseCost, setBaseCost] = useState(0)
  const [floorRiseCost, setFloorRiseCost] = useState(0)
  const [parkingCost, setParkingCost] = useState(0)
  const [amenitiesCost, setAmenitiesCost] = useState(0)
  const [hvacCost, setHvacCost] = useState(0)
  const [maintenanceCost, setMaintenanceCost] = useState(0)
  const [corpusCost, setCorpusCost] = useState(0)
  const [gst1, setGst1] = useState(0)
  const [gst2, setGst2] = useState(0)
  const [numParkingSpots, setNumParkingSpots] = useState(0)

  useEffect(() => {
    setBaseCost(area * priceSqft)
    setFloorRiseCost(floor <= 5 ? 0 : (floor - 5) * (FLOOR_RISE * area))
    setParkingCost(area <= 4365 ? 1250000 : 1500000)
    setAmenitiesCost(area * AMENITIES)
    setHvacCost(area * HVAC)
    setMaintenanceCost(area * MAINTENANCE)
    setCorpusCost(area * CORPUS)
    setNumParkingSpots(area <= 4365 ? 3 : 4)
    setFinalCost(0)
  }, [area, priceSqft, floor])

  useEffect(() => {
    if (tower) {
      if (tower.number < 5) setPriceSqft(11000)
      else setPriceSqft(11500)
    }
  }, [tower])

  useEffect(() => {
    if (unit) {
      setArea(unit.area)
    }
  }, [unit])

  const calculateCost = () => {
    if (area < 4365) {
      alert('Smallest area is 4365 sqft')
      return
    }
    if (floor < 1 || floor > 50) {
      alert('Invalid floor')
      return
    }

    const total1 =
      baseCost + floorRiseCost + amenitiesCost + hvacCost + parkingCost

    const total2 = DOCS + maintenanceCost

    setGst1(Math.trunc((total1 * GST1) / 100))
    setGst2(Math.trunc((total2 * GST2) / 100))

    const total = Math.trunc(
      total1 +
        total2 +
        (total1 * GST1) / 100 +
        (total2 * GST2) / 100 +
        area * CORPUS
    )

    //display price in indian currency format with commas
    setFinalCost(total) // 1,23,456
  }

  // handle select tower
  const handleTowerChange = (event: SelectChangeEvent) => {
    //find tower by number
    const selectedTower =
      data.towers.find(
        (tower) => tower.number === Number(event.target.value)
      ) || null
    setTower(selectedTower)
    setUnit(null) // reset unit
  }

  const handleUnitChange = (event: SelectChangeEvent) => {
    //find unit by number
    const selectedUnit =
      tower?.units.find((unit) => unit.number === Number(event.target.value)) ||
      null
    setUnit(selectedUnit)
  }

  return (
    <>
      <ThemeProvider theme={baseTheme}>
        <div className='card m-1'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Tower</InputLabel>
            <Select
              labelId='tower'
              id='tower'
              value={(tower?.number ?? 0).toString()}
              label='Tower'
              onChange={handleTowerChange}
            >
              {data.towers.map((tower) => (
                <MenuItem key={tower.number} value={tower.number}>
                  Tower {tower.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br></br>
          <br></br>

          <FormControl fullWidth>
            <InputLabel id='unit'>Unit</InputLabel>
            <Select
              labelId='unit'
              id='unit'
              value={(unit?.number ?? 0).toString()}
              label='Unit'
              onChange={handleUnitChange}
            >
              {tower?.['units'].map((unit) => (
                <MenuItem key={unit.number} value={unit?.number ?? 0}>
                  Unit #{unit.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            {unit ? (
              <div>
                <h3>Unit Details</h3>
                <p>Area: {unit.area} sqft</p>
                <p>Facing: {unit.facing}</p>
                <p>Home Theatre: {unit.hasHomeTheatre ? 'Yes' : 'No'}</p>
              </div>
            ) : (
              ''
            )}
          </div>
          <br></br>
          <TextField
            className='mb-4'
            type='number'
            fullWidth
            id='pricesqft'
            name='Price per sqft'
            label='Price/Sqft'
            variant='outlined'
            value={priceSqft || 0}
            onChange={(e) => setPriceSqft(Number(e.target.value))}
          />
          <TextField
            className='mb-4'
            type='number'
            fullWidth
            id='Sqft'
            name='area'
            label='Area'
            variant='outlined'
            value={area || 0}
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
            value={floor || 0}
            InputProps={{ inputProps: { min: 0, max: 10 } }}
            onChange={(e) => setFloor(Number(e.target.value))}
          />
          <Button variant='outlined' type='submit' onClick={calculateCost}>
            Submit
          </Button>
          <Button
            className='ml-2'
            variant='outlined'
            type='submit'
            onClick={() => setFinalCost(0)}
          >
            Reset
          </Button>
          {finalCost > 0 ? (
            <div>
              <h1 className='mt-10 text-blue-500'>
                Rs. {finalCost.toLocaleString('en-IN')}
              </h1>
              <br></br>
              <h4>
                Includes{' '}
                <span style={{ fontSize: '24px', fontWeight: 600 }}>
                  {numParkingSpots}
                </span>{' '}
                parking spots with Option A (2 spots on Basement Level I and{' '}
                {numParkingSpots - 2} spot{numParkingSpots - 2 > 1 ? 's' : ''}{' '}
                on Basement level IV)
              </h4>

              <h4> {unit?.facing} facing</h4>
              <h4>
                {unit?.hasHomeTheatre ? 'Home theater' : 'No home theater'}
              </h4>
              <br></br>
              <h3>Pricing Breakdown</h3>

              <TableContainer component={Paper}>
                <Table aria-label='pricing breakdown'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Item</StyledTableCell>
                      <StyledTableCell>Cost</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        Base Cost
                      </TableCell>
                      <TableCell>
                        Rs. {baseCost.toLocaleString('en-IN')}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        Floor Rise Cost
                      </TableCell>
                      <TableCell>
                        Rs. {floorRiseCost.toLocaleString('en-IN')}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        Amenities Cost
                      </TableCell>
                      <TableCell>
                        Rs. {amenitiesCost.toLocaleString('en-IN')}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        HVAC Cost
                      </TableCell>
                      <TableCell>
                        Rs. {hvacCost.toLocaleString('en-IN')}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        Parking Cost
                      </TableCell>
                      <TableCell>
                        Rs. {parkingCost.toLocaleString('en-IN')}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        Documentation Charges
                      </TableCell>
                      <TableCell>Rs. {DOCS.toLocaleString('en-IN')}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        Corpus Fund
                      </TableCell>
                      <TableCell>
                        Rs. {corpusCost.toLocaleString('en-IN')}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        Maintenance Charges
                      </TableCell>
                      <TableCell>
                        Rs. {maintenanceCost.toLocaleString('en-IN')}
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        GST1
                      </TableCell>
                      <TableCell>Rs. {gst1.toLocaleString('en-IN')}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        GST2
                      </TableCell>
                      <TableCell>Rs. {gst2.toLocaleString('en-IN')}</TableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            ''
          )}
        </div>
      </ThemeProvider>
    </>
  )
}

export default Apartment
