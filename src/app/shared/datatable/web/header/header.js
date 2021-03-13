import React, { useState } from 'react';
import ContextMenu from '../../context-menu/context-menu';

const DataTableHeader = props => {
    const {
        checkbox, actions,
        action_callback, data,
        onChange, sort_callback
    } = props;
    
    const [sort_field, setSortField] = useState('');
    const [sort_direction, setSortDirection] = useState(false);

    const handleSorting = (field) => {
        if (sort_field === field) {
            setSortDirection(!sort_direction);
        } else {
            setSortField(field);
            setSortDirection(true);
        }

        sort_callback(field, sort_direction);
    }

    return (
        <tr>
            {checkbox ?
                <th key='bulk-check'>
                    <input type="checkbox" onChange={onChange} />
                </th>
                :
                ''
            }

            {data.map(field => <th key={`header-${field.key}`} onClick={e => handleSorting(field.key)}>{field.title}</th>)}


            {checkbox ?
                <th key='bulk-action'>
                    <ContextMenu actions={actions} callback={action_callback} />
                </th>
                :
                ''
            }
        </tr>
    )
}

export default DataTableHeader;