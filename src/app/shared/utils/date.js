/** */
const MONTH_MAP = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const NUM_OF_MILLISECONDS_IN_ONE_DAY = 86400000;

/** */
const convertDateFromIsoToHTMLFormat = iso_date => {
    const date = new Date(iso_date);
    const day = padDateValue(date.getDate());
    const month = padDateValue(date.getMonth() + 1);
    const year = date.getFullYear();

    const converted_date = `${year}-${month}-${day}`;
    return converted_date;
}

/**
 * Extracts day string of the given timestamp for graphs. Return ex. 'Jan 10'
 * @param {Number} timestamp 
 */
const extractDayStringForGraph = timestamp => {
    let date = new Date(timestamp);
    let month = MONTH_MAP[date.getMonth()];
    let day = padDateValue(date.getDate());

    return `${month} ${day}`;
}

const generateHTMLFormDateTimeDefaults = () => {
    const date = (new Date()).toISOString();
    const generated_date = `${convertDateFromIsoToHTMLFormat(date)}`;
    return generated_date;
}

/**
 * Generates a configuration of back-counted days starting from a base time.
 *  
 * @param {*} base_timestamp The day to start back count
 * @param {*} spread The numbers of days to count back.
 */
const generateDaysConfigurationForGraph = (base_timestamp, spread = 7) => {
    let curr_timestamp = getDayTimestampForRawTimestamp(base_timestamp);
    let config = {};
    for (let i = 0; i < spread; i++) {
        let date_string = extractDayStringForGraph(curr_timestamp);
        config[date_string] = {
            date: date_string,
            unsubscribers: 0,
            subscribers: 0,
        };
        curr_timestamp -= NUM_OF_MILLISECONDS_IN_ONE_DAY;
    }
    return config;
}

/**
 * Generates the number of milliseconds at (12:00AM) for the date specified in the raw_timestamp.
 * 
 * @param {Number} raw_timestamp number of milliseconds 
 */
const getDayTimestampForRawTimestamp = raw_timestamp => {
    const date = new Date(raw_timestamp);
    const day = `${padDateValue(date.getMonth() + 1)}/${padDateValue(date.getDate())}/${date.getFullYear()}`;
    return Date.parse(day);
}

/**
 * prefixes 0 on numbers with single digits.
 * @param {Number} value 
 */
const padDateValue = value => {
    return value < 10 ? `0${value}` : value;
}

export {
    convertDateFromIsoToHTMLFormat,
    extractDayStringForGraph,
    generateDaysConfigurationForGraph,
    generateHTMLFormDateTimeDefaults,
    getDayTimestampForRawTimestamp,
    padDateValue,
}