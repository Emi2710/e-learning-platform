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
    modulesReferences: ModulesReferences;
    
    
}

export interface ModuleReference  {
  _id: string;
  name: string;
  lessonsReferences: LessonReference[];
};

type LessonReference = {
  title: string;
  body: [object];
};


type ModulesReferences = Array<ModuleReference>;
type LessonsReferences = Array<LessonReference>;

