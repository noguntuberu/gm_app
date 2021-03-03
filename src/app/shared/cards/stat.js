/** */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './stat.css';

const StatCard = props => {
    let { title, count, border_color, path } = props;
    let history = useHistory();

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

    return <div className={`shadow-sm py-2 px-3 mx-0 gm-stat-card gm-card-border-${border_color}`} onClick={navigate}>
        <div className="stat-card-title">
            {`${title}`}
        </div>
        <div className="mt-1 stat-card-value">
            {processCount(count) || 0}
        </div>
    </div>
}

export default StatCard;