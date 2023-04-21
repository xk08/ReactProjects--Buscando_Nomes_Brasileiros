const textLengthValidation = (event, minLength) => {
    let textIsValid = false;
    if (event.target.value.length >= minLength) {
        textIsValid = true;
    }
    return { isValid: textIsValid, textLength: event.target.value.length };
}
export default textLengthValidation;