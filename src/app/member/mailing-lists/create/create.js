import { toast } from 'react-toastify';
import React, { useState, } from 'react';
import { useSelector } from 'react-redux';
import * as AudienceService from '../../../../services/audience';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

const CreateMailingList = ({ closeModal }) => {
    const { token, id } = useSelector(state => state.user_data);

    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

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
        const { error } = await AudienceService.create({ data, token, });
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(false);
        toast.success(`Audience created.`);
        clearForm();
    }

    return <div>
        <div className="form-group">
            <input className="gm-input" type="text" placeholder="Name" value={name} onInput={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
            <textarea className="gm-input" placeholder="Description" value={description} onInput={e => setDescription(e.target.value)}>

            </textarea>
        </div>
        <div className="mt-3 mb-3 form-row">
            <div className="col-md-8"></div>
            <div className="col-md-4 pr-md-0 px-sm-0">
                {!loading ?
                    <div className="gm-btn gm-btn-blue" onClick={submit}>Save</div> :
                    <div className="gm-btn gm-btn-blue" >Saving<span className="gm-btn-spinner"><Spinner /></span></div>
                }
            </div>
        </div>
    </div>
}

export default CreateMailingList;