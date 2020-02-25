export const threeNumbersValidation = {
    value:{
      format: {
        pattern: "[0-9]+",
        message: "To pole może zawierać jedynie liczby"
      },
      length: {maximum: 3}
    }
}
export const twoNumbersValidation ={
  value:{
    format: {
      pattern: "[0-9]+",
      message: "To pole może zawierać jedynie liczby"
    },
    length: {maximum: 2}
  }
}

export const floatValidation ={
  value:{
    format: {
      pattern: " /^[-+]?[0-9]+\.[0-9]+$/",
      message: "To pole może zawierać jedynie liczby"
    },
    length: {maximum: 2}
  }
}