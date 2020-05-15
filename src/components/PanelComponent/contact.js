    // src/components/contacts.js

import React from 'react'
//import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

const Contactions = ( {contacts} ) => {
    return (
    <div>
        <center><h1>Patient offline data</h1></center>
        {/*contacts.map(contact => (
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">{contact.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{contact.email}</h6>
                <p class="card-text">{contact.company.catchPhrase}</p>
                </div>
        </div>))*/}
    </div>
    )
};

export default Contactions;