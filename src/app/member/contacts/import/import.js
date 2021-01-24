/** */
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import fileSaver from 'js-file-download';
import { useSelector } from 'react-redux';
import { apiPost, URLS, apiGet } from '../../../../utilities/api/api';

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
        apiGet(URLS.mailing_lists, { token }).then(data => {
            const { error, payload } = data;

            if (error) return;

            setMailingLists(payload);
        });
    }, [token]);

    const downloadTemplate = () => {
        apiGet(`${URLS.templates}/contact`, { token}).then( response => {
            fileSaver(response, 'contacts.csv');
        })
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
        apiPost(`${URLS.contacts}/batch`, {
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
                    <button className="gm-btn gm-btn-primary float-right  shadow" disabled>Importing...</button> :
                    <button onClick={submit} className="gm-btn gm-btn-primary float-right  shadow">Import</button>
                }
                <button className="gm-btn gm-btn-secondary shadow float-right mr-3" onClick={() => downloadTemplate()}>Download Template</button>
            </div>
        </div>
    )
}

export default ImportContact;