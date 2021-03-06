/** */
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import fileSaver from 'js-file-download';
import { useSelector } from 'react-redux';
import * as ContactService from '../../../../services/contact';
import * as AudienceService from '../../../../services/audience';
import * as TemplateService from '../../../../services/template';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

const ImportContact = props => {
    const { mailing_list } = props;
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mailing_lists, setMailingLists] = useState([]);
    const [selected_list, setSelectedList] = useState(0);

    const user_data = useSelector(state => state.user_data);
    const { token } = user_data;
    const tenant_id = user_data.id;

    useEffect(() => {
        AudienceService.read({ token }).then(data => {
            const { error, payload } = data;
            if (error) return;

            setMailingLists(payload);
        });
    }, [token]);

    const downloadTemplate = async () => {
        const response = await TemplateService.download('contact', { token });
        fileSaver(response, 'contacts.csv');
    }

    const submit = () => {
        if (!file) {
            toast.error('no file selected');
            return;
        }

        if (!file.type.includes('csv')) {
            toast.error('invalid file type: must be csv');
            return;
        }

        const request_data = new FormData();
        request_data.append('contacts', file);
        request_data.append('list_id', mailing_list ? mailing_list.id : selected_list);
        request_data.append('tenant_id', tenant_id);

        setLoading(true);
        ContactService.upload({
            data: request_data, token,
            headers: {
                'Content-Type': 'application/form-data'
            }
        }).then(data => {

        }).finally(() => {
            setLoading(false);
            toast.success(`Contacts uploaded successfully.`);
        });
    }

    return (
        <div>
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="contact_file" onChange={e => setFile(e.target.files[0])} />
                <label className="custom-file-label" htmlFor="contact_file">{file ? file.name : 'Select file'}</label>
            </div>
            <div className="mt-3 form-group">
                {mailing_list ?
                    <select className="custom-select" disabled>
                        <option>{mailing_list.name}</option>
                    </select> :
                    <select className="custom-select" onChange={e => setSelectedList(e.target.value)}>
                        <option value=''>Select Audience</option>
                        {mailing_lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
                    </select>
                }
            </div>
            <div className="mt-3">
                {loading ?
                    <div className="flexible-save-btn gm-btn gm-btn-primary float-right  shadow">Importing <span className="gm-btn-spinner"><Spinner /></span></div> :
                    <div onClick={submit} className="flexible-save-btn gm-btn gm-btn-primary float-right  shadow-sm">Import</div>
                }
                <span className="float-right mr-3 text-primary py-2" onClick={() => downloadTemplate()}>Download Template</span>
            </div>
        </div>
    )
}

export default ImportContact;