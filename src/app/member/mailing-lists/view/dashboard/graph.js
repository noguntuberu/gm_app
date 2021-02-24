/** */
import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, CartesianGrid, Legend,
    ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import { processDataByWeek } from '../../../../shared/utils/graph';

const AudienceGraph = props => {
    const { contacts } = props;
    const [graph_data, setGraphData] = useState([]);
    const [period, setPeriod] = useState('week');

    useEffect(() => {
        if (!contacts) return;
        switch (period) {
            case 'month':
                setPeriod('month');
                break;
            default:
                setPeriod('week');
                setGraphData(processDataByWeek(contacts));
        }
    }, [contacts, period]);

    return <ResponsiveContainer width='100%' height={470}>
        <BarChart data={graph_data}>
            <CartesianGrid strokeDasharray='2 2' />
            <Legend align="center" verticalAlign="top" height={50} />
            <Bar
                dataKey='unsubscribers'
                legendType='rect'
                name='unsubscribed contacts'
                fill="rgba(141, 0, 42, 0.65)"
            />
            <Bar
                dataKey='subscribers'
                legendType='rect'
                name='new subscribers'
                fill="rgb(117, 177, 117)"
            />
            <Tooltip />
            <XAxis dataKey='date' reversed={true} angle={-30} />
            <YAxis allowDecimals={false} label={{ value: "Count", angle: -90 }} padding={{top: 10}}/>

        </BarChart>
    </ResponsiveContainer>
}

export default AudienceGraph;