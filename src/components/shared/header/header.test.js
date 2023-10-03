/* // eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './header'

describe('<Header />', () => {
  test('it should mount', () => {
    render(<Header />)
    
    const header = screen.getByTestId('header')

    expect(header).toBeInTheDocument()
  })
}) */