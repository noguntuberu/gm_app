/** */
import React from 'react';
import './info-card.css';
import site_icon from '../../../assets/icons/site-icon-color.svg';
import site_name from '../../../assets/icons/site-name/site-name-color.svg';

const InfoCard = props => {
    let { bg_class } = props;

    return <div className={`info-card gm-bg-blue-5 ${bg_class || ''}`}>
        <header>
            <div className="icon">
            <img alt="site logo" src={site_icon} />
            </div>
            <div className="name">
                <img alt="site name" src={site_name} />
            </div>
        </header>
        <section className="text-blue-11">
            <div>SIMPLE.</div>
            <div>FOCUSED.</div>
            <div>EFFICIENT.</div>
        </section>
    </div>
}

export default InfoCard;