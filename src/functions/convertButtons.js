
// This function takes the button ref as an array and loop through them to change their button visibility in the given option
export const convertButtons = (refNames = [], convertOption) => {
    for(let refName of refNames) {
        refName.current.disabled = convertOption;
    }
}