import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MultiSelect from 'react-multi-select-component';
import * as AudienceService from '../../../../services/audience';

import './website.css';

const WebsiteIntegration = () => {
    let { metadata, user_data } = useSelector(state => state);
    let { api_key } = metadata;
    let { token } = user_data;

    let [audiences, setAudiences] = useState([]);
    let [selected_audiences, setSelectedAudiences] = useState([]);
    let [snippet, setSnippet] = useState('');

    useEffect(() => {
        AudienceService.read({ token }).then(response => {
            let { error, payload } = response;
            if (error) return;

            setAudiences(payload);
        }).catch(e => e);
    }, [token]);

    let copySnippet = (snippet) => {
        navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(snippet)
                    .then(() => toast.info('Copied.')).catch(e => e);
            }
        });
    }
    let generateCode = () => {
        let audience_ids = selected_audiences.map(audience => audience.value).join();
        let snippet = `fetch(https://users.go-mailer.com/api/contacts/${api_key}/${audience_ids}`
        // eslint-disable-next-line no-template-curly-in-string
        snippet += "?email=${email.value})";
        setSnippet(snippet);
    }

    return <div>
        <div className="form-group">
            <label htmlFor="web-integration-audience-selector">Select audience(s):</label>
            <MultiSelect
                options={audiences.map(list => ({ label: list.name, value: list.id }))}
                onChange={setSelectedAudiences}
                value={selected_audiences}
                isMulti={false}
                labelledBy='Select Audience'
                id="audience"
            />
        </div>
        <div className="pt-3">
            <div className="gm-btn gm-btn-primary float-right flexible-save-btn shadow" onClick={e => generateCode()}> Generate Snippet </div>
        </div>
        <div className="code-wrapper">
            {snippet ?
                <code onClick={e => copySnippet(e.target.innerHTML)}>
                    {`
                    window.addEventListener('load', function() {
                        let email = document.querySelector('input[type*="email"]') || document.querySelector('input[placeholder*="email"]');
                        let btn = document.querySelector('button[type*="submit"]') || document.querySelector('input[type*="submit"]');
                        btn.addEventListener('click', function () {
                            `}
                    {snippet}
                    {`
                        });
                    });
                    `}
                </code>
                : ''}
        </div>
        <div>
            <small className="pt-2 text-info">**click on snippet to copy.</small>
        </div>
    </div>
}

export default WebsiteIntegration;