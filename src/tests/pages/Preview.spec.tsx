import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useSession } from 'next-auth/react'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')
jest.mock('next-auth/react')

jest.mock('../../contexts/theme', () => {
  return {
    useTheme() {
      return {
        theme: {},
        color: {},
        image: {}
      }
    }
  }
})

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p> Post excerpt </p>',
  updatedAt: '25, Junho',
}

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([{ data: null }, false] as any);

    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  /*
    it('redirects user to full post when user is subscribed', async () => {
      const useSessionMocked = mocked(useSession)
      const useRouterMocked = mocked(useRouter)
      const pushMock = jest.fn()
  
      useSessionMocked.mockReturnValueOnce([
        { activeSubscription: 'fake-active-subscription' },
        false
      ] as any)
  
      useRouterMocked.mockReturnValueOnce({
        push: pushMock
      } as any)
  
  
      render(<Post post={post} />)
  
      expect(pushMock).toHaveBeenCalledWidth('/post/my-new-post')
    })*/

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        slig: 'my-new-post',
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post excerpt' }
          ],
        },
        last_publication_date: '06-25-2022'
      })
    } as any)

    const response = await getStaticProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post excerpt</p>',
            updatedAt: '25 de junho de 2022'
          }
        },
      })
    )
  })

})