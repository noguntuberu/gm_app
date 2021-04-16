import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MultiSelect from 'react-multi-select-component';
import * as AudienceService from '../../../../services/audience';

import './website.css';
import { NavLink } from 'react-router-dom';

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
        navigator.clipboard.writeText(snippet)
            .then(() => toast.info('Copied.'))
            .catch(e => e);
    }
    let generateCode = () => {
        let audience_ids = selected_audiences.map(audience => audience.value).join();
        let snippet = `fetch(https://users.go-mailer.com/api/contacts/${api_key || ''}/${audience_ids}`
        // eslint-disable-next-line no-template-curly-in-string
        snippet += "?email=${email.value})";
        setSnippet(snippet);
    }

    return <div className="website-integration">
        <div>
            <p>
                The website integration allows you to create contacts, and,
                optionally, add them to one or more audiences directly from your webforms.
            </p>
        </div>
        <div className="form-group mobile">
            <label >Select audience(s):</label>
            <MultiSelect
                options={audiences.map(list => ({ label: list.name, value: list.id }))}
                onChange={setSelectedAudiences}
                value={selected_audiences}
                isMulti={false}
                labelledBy='Select Audience'
                id="audience"
            />
        </div>
        <div className="mt-3 mb-3 form-row">
            <div className="col-md-7 pt-lg-1">
                <div className="web">
                    <label>Select audience(s):</label>
                    <MultiSelect
                        options={audiences.map(list => ({ label: list.name, value: list.id }))}
                        onChange={setSelectedAudiences}
                        value={selected_audiences}
                        isMulti={false}
                        labelledBy='Select Audience'
                        id="audience"
                    />
                </div>
            </div>
            <div className="col-md-5 pr-md-0 px-sm-0 pt-lg-2">
                <div className="gm-btn gm-btn-blue mt-lg-4 ml-lg-2 py-1" onClick={e => generateCode()}> Generate Snippet </div>
            </div>
        </div>
        {snippet ?
            <div className="code-wrapper is-clickable">
                <code onClick={e => copySnippet(e.target.innerHTML)}>
                    {`
                        <script type="text/javascript">
                            window.addEventListener('load', function() {
                            let email = document.querySelector('input[type*="email"]') || document.querySelector('input[placeholder*="email"]');
                            let btn = document.querySelector('button[type*="submit"]') || document.querySelector('input[type*="submit"]');
                            btn.addEventListener('click', function () {
                        </script>
                    `}
                    {snippet}
                    {`
                        });
                    });
                    `}
                </code>
            </div>
            :
            <></>
        }
        <div>
            <small className="pt-2 text-info">**click on snippet to copy.</small>
        </div>
        <div className="mt-4">
            <h6><b>Guide:</b></h6>
            <ol className="m-0 pl-3">
                <li>To get started, <NavLink to="/settings/api" >generate</NavLink> your API key.</li>
                <li>[optional]</li> Select one or more audiences that you want to add contacts to.
                <li>Click "Generate Snippet" button above.</li>
                <li>Copy the generated snippet. You can click on the snippet to copy.</li>
                <li>Paste the snippet in your existing HTML document (on the same page as the target form).</li>
                <li>That's it. Congratulations!</li>
            </ol>
        </div>
    </div>
}

export default WebsiteIntegration;