import React, { useState, useEffect } from 'react';
import ContextMenu from '../../context-menu/context-menu';

const DataTableHeader = props => {
    const { checkbox, checked, actions, action_callback, data, selection_callback, sort_callback } = props;
    const [is_all_selected, setIsAllSelected] = useState(false);
    const [sort_field, setSortField] = useState('');
    const [sort_direction, setSortDirection] = useState(false);

    useEffect(() => {
        setIsAllSelected(checked);
    }, [checked]);

    const handleSorting = (field) => {
        if (sort_field === field) {
            setSortDirection(!sort_direction);
        } else {
            setSortField(field);
            setSortDirection(true);
        }

        sort_callback(field, sort_direction);
    }

    const toggleIsBulkSelected = () => {
        setIsAllSelected(!is_all_selected);
        selection_callback(!is_all_selected);
    }

    return (
        <tr>
            {checkbox ?
                <th key='bulk-check'>
                    {is_all_selected ?
                        <input type='checkbox' onChange={e => toggleIsBulkSelected()} checked />
                        :
                        <input type='checkbox' onChange={e => toggleIsBulkSelected()} />
                    }
                </th>
                :
                ''
            }

            {data.map(field => <th key={`header-${field.key}`} onClick={e => handleSorting(field.key)}>{field.title}</th>)}


            {checkbox ?
                <th key='bulk-action'>
                    <ContextMenu actions={actions} callback={action_callback}/>
                </th>
                :
                ''
            }
        </tr>
    )
}

export default DataTableHeader;