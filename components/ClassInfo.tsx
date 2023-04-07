import React from "react";
import { GetStaticProps } from 'next'

import { Class } from "../typings";
import { sanityClient } from '../client/sanity'
import PortableText from 'react-portable-text'

type Props = {
  classes: Class[];
};

export default function ClassInfo({ classes }: Props) {

   // console.log(classInfo)

  return (
    <>
    <div>
        {classes?.map((data) => (
                    <>
                        <p>{data.name}</p>
                        <p>Start date: {data.startDate}</p>
                        <p>Students number: {data.studentsNumber}</p>
                        <p>Studying: {data.studying}</p>

                        <div>
                            {data?.modulesReferences?.map((module) => (
                                <>
                                    <p>{module.name}</p>
                                    <div>
                                      {module.lessonsReferences?.map((lesson) => (
                                        <>
                                          <p>{lesson.title}</p>
                                          <div>
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
                                        </>
                                      ))}
                                    </div>                            
                                </>
                            ))}
                        </div>
                    </>
        ))}

    </div>

        

        
      
    </>
  );
}


export const getStaticProps: GetStaticProps<Props> = async () => {
  const classes = await sanityClient.fetch(`*[_type == "class"]{
    _id,
    title,
    modules[]->{
      _id,
      title,
      lessons[]->{
        _id,
        title,
        description
      }
    }
  }`)
  return { props: { classes } }
}
