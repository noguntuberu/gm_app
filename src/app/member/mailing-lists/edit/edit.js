import { toast } from 'react-toastify';
import React, { useState, useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPageTitle } from '../../../../store/actions/header';
import * as AudienceService from '../../../../services/audience';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

const AudienceUpdationForm = ({ mailing_list }) => {
    let dispatch = useDispatch();
    const { token, id } = useSelector(state => state.user_data);

    const [loading, setLoading] = useState(false);
    const [audience_id, setAudienceId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setAudienceId(mailing_list.id);
        setName(mailing_list.name);
        setDescription(mailing_list.description);
    }, [mailing_list]);
    
    const clearForm = () => {
        setDescription('');
        setName('');
    }

    const submit = async () => {
        const data = {
            name,
            description,
            tenant_id: id,
        };

        if (!name || !description) {
            toast.error('please fill all fields.');
            return;
        }

        setLoading(true);
        const { error } = await AudienceService.updateById(audience_id, { data, token, })
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(false);
        toast.success(`Audience updated.`);
        dispatch(setPageTitle(name));
        clearForm();
    }

    return <div>
        <div className="form-group">
            <input className="gm-input" type="text" placeholder="Name" defaultValue={name} onInput={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
            <textarea className="gm-input" placeholder="Description" defaultValue={description} onInput={e => setDescription(e.target.value)}>

            </textarea>
        </div>
        <div className="mt-3 mb-3 form-row">
            <div className="col-md-8"></div>
            <div className="col-md-4 pr-md-0 px-sm-0">
                {!loading ?
                    <div className="gm-btn gm-btn-blue" onClick={submit}>Update</div> :
                    <div className="gm-btn gm-btn-blue">Updating<span className="gm-btn-spinner"><Spinner /></span></div>
                }
            </div>
        </div>
    </div>
}

export default AudienceUpdationForm;