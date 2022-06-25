import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { getSession } from 'next-auth/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
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

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
  })


  it('redirects user if subscription is found', async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/my-new-post',
        })
      })
    )
  })
  /*
   it('loads initial data', async () => {
     const getSessionMocked = mocked(getSession)
 
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
 
     getSessionMocked.mockResolvedValueOnce({
       activeSubscription: 'fake-active-subscription'
     } as any)
 
 
     const response = await getServerSideProps({
       params: { slug: 'my-new-post' }
     } as any)
 
     console.log(response);
 
 
     expect(response).toEqual(
       expect.objectContaining({
         props: {
           post: {
             slug: 'my-new-post',
             title: 'My new post',
             content: '<p> Post excerpt </p>',
             updatedAt: '25 de junho de 2022'
           }
         },
 
 
       })
     )
   })*/

})