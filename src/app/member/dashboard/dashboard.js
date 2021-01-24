/** */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';

const GMDashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div>

    </div>
}

export default GMDashboard;