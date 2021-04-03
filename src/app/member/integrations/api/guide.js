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
                    <div>
                        <span className="parameter-title">email: string</span>
                        <span className="parameter-description"> <span className="mr-2">required</span> contact's email address</span>
                    </div>
                    <div>
                        <span className="parameter-title">firstname: string </span>
                        <span className="parameter-description">contact's first name.</span>
                    </div>
                    <div>
                        <span className="parameter-title">lastname: string </span>
                        <span className="parameter-description">contact's last name.</span>
                    </div>
                    <div>
                        <span className="parameter-title">address: string </span>
                        <span className="parameter-description">contact's address.</span>
                    </div>
                    <div>
                        <span className="parameter-title">date_of_birth: Date</span>
                        <span className="parameter-description">contact's date of birth.</span>
                    </div>
                    <div>
                        <span className="parameter-title">lists: Array</span>
                        <span className="parameter-description">List of audience IDs to add contact to.</span>
                    </div>
                </div>
            </div>
        </div>
    </div >
}

export default APIGuide;