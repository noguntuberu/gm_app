import { toast } from 'react-toastify';
import React, { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AudienceService from '../../../../services/audience';
import { addOneAudienceToStore } from '../../../../store/actions/audience';

const CreateMailingList = ({ closeModal }) => {
    const dispatch = useDispatch();
    const { token, id } = useSelector(state => state.user_data);

    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

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
        const { error, payload } = await AudienceService.create({ data, token, });
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(false);
        toast.success(`Audience created.`)
        dispatch(addOneAudienceToStore(payload));
    }

    return <div>
        <div className="form-group">
            <input className="form-control" type="text" placeholder="Name" onInput={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
            <textarea className="form-control" placeholder="Description" onInput={e => setDescription(e.target.value)}>

            </textarea>
        </div>
        <div className="form-group">
            {!loading ?
                <button className="gm-btn gm-btn-primary float-right btn-sm  shadow" onClick={submit}>Save</button> :
                <button className="gm-btn gm-btn-primary float-right btn-sm  shadow" disabled>Saving</button>
            }
        </div>
    </div>
}

export default CreateMailingList;