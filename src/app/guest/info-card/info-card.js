/** */
import React from 'react';
import './info-card.css';
import site_icon from '../../../assets/icons/logo-white.svg';
import { useHistory } from 'react-router-dom';

const InfoCard = props => {
    let { bg_class } = props;
    let history = useHistory();

    return <div className={`info-card gm-bg-blue-3 ${bg_class || ''}`}>
        <header onClick={() => history.push('/')}>
            <div className="icon">
                <img alt="site logo" src={site_icon} />
            </div>
        </header>
        <section className="text-orange-light">
            <div>EMAIL <br/> MARKETING.</div>
            <div>SIMPLE. <span className="text-blue-11">FOCUSED.</span> AFFORDABLE</div>
        </section>
    </div>
}

export default InfoCard;