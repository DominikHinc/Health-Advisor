import { ADD_QUESTION, CHANGE_SHOWDETAILS, SHIFT_STACK, NEXT_QUESTION, SET_CARD_VALIDATION, SET_FORM_DATA } from "./actions";
import { QUESTIONS } from "../constants/QUESTIONS";


const initialState = {
    cardsInfo: [],
    formInfo: {},
    questionStack: [
        QUESTIONS.height,
        QUESTIONS.weight,
        QUESTIONS.age,
        QUESTIONS.sex,
        QUESTIONS.isSmoking,
        QUESTIONS.sbp,
        QUESTIONS.dbp
    ],
    cardsValidation: {

    },
    currentTopIndex: -1
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_QUESTION:
            let areAllValid = true;
            for (let item in state.cardsValidation) {
                //console.log(state.cardsValidation[item])
                if (state.cardsValidation[item] === false) {
                    areAllValid = false;
                }
            }
            if (areAllValid === false) {
                return state;
            }

            let stackCopied = state.questionStack;

            if (state.cardsInfo[state.currentTopIndex] !== undefined) {
                console.log(state.cardsInfo[state.currentTopIndex])
                switch(state.cardsInfo[state.currentTopIndex].objectIndetifier){
                    case 'sex':
                        if(state.formInfo.sex === false){  
                            stackCopied = [QUESTIONS.isPregnant,...stackCopied]
                        }
                        break;
                    case 'isPregnant':
                        if(state.formInfo.isPregnant === true){  
                            stackCopied = [QUESTIONS.pregnancyWeek,...stackCopied]
                        }
                        break;
                    case 'isSmoking':
                        if(state.formInfo.isSmoking === true){  
                            stackCopied = [QUESTIONS.yearsOfSmoking,...stackCopied]
                        }
                        break;
                    case 'yearsOfSmoking':
                        stackCopied = [QUESTIONS.packOfSmoking,...stackCopied]
                }
            }
            console.log(stackCopied)
            const topQuestion = stackCopied[0]
            const topIndexCopy = state.currentTopIndex + 1;

            stackCopied.shift();
            const updatedCards = [...state.cardsInfo, topQuestion]
            return { ...state, cardsInfo: updatedCards, questionStack: stackCopied, currentTopIndex: topIndexCopy }
        case ADD_QUESTION:
            const newCard = {
                id: action.id,
                title: action.title,
                content: action.content,
                showDetails: true
            }
            const updatedCardsInfo = [...state.cardsInfo, newCard]
            return { ...state, cardsInfo: updatedCardsInfo }
        case SHIFT_STACK:
            const stackCopy = state.questionStack;
            stackCopy.shift();
            return { ...state, questionStack: stackCopy }
        case SET_CARD_VALIDATION:
            const cardsValidationCopy = state.cardsValidation;
            cardsValidationCopy[action.id] = action.isValid;
            //console.log(cardsValidationCopy)
            return { ...state, cardsValidation: cardsValidationCopy }
        case SET_FORM_DATA:
            const formCopy = state.formInfo;
            formCopy[action.id] = action.data;
            console.log(formCopy);

            return { ...state, formInfo: formCopy }
        default:
            return state
    }
}