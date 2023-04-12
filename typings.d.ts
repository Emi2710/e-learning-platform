export interface Class {
    _id : string;
    _createdAt: string;
    name: string;
    slug: {
        current: string;
    };
    studying: string;
    startDate: string;
    endDate: string;
    studentsNumber: number;
    classTeacher: Teacher;
    modulesReferences: ModulesReferences;
    
    
}

export interface Teacher  {
  _id: string;
  name: string;
  imgUrl: any;
};

export interface ModuleReference  {
  _id: string;
  name: string;
  lessonsReferences: LessonReference[];
};

type LessonReference = {
  _id: string;
  title: string;
  slug: {
        current: string;
    };
  body: [object];
};


type ModulesReferences = Array<ModuleReference>;
type LessonsReferences = Array<LessonReference>;

export interface ClassLogin {
    _id : string;
    _createdAt: string;
    classIdentifier: string;
    password: string;
    slug: {
        current: string;
    };
    
    
    
}



