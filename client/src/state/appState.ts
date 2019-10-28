export interface IUser {
    firstname:string;
    lastname:string;
    username:string;
    password:string;
}

export interface ILogin{
    errorMessage:string;
}

export interface IUI{
    counter: number;
    loggedIn: boolean;
    waitingForResponse:boolean;
    Login: ILogin;
}

export interface ILessonData {
    _id?: any;
    lesson_name: string;
    lesson_duration?:number;
    lesson_location?: string;
    lesson_price?: number;
    lesson_equip?: string;
    lesson_language?:string;
    lesson_amountPeople?: string;
    lesson_eMailTeacher?: string;
    lesson_aboutTeacher?: string;

  }

export interface IBM{
    user:IUser;
    lessons:ILessonData[],
    searchQuery:string,
    searchResult: any
}

export interface IState{
    UI:IUI;
    BM:IBM;
}

// initial state 
// initial state
export const initial:IState = {
    UI: {
        counter: 0,
        loggedIn: false,
        waitingForResponse: false,
        Login: {errorMessage:""}
   },
    BM: {
       user:{
           firstname:"",
           lastname:"",
           username:"",
           password:""
       },
       lessons:[],
       searchQuery:"",
       searchResult: []
    }
};