import {
    extractDayStringForGraph,
    generateDaysConfigurationForGraph,
} from '../utils/date';

/**
 * Process graph data on a weekly basis. 
 * 
 * @param {*} data The data to iterate over
 * 
 * @returns [{
 *  name: '',
 *  value: 0
 * }]
 */
export const processDataByWeek = (data) => {
    let days_config = generateDaysConfigurationForGraph(Date.now(), 7);

    data.forEach( datum => {
        let field = 'time_added';
        let config_key = 'subscribers';
        if (datum.is_unsubscribed) {
            config_key = 'unsubscribers';
            field = 'time_removed';
        }
        let date = datum[field];
        let day_string = extractDayStringForGraph(date);
        
        if (!days_config[day_string]) {
            return;
        }
        
        days_config[day_string][config_key] += 1;
    });
    
    return Object.values(days_config);
}

export const processDataByWeekForChartsJS = (data) => {

    let days_config = generateDaysConfigurationForGraph(Date.now(), 7);
    let labels = Object.keys(days_config);
    let subscribers = [], unsubscribers = [];

    data.forEach( datum => {
        let field = 'time_added';
        let config_key = 'subscribers';
        if (datum.is_unsubscribed) {
            config_key = 'unsubscribers';
            field = 'time_removed';
        }
        let date = datum[field];
        let day_string = extractDayStringForGraph(date);

        if (!days_config[day_string]) {
            return;
        }

        days_config[day_string][config_key] += 1;
    });

    Object.values(days_config).forEach(config => {
        subscribers.push(config.subscribers);
        unsubscribers.push(config.unsubscribers);
    });

    return {
        labels: labels.reverse(),
        datasets: [
            {
                data: subscribers.reverse(),
                backgroundColor: 'hsl(130, 58%, 47%)',
                label: 'subscribers',
                fill: false,
            },
            {
                data: unsubscribers.reverse(),
                backgroundColor: 'hsl(342, 58%, 47%)',
                label: 'unsubscribers',
                fill: false,
            }
        ]
    };
}