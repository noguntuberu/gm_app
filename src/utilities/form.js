/** */

export const determineFormAlertClass = code => {
    switch (code) {
        case 0:
            return 'd-block alert-danger';
        case 1:
            return 'd-block alert-success';
        default:
            return '';
    }
}
export const formIsEmpty = (form) => {
    if (!Object.keys(form).length) return true;

    for (let key in form) {
        if (!key) return true;
    }

    return false;
}