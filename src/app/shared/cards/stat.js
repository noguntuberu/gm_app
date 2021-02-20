/** */
import React from 'react';

const StatCard = props => {
    const { title, count, border_color } = props;

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
    return <div className={`shadow-sm py-2 px-3 mx-0 gm-stat-card gm-card-border-${border_color}`}>
        <div className="">
            {`${title}`}
        </div>
        <div className="mt-2">
        <h2>{processCount(count) || 0}</h2>
        </div>
    </div>
}

export default StatCard;