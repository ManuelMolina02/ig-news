import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react'
import { SubscribeButton } from '.'
import '@testing-library/jest-dom'

jest.mock('next-auth/react')
jest.mock('next/router')

jest.mock('../../contexts/theme', () => {
  return {
    useTheme() {
      return {
        theme: {},
        color: {}
      }
    }
  }
})

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([{ data: null }, false] as any);

    render(<SubscribeButton />)
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

})

