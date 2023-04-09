import { GetStaticProps } from 'next';
import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import PortableText from 'react-portable-text';
import { sanityClient } from '../../client/sanity';
import secureLocalStorage from  "react-secure-storage";

interface Props {
    lesson: LessonReference;
}

type LessonReference = {
  _id: string;
  title: string;
  slug: {
        current: string;
};
  body: [object];
};





const Lesson = ({lesson}: Props) => {
  
  const isLoggedIn = secureLocalStorage.getItem('isLoggedIn');

  return (
    <div>
      <Head>
        <title>{lesson.title}</title>
      </Head>
      <div>
      {isLoggedIn ? (
      <article className='jakarta max-w-3xl mx-auto p-5'>
          <h1 className='text-2xl md:text-3xl mt-10 mb-3 font-bold'>{lesson.title}</h1>
          
          <div className='mt-10 portable-text leading-7 text-lg'>
              <PortableText
              dataset= {process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId= {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={lesson.body}
              serializers={{
                  h1: (props: any) => (
                      <h1 className='text-2xl md:text-3xl font-bold my-5' {...props} />
                  ),
                  h2: (props: any) => (
                      <h2 className='text-xl md:text-2xl font-bold my-5' {...props} />
                  ),
                  li: ({children}: any) => (
                      <li className='ml-4 list-disc'>{children}</li>
                  ),
                  link: ({href, children}: any) => (
                      <a href={href} className='text-blue-500 hover:underline'>{children}</a>
                  ),
                  

              }}
              />
          </div>
      </article>) : (
        <div>
          <p>You need to login to access this page</p>
          <Link href='/login'>Login</Link>
        </div>
      )}
      
      
      
      
        </div>  
    </div>
    
  )
}


export async function getStaticPaths() {
    const query = 
    `*[_type == 'lessons']{
        _id,
        title,
        slug  {
        current
      }
      }`;
      
      const lessons = await sanityClient.fetch(query);

      const paths = lessons.map((lesson : LessonReference) => ({
        params: {
            slug: lesson.slug.current
        }
      }))
    return {
      paths,
      fallback: 'blocking' // false or 'blocking'
    };
  }

export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `
    *[_type == 'lessons' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        body,
        
      }
    `
    const lesson = await sanityClient.fetch(query, {
        slug: params?.slug,
    })
    if(!lesson){
        return {
            notFound: true
        }
    }
    return {
        props: {
            lesson,
        },
        revalidate: 60,
    }
}

export default Lesson