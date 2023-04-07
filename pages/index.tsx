import React from "react"
import Head from 'next/head'


import { GetStaticProps } from 'next'
import { Class, ModuleReference } from '../typings'
import { fetchClass } from '../utils/fetchClass'
import { fetchModules } from '../utils/fetchModules'

import ClassInfo from "../components/ClassInfo"
import Modules from "../components/Modules"


type Props = {
  classInfo: Class[]
  //modules: ModuleReference[];
}



const Home = ({classInfo, /*modules*/}: Props) => {


  return (
    <>
        <Head>
          <title>Expovision E-Learning</title>
        </Head>
        <main>         
  
            <ClassInfo classInfo={classInfo} />
            <Modules /*modules={modules}*/ />
        
        </main>
        
      </>

      
    
  )
}

export default Home;


export const getStaticProps: GetStaticProps<Props> = async () => {
  const classInfo: Class[] = await fetchClass();
  //const modules: ModuleReference[] = await fetchModules();

  return {
    props: {
      classInfo,
      //modules,
    }
  }
}