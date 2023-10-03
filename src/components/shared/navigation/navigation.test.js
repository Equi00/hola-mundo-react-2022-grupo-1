/* // eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Navigation from './navigation'

describe('<Navigation />', () => {
  test('it should mount', () => {
    render(<Navigation />)
    
    const navigation = screen.getByTestId('navigation')

    expect(navigation).toBeInTheDocument()
  })
}) */