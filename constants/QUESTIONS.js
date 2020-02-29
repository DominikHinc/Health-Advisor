import {Question} from '../models/Question'

export const NUMERIC = 'NUMERIC'
export const TRUEFALSE = 'TRUEFALSE'
export const OTHER = 'OTHER'

export const QUESTIONS = {
    height: new Question('1','Height','Your height in centimeters',NUMERIC,'height'),
    weight: new Question('2',"Weight",'Your weight in kilograms',NUMERIC,'weight'),
    age: new Question('3','Age','Your age',NUMERIC,'age'),
    sex: new Question('4','Sex','Your sex',TRUEFALSE,'sex'),
    isPregnant: new Question('5','Pregnancy', 'Are you pregnant?', TRUEFALSE,'isPregnant'),
    pregnancyWeek: new Question('6',"Week of pregnancy", "How many weeks have you been pregnant?",NUMERIC,'pregnancyWeek'),
    isSmoking: new Question('7',"Smoking",'Are you/Have you been smoking?',TRUEFALSE,'isSmoking'),
    yearsOfSmoking: new Question('8','Years Of Smoking', 'How many years?',NUMERIC,'yearsOfSmoking'),
    packOfSmoking: new Question('9','Packs per day','How many packs per day have you been smoking eg. half pack a day is 0.5',NUMERIC,'packOfSmoking'),
    sbp: new Question('10','Systolic blood pressure', 'The top number. So, for 135/80 it is 135',NUMERIC,'sbp'),
    dbp: new Question('11','Diastolic blood pressure',"The bottom number. So, for 135/80 it is 80",NUMERIC,'dbp'),
    others: new Question('12','Optional Conditions',"Mark to get Disease-Specific Recommendations",OTHER,'other')

}