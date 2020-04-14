import { QUESTIONS } from "../constants/QUESTIONS";
import { NEXT_QUESTION, RESET, SET_CARD_VALIDATION, SET_FORM_DATA, SHIFT_STACK } from "./actions";


const initialState = {
    cardsInfo: [QUESTIONS.height],
    formInfo: {},
    questionStack: [

        QUESTIONS.weight,
        QUESTIONS.age,
        QUESTIONS.sex,
        QUESTIONS.isSmoking,
        QUESTIONS.sbp,
        QUESTIONS.dbp,
        QUESTIONS.others
    ],
    cardsValidation: {

    },
    currentTopIndex: 0,
    noMoreQuestions: false
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_QUESTION:
            let areAllValid = true;
            for (let item in state.cardsValidation) {
                
                if (state.cardsValidation[item] === false) {
                    areAllValid = false;
                }
            }
            if (areAllValid === false) {
                return state;
            }

            let stackCopied = state.questionStack;
            if (stackCopied.length < 1) {
              
                return { ...state, noMoreQuestions: true }
            }

            if (state.cardsInfo[state.currentTopIndex] !== undefined) {
             
                switch (state.cardsInfo[state.currentTopIndex].objectIndetifier) {
                    case 'sex':
                        if (state.formInfo.sex === false) {
                            stackCopied = [QUESTIONS.isPregnant, ...stackCopied]
                        }
                        break;
                    case 'isPregnant':
                        if (state.formInfo.isPregnant === true) {
                            stackCopied = [QUESTIONS.pregnancyWeek, ...stackCopied]
                        }
                        break;
                    case 'isSmoking':
                        if (state.formInfo.isSmoking === true) {
                            stackCopied = [QUESTIONS.yearsOfSmoking, ...stackCopied]
                        }
                        break;
                    case 'yearsOfSmoking':
                        stackCopied = [QUESTIONS.packOfSmoking, ...stackCopied]
                }
            }
           
            const topQuestion = stackCopied[0]
            const topIndexCopy = state.currentTopIndex + 1;

            stackCopied.shift();
            const updatedCards = [...state.cardsInfo, topQuestion]
            return { ...state, cardsInfo: updatedCards, questionStack: stackCopied, currentTopIndex: topIndexCopy }
        case SHIFT_STACK:
            const stackCopy = state.questionStack;
            stackCopy.shift();
            return { ...state, questionStack: stackCopy }
        case SET_CARD_VALIDATION:
            const cardsValidationCopy = state.cardsValidation;
            cardsValidationCopy[action.id] = action.isValid;
       
            return { ...state, cardsValidation: cardsValidationCopy }
        case SET_FORM_DATA:
            const formCopy = state.formInfo;
            formCopy[action.id] = action.data;
           

            return { ...state, formInfo: formCopy }
        case RESET: {
            return {
                cardsInfo: [QUESTIONS.height],
                formInfo: {},
                questionStack: [

                    QUESTIONS.weight,
                    QUESTIONS.age,
                    QUESTIONS.sex,
                    QUESTIONS.isSmoking,
                    QUESTIONS.sbp,
                    QUESTIONS.dbp,
                    QUESTIONS.others
                ],
                cardsValidation: {

                },
                currentTopIndex: 0,
                noMoreQuestions: false
            };
        }
        default:
            return state
    }
}