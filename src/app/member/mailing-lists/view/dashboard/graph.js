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

    const bar_chart_options = {

        scales: {
            yAxes: [{
                gridLines: {
                    display: true,
                },
                ticks: {
                    stepSize: 1,
                    min: 0,
                    suggestedMax: 5
                }
            }]
        }
    };

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
                <ResponsiveContainer width='100%' minHeight={275}>
                    <LineChart data={graph_data} margin={{ left: -45 }}>
                        <ReferenceLine />
                        <CartesianAxis viewBox={{ width: '100%', height: 250 }} />
                        <CartesianGrid strokeDasharray='4 1 4' />
                        <Line
                            type="monotone"
                            dataKey='unsubscribers'
                            name='unsubscribers'
                            fill="hsl(342, 58%, 47%)"
                        />
                        <Line
                            type="monotone"
                            dataKey='subscribers'
                            name='new subscribers'
                            fill="hsl(130, 58%, 47%)"
                        />
                        <Tooltip />
                        <XAxis dataKey='date' reversed={true} padding={{ left: 0 }} />
                        <YAxis allowDecimals={false} padding={{ top: 5 }} />

                    </LineChart>
                </ResponsiveContainer> :
                <Bar data={graph_data} width={100} height={60} options={bar_chart_options} />
        }
    </div>
}

export default AudienceGraph;