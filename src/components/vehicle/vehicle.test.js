// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Vehicle from './vehicle'

describe('<Vehicle />', () => {
  test('it should mount', () => {
    render(<Vehicle />)
    
    const vehicle = screen.getByTestId('vehicle')

    expect(vehicle).toBeInTheDocument()
  })
})