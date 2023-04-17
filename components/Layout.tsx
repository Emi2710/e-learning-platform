
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';

import { Class } from '../typings'
import { sanityClient } from '../client/sanity';
import { GetStaticProps } from 'next';
import secureLocalStorage from  "react-secure-storage";



import logo from '../assets/expo-logo.svg';
import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';
import hamnight from '../assets/hamburger-night.svg'
import hamlight from '../assets/hamburger-light.svg'
import logout from '../assets/logout.svg';
import Image from 'next/image';
import Switch from './Switch';
import Link from 'next/link';


type Props = {children: any}



export default function Layout({children}: Props) {

  const router = useRouter();

    function logOut() {
      sessionStorage.removeItem('user');
      secureLocalStorage.removeItem('isLoggedIn')
      localStorage.removeItem('classId')
      router.push("/")
    }



  const classId = localStorage.getItem('classId');
  const [modules, setModules] = useState<Class[]>([])
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");

  const showNavbar = () => {
    setOpen(!open)
  }

  

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

  useEffect(() => {
    const root = window.document.documentElement;
    const isDarkMode = mode === "dark";

    root.classList.remove(isDarkMode ? "light" : "dark");
    root.classList.add(mode);

    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("mode") as "light" | "dark";
    savedMode && setMode(savedMode);
  }, []);

  return (
    <div>
      
      {modules?.map((classes) => (
        <div>

        <div className='flex justify-between p-5'>
                <Link href={`/classes/${classes.slug.current}`}>
                  <Image src={logo} alt='expovision logo' />
                </Link>
                
                <div className='flex'>
                  <Image src={logout} alt="logout icon" width={25} onClick={logOut} className="cursor-pointer" />
                  {mode === "light" && (<><Image src={sun} alt="sun icon" className='mx-3 cursor-pointer' onClick={toggleMode}/></>)}
                  {mode === "dark" && (<><Image src={moon} alt="moon icon" className='mx-3 cursor-pointer' onClick={toggleMode}/></>)}
                  
                  {mode === "light" && (<><Image src={hamlight} alt="hamburger menu light" onClick={showNavbar} className='cursor-pointer' /></>)}
                  {mode === "dark" && (<><Image src={hamnight} alt="hamburger menu dark" onClick={showNavbar} className='cursor-pointer' /></>)}
                  
                  
                </div>
        </div>

          {open && (

            <div>
              {classes.modulesReferences?.map((module) => (
                <div key={module._id} className="p-5 bg-white bg-opacity-20">
                  <ul>
                    <li className='font-bold text-xl my-2'>{module.name}</li>
                  </ul>
                  {module.lessonsReferences?.map((lesson) => (
                    <ul key={lesson._id}>
                      <Link href={`/lessons/${lesson.slug}`}>
                        <li className='pl-2 opacity-80 my-1'>{lesson.title}</li>  
                      </Link>
                      
                    </ul>
                  ))}
                </div>
              ))}
            </div>

          )}

        </div>
        
      ))}


        {children}
        
    </div>
  )
}
