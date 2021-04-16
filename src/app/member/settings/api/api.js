import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';
import * as KeyService from '../../../../services/key';
import { addMetadata } from '../../../../store/actions/metadata';

import './api.css';

const APISetting = () => {
    let dispatch = useDispatch();
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
            dispatch(addMetadata({ api_key: payload.key }));
        }).catch(e => e);
    }, [id, dispatch]);

    let copyAPIKey = () => {
        navigator.clipboard.writeText(api_key)
            .then(() => toast.info('Copied.'))
            .catch(e => e);
    }

    let submitForm = () => {
        let data = {
            id,
            name: firstname,
        };

        setLoading(true);
        KeyService.create({ data }).then(response => {
            let { error, payload } = response;
            if (error) {
                toast.error(error);
                return;
            }

            setAPIKey(payload.key);
            dispatch(addMetadata({ api_key: payload.key }));
            toast.success(`API Key generated successfully.`);
        }).catch(e => e).finally(() => setLoading(false));
    }

    return <div className="pt-md-3">
        <div className="mb-4">
            Your API key allows you to programmatically integrate with and perform actions
            from your own applications. Your key should be kept privately and securely.
        </div>
        <div className="api-key-wrapper">
            <div>api key</div>
            <div className="is-clickable" onClick={copyAPIKey}>{api_key.substr(0, 25)}...</div>
        </div>
        <div>
            <small className="pt-2 text-blue-5">**click on key to copy.</small>
        </div>
        <div className="mt-3 mb-3 form-row">
            <div className="col-md-8"></div>
            <div className="col-md-4 pr-md-0 px-sm-0">
                {!loading ?
                    <div className="gm-btn gm-btn-blue" onClick={e => submitForm()}> Regenerate </div> :
                    <div className="gm-btn gm-btn-blue"> Regenerating <span className="gm-btn-spinner"><Spinner /></span> </div>
                }
            </div>
        </div>
    </div>
}

export default APISetting;