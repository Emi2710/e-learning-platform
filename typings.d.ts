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

type ModuleReference = {
  _id: string;
  name: string;
  lessonsReferences: LessonsReferences;
};

type LessonReference = {
  title: string;
  body: [object];
};


type ModulesReferences = Array<ModuleReference>;
type LessonsReferences = Array<LessonReference>;

