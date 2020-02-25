export const ADD_QUESTION = 'ADD_QUESTION'
export const SHIFT_STACK = 'SHIFT_STACK'
export const NEXT_QUESTION = 'NEXT_QUESTION'
export const SET_CARD_VALIDATION = 'SET_CARD_VALIDATION'
export const SET_FORM_DATA = 'SET_FORM_DATA'

export const addQuestion = (id,title,content)=>{
    return{
        type:ADD_QUESTION,
        id,
        title,
        content
    }
}

export const setFormData = (id, data)=>{
    return{
        type:SET_FORM_DATA,
        id,
        data
    }
}

export const setCardValid = (id, isValid)=>{
    return{
        type:SET_CARD_VALIDATION,
        id,
        isValid
    }
}


export const nextQuestion = () =>{
    return{
        type:NEXT_QUESTION
    }
}



export const shiftStack = () =>{
    return {
        type:SHIFT_STACK
    }
}
