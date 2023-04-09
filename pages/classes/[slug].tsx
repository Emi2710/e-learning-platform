import { GetStaticProps } from 'next';
import React from 'react'
import PortableText from 'react-portable-text';
import { sanityClient } from '../../client/sanity';
import { Class } from '../../typings';

import Link from 'next/link';



interface Props {
    data: Class;
}


const ClassInfo = ({data}: Props) => {
    
  return (
    <div>
        <div className="font-bold">

            <p>{data.name}</p>
            <p>Start date: {data.startDate}</p>
            <p>Students number: {data.studentsNumber}</p>
            <p>Studying: {data.studying}</p>

        </div>
        <div>
            {data?.modulesReferences?.map((module) => (
                <div key={module._id}>
                    <p>{module.name}</p>
                    <div>
                        {module.lessonsReferences?.map((lesson) => (
                            <div key={lesson._id}>
                                <Link href={`/lessons/${lesson.slug}`}>
                                    <p>{lesson.title}</p>    
                                </Link>
                                
                            </div>
                        ))}
                    </div>
                </div>

            ))}
        </div>
    </div>
  )
}


export async function getStaticPaths() {
    const query = 
    `*[_type == 'classes']{
        _id,
        title,
        slug,
       
      }`;
      
      const classes = await sanityClient.fetch(query);

      const paths = classes.map((data : Class) => ({
        params: {
            slug: data.slug.current
        }
      }))
    return {
      paths,
      fallback: 'blocking' // false or 'blocking'
    };
  }

export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `
    *[_type == 'classes' && slug.current == $slug][0]{
        _id,
        _createdAt,
        _id,
        name,
        slug,
        studying,
        startDate,
        endDate,
        studentsNumber,
        modulesReferences[]->{
        _id,
        name,
        lessonsReferences[]->{
            _id,
            title,
            "slug": slug.current,
            body
        }
        }
        
        
      }
    `
    const data = await sanityClient.fetch(query, {
        slug: params?.slug,
    })
    if(!data){
        return {
            notFound: true
        }
    }
    return {
        props: {
            data,
        },
        revalidate: 60,
    }
}

export default ClassInfo