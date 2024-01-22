// File: __tests__/Header-test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../components/Header';

describe('Header', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Hello Harness')).toBeTruthy();
  });

  // Add more tests as needed...
});
