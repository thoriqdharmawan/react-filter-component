import React from 'react'
import Text from '../components/text/Text'
import { render } from '@testing-library/react'

test('renders text component correctly', () => {
  const div = document.createElement('div')
  render(<Text />, div)
})
