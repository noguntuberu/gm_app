/** */
const padDateValue = value => {
    return value < 10 ? `0${value}` : value;
}

export const convertDateFromIsoToHTMLFormat = iso_date => {
    const date = new Date(iso_date);
    const day = padDateValue(date.getDate());
    const month = padDateValue(date.getMonth() + 1);
    const year = date.getFullYear();

    const converted_date = `${year}-${month}-${day}`;
    return converted_date;
}