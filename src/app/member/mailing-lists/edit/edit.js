import { toast } from 'react-toastify';
import React, { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AudienceService from '../../../../services/audience';
import { addOneAudienceToStore } from '../../../../store/actions/audience';

const AudienceUpdationForm = ({ mailing_list }) => {
    const dispatch = useDispatch();
    const { token, id } = useSelector(state => state.user_data);

    const [description, setDescription] = useState(mailing_list.description || '');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(mailing_list.name || '');

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
        const { error } = await AudienceService.updateById(mailing_list.id, { data, token, })
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(false)
        toast.success(`Audience updated.`)
        dispatch(addOneAudienceToStore({ ...data, id: mailing_list.id }));
    }

    return <div>
        <div className="form-group">
            <input className="form-control" type="text" placeholder="Name" defaultValue={name} onInput={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
            <textarea className="form-control" placeholder="Description" defaultValue={description} onInput={e => setDescription(e.target.value)}>

            </textarea>
        </div>
        <div className="form-group">
            {!loading ?
                <button className="gm-btn gm-btn-primary float-right btn-sm  shadow" onClick={submit}>Update</button> :
                <button className="gm-btn gm-btn-primary float-right btn-sm  shadow" disabled>Updating...</button>
            }
        </div>
    </div>
}

export default AudienceUpdationForm;