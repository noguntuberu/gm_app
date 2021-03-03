/** */
import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, CartesianGrid, Legend,
    LineChart, Line, CartesianAxis, ReferenceLine,
    ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import { processDataByWeek } from '../../../../shared/utils/graph';
import { useSelector } from 'react-redux';

const AudienceGraph = props => {
    const { contacts } = props; 
    const [graph_data, setGraphData] = useState([]);
    const [period, setPeriod] = useState('week');
    const { is_mobile_view } = useSelector(state => state.metadata);

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

    return <div>
        {
            is_mobile_view ?
                <ResponsiveContainer width='100%' minHeight={250}>
                    <LineChart data={graph_data} margin={{ left: -40 }}>
                        <ReferenceLine />
                        <CartesianAxis viewBox={{ width: '100%', height: 250 }} />
                        <CartesianGrid strokeDasharray='3 1 3' />
                        <Line
                            type="monotone"
                            dataKey='unsubscribers'
                            name='unsubscribers'
                            fill="rgba(141, 0, 42, 0.65)"
                        />
                        <Line
                            type="monotone"
                            dataKey='subscribers'
                            name='new subscribers'
                            fill="rgb(117, 177, 117)"
                        />
                        <Tooltip />
                        <XAxis dataKey='date' angle={-30} reversed={true} padding={{ left: 0 }} />
                        <YAxis allowDecimals={false} padding={{ top: 0 }} />

                    </LineChart>
                </ResponsiveContainer> :

                <ResponsiveContainer width='100%' minHeight={300}>
                    <BarChart data={graph_data} margin={{ left: -10 }}>
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
                        {
                            !is_mobile_view ?
                                <YAxis allowDecimals={false} label={{ value: "Count", angle: -90 }} padding={{ top: 10 }} /> :
                                <YAxis allowDecimals={false} padding={{ top: 10 }} />
                        }

                    </BarChart>
                </ResponsiveContainer>
        }
    </div>
}

export default AudienceGraph;