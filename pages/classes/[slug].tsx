import { GetStaticProps } from 'next';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

import Head from 'next/head';

import PortableText from 'react-portable-text';
import { sanityClient } from '../../client/sanity';
import { Class } from '../../typings';
import secureLocalStorage from  "react-secure-storage";

import Link from 'next/link';
import Layout from '../../components/Layout';
import logo from '../../assets/expo-logo.svg';
import moon from '../../assets/moon.svg';
import hamnight from '../../assets/hamburger-night.svg'
import Image from 'next/image';
import teacher from '../../assets/teacher-icon.svg';
import time from '../../assets/time-icon.svg';
import group from '../../assets/group-icon.svg';
import play from '../../assets/play-icon.svg';



interface Props {
    data: Class;
}


const ClassInfo = ({data}: Props) => {

    const router = useRouter();

    function logOut() {
    //sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    secureLocalStorage.removeItem('isLoggedIn')
    localStorage.removeItem('classId')
    router.push("/")
    }


    

  const isLoggedIn = secureLocalStorage.getItem('isLoggedIn');
    
  return (    
    <>
    <Head>
        <title>{data.name}</title>
    </Head>
        {isLoggedIn ? (
            <Layout>

                <div className="p-3 md:p-5">

                    <h1 className='font-bold text-2xl md:text-3xl py-5'>{data.name}</h1>
                    <div className='opacity-80 text-lg'>
                      <div className='flex my-1'>
                        <Image src={teacher} alt="teacher icon" />
                        <p className='pl-3'>{data.classTeacher.name}</p>
                      </div>
                      <div className='flex my-1'>
                        <Image src={time} alt="time icon" />
                        <p className='pl-3'>{data.startDate}</p>
                      </div>
                      <div className='flex my-1'>
                        <Image src={group} alt="group icon" />
                        <p className='pl-3'>{data.studentsNumber} человек</p>
                      </div>  
                    </div>
                    
                    
                    
                    
                    

                </div>

                <div className='md:flex md:ml-5'>
                    {data?.modulesReferences?.map((module) => (
                        <div key={module._id} className="bg-white bg-opacity-20 my-5 py-5 md:px-12 px-3 mx-2 md:ml-5 rounded-xl md:w-max">
                            <h3 className='text-2xl font-bold mb-3'>{module.name}</h3>
                            <div>
                                {module.lessonsReferences?.map((lesson) => (
                               <div key={lesson._id} className="flex"> 
                                        <Image src={play} alt="play-icon" />
                                        <Link href={`/lessons/${lesson.slug}`}>
                                            <p className='text-lg opacity-80 pb-1 pl-2'>{lesson.title}</p>    
                                        </Link>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>

                    ))}
                </div>
                <div>
                    
                </div>

                

            </Layout>
        ): (
      <div>
          <p>You need to login to access this page</p>
          <Link href='/'>Login</Link>
      </div>
    )}
    </>    
    )}


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
        classTeacher -> {
            name,
            imgUrl,
        },
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