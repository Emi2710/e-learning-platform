import React, {useState, useEffect} from 'react'
import { Class } from '../typings'
import { sanityClient } from '../client/sanity';
import { GetStaticProps } from 'next';
import secureLocalStorage from  "react-secure-storage";



import logo from '../assets/expo-logo.svg';
import moon from '../assets/moon.svg';
import hamnight from '../assets/hamburger-night.svg'
import Image from 'next/image';
import Navbar from './Navbar';
import Link from 'next/link';


type Props = {children: any}



export default function Layout({children}: Props) {

  const classId = localStorage.getItem('classId');
  const [modules, setModules] = useState<Class[]>([])

  useEffect(() => {
    const query = `
      *[_type == 'classes' && classIdentifier == $classId] {
        _id,
        _createdAt,
        _id,
        slug,
        name,
        modulesReferences[]->{
          _id,
          name,
          lessonsReferences[]->{
              _id,
              title,
              "slug": slug.current,
          }
        }
        
      }
    `

    if (classId) { // only fetch data if category state is not an empty string
      sanityClient
        .fetch(query, { classId })
        .then((data) => setModules(data))
        .catch((error) => console.error(error))
    }
  }, [classId])

  return (
    <div>
      <div className='flex justify-between p-5'>
                <Image src={logo} alt='expovision logo' />
                <div className='flex'>
                  <Image src={moon} alt="moon icon" className='mr-3' />
                  <Image src={hamnight} alt="hamburger menu light"className='' />
                </div>
      </div>
      {modules?.map((classes) => (
        <div>
          {classes.modulesReferences?.map((module) => (
            <div key={module._id}>
              <p>{module.name}</p>
              {module.lessonsReferences?.map((lesson) => (
                <div key={lesson._id}>
                  <Link href={`/lessons/${lesson.slug}`}>
                    <p>{lesson.title}</p>  
                  </Link>
                  
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {console.log(modules)}
      

        {children}
    </div>
  )
}

//&& classIdentifier == ${secureLocalStorage.getItem('classId')}

/*modulesReferences[]->{
          _id,
          name,
          lessonsReferences[]->{
              _id,
              title,
              "slug": slug.current,
          }
        }*/