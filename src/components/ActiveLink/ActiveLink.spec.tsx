import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

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

describe('ActiveLink component', () => {

  it('active link renders correctly', () => {
    render(
      <ActiveLink href='/' title='Home' />
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
  })


})
