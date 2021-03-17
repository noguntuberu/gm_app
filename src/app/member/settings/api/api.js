import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';
import * as KeyService from '../../../../services/key';

import './api.css';

const APISetting = () => {
    let { id, firstname } = useSelector(state => state.user_data);
    let [loading, setLoading] = useState(false);
    let [api_key, setAPIKey] = useState('');

    useEffect(() => {
        KeyService.readById(id).then(response => {
            let { error, payload } = response;
            if (error) {
                return;
            }

            setAPIKey(payload.key);
        }).catch(e => e);
    }, [id]);

    let submitForm = () => {
        let data = {
            id,
            name: firstname,
        };

        setLoading(true);
        KeyService.create({ data}).then( response =>{
            let { error, payload} = response;
            if (error) {
                toast.error(error);
                return;
            }

            setAPIKey(payload.key);
            toast.success(`API Key generated successfully.`);
        }).catch( e=> e).finally(() => setLoading(false));
    }

    return <div>
        <section>
            <div className="api-key-wrapper">
                <div>api key</div>
                <div>{api_key.substr(0, 25)}...</div>
            </div>
            <div>
                <small className="pt-2 text-secondary">**click on key to copy.</small>
            </div>
            <div className="pt-3">
                {!loading ?
                    <div className="gm-btn gm-btn-primary float-right flexible-save-btn shadow" onClick={e => submitForm()}> Regenerate Key </div> :
                    <div className="gm-btn gm-btn-primary float-right flexible-save-btn shadow"> Regenerating <span className="gm-btn-spinner"><Spinner /></span> </div>
                }
            </div>
        </section>
    </div>
}

export default APISetting;