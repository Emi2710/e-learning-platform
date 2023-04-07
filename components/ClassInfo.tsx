import React from "react";
import Link from "next/link";
import { Class } from "../typings";

type Props = {
  classInfo: Class[];
};

export default function ClassInfo({ classInfo }: Props) {

    //console.log(classInfo)

  return (
    <>
    <div>
        {classInfo?.map((data) => (
                    <>
                        <p>{data.name}</p>
                        <p>Start date: {data.startDate}</p>
                        <p>Students number: {data.studentsNumber}</p>
                        <p>Studying: {data.studying}</p>

                        <div>
                            {data?.modulesReferences?.map((module) => (
                                <>
                                    <p>{module.name}</p> 
                                    {module.lessonsReferences?.map((lesson) => (
                                        <>
                                            <p>{lesson.title}</p>
                                        </>
                                    ))}                             
                                </>
                            ))}
                        </div>
                    </>
        ))}

    </div>

        

        
      
    </>
  );
}