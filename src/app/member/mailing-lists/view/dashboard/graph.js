/** */
import React, { useEffect, useState } from 'react';
import {
    CartesianGrid,
    LineChart, Line, CartesianAxis, ReferenceLine,
    ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import { Bar } from 'react-chartjs-2';
import { processDataByWeek, processDataByWeekForChartsJS } from '../../../../shared/utils/graph';
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

                setGraphData(
                    is_mobile_view ? processDataByWeek(contacts) :
                        processDataByWeekForChartsJS(contacts)
                );
        }
    }, [contacts, period, is_mobile_view]);

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
                        <YAxis allowDecimals={false} padding={{ top: 5 }} />

                    </LineChart>
                </ResponsiveContainer> :
                <Bar data={graph_data} />
        }
    </div>
}

export default AudienceGraph;