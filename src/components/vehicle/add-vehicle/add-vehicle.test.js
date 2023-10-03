// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddVehicle from './add-vehicle'

describe('<AddVehicle />', () => {
  test('it should mount', () => {
    render(<AddVehicle />)
    
    const vehicle = screen.getByTestId('add-vehicle')

    expect(vehicle).toBeInTheDocument()
  })
})