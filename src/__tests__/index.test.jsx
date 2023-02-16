import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('Page Loads', () => {
    render(<Home />)

    const button = screen.getByRole('button', {
      name: /Search/i,
    })

    expect(button).toBeInTheDocument()
  })
})