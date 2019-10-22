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
}

export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse: boolean;
    Login: ILogin;
}

export interface ILessonData {
    _id: string;
    lesson_name: string;
    lesson_value: number;
    lesson_duration:number;
    lesson_location: string;
    lesson_price: number;
    lesson_equip: string;
    lesson_language:string;
    lesson_amountPeople: string;
    lesson_eMailTeacher: string;
    lesson_aboutTeacher: string;

  }

export interface IBM{
    user:IUser;
    lessons:ILessonData[]
}


export interface IState{
    UI:IUI;
    BM:IBM;
}

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
        lessons:[]
	}
};
