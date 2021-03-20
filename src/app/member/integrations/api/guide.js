import React from 'react';

const APIGuide = props => {
    return <div>
        <header>Create a contact</header>
        <div className="mt-2 api-route">
            <code>
                POST https://users.go-mailer.com/api/contacts
            </code>
            <span className="api-route-subheader">Headers:</span>
            <code>
                {`"Authorization: Bearer <API_KEY>"`}
            </code>
            <div className="api-parameters">
                <span className="api-route-subheader">Request body:</span>
                <div>
                    <ul>
                        <li>
                            <div className="parameter-title">email: string</div>
                            <div className="parameter-description"> <span className="mr-2">required</span> contact's email address</div>
                        </li>
                        <li>
                            <div className="parameter-title">firstname: string </div>
                            <div className="parameter-description">contact's first name.</div>
                        </li>
                        <li>
                            <div className="parameter-title">lastname: string </div>
                            <div className="parameter-description">contact's last name.</div>
                        </li>
                        <li>
                            <div className="parameter-title">address: string </div>
                            <div className="parameter-description">contact's address.</div>
                        </li>
                        <li>
                            <div className="parameter-title">date_of_birth: Date</div>
                            <div className="parameter-description">contact's date of birth.</div>
                        </li>
                        <li>
                            <div className="parameter-title">lists: Array</div>
                            <div className="parameter-description">List of audience IDs to add contact to.</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}

export default APIGuide;