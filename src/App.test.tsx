/* eslint-disable */
// TODO enable ESlint and figure out testing style
import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('fetchJson()', () => {
  it('returns an option', () => {
    
  });
});
