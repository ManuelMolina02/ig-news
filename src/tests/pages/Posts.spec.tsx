import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

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

const posts = [
  {
    slug: 'my-new-post',
    title: 'my new post',
    excerpt: 'post excerpt',
    updatedAt: '25, Junho',
  }
]

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText('my new post')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'my new post paragraph' }
              ],
            },
            last_publication_date: '06-25-2022'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'my new post paragraph',
            updatedAt: '25 de junho de 2022'
          }]
        }
      })
    )


  })
})