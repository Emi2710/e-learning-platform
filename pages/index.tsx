import React from "react"
import Head from 'next/head'


import { GetStaticProps } from 'next'
import { sanityClient } from "../client/sanity"

import { Class } from '../typings'

import ClassInfo from "../components/ClassInfo"


type Props = {
  classes: Class[]
  
}



const Home = ({classes}: Props) => {


  return (
    <>
        <Head>
          <title>Expovision E-Learning</title>
        </Head>
        <main>         
  
            <ClassInfo classes={classes} />
        
        </main>
        
      </>

      
    
  )
}

export default Home;


export const getStaticProps: GetStaticProps<Props> = async () => {
  const classes = await sanityClient.fetch(`*[_type == "classes"]{
    _id,
    name,
    studying, 
    startDate,
    studentsNumber,
    modulesReferences[]->{
      _id,
      name,
      lessonsReferences[]->{
        _id,
        title,
        body
      }
    }
  }`)
  return { props: { classes } }
}


