/** */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './stat.css';

const StatCard = props => {
    let { title, count, base_color, path } = props;
    let history = useHistory();

    let [style, setStyle] = useState({});
    useEffect(() => {
        if (!base_color) return;
        setStyle({
            card: {
                backgroundColor: `hsla(${base_color}, 100%, 95%, 0.35)`,
                border: `1px solid hsl(${base_color}, 100%, 92%)`,
                borderLeft: `4px solid hsl(${base_color}, 58%, 47%)`,
                borderRadius: '5px',
                padding: '10px'
            },
            title: {
                fontWeight: 'bold',
                color: `hsl(${base_color}, 89%, 15%)`,
            },
            value: {
                fontWeight: 'bold',
                color: `hsl(${base_color}, 61%, 29%)`,
            }
        })
    }, [base_color]);

    const navigate = () => {
        history.push(path);
    }

    const processCount = (count = 0) => {
        let integer_value = Number(count);
        if (integer_value > 9999 && integer_value <= 999999) {
            return `${(integer_value / 1000).toFixed(2)}K`;
        }

        if (integer_value > 999999) {
            return `${(integer_value / 1000000).toFixed(2)}M`;
        }

        return integer_value;
    }

    return <div style={style.card} onClick={navigate}>
        <div className="stat-card-title" style={style.title}>
            {`${title}`}
        </div>
        <div className="stat-card-value" style={style.value}>
            {processCount(count) || 0}
        </div>
    </div>
}

export default StatCard;