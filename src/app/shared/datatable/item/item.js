import React, { useState, useEffect } from 'react';
import ContextMenu from '../context-menu/context-menu';

const DataTableItem = props => {
    const {
        actions, action_callback,
        checkbox, data,
        fields, index, item_click_callback, selection_callback,
    } = props;

    const { metadata } = data;

    const [row_data, setRowData] = useState([]);
    const [item_is_selected, setItemIsSelected] = useState();

    useEffect(() => {
        if (data.metadata) {
            setItemIsSelected(data.metadata.checked);
        }
    });

    useEffect(() => {
        let formatter = {}, field_keys = {};
        fields.forEach(field => {
            field_keys[field.key] = field;
            if (field.formatter) {
                formatter[field.key] = field.formatter;
            }
        });

        let cells = [];
        Object.keys(data).forEach(key => {
            if (key === 'metadata' || !field_keys[key]) return;
            if (formatter[key]) {
                cells.push(<td key={`${index}-${key}`}>{formatter[key](data[key])}</td>);
                return;
            }
            cells.push(<td key={`${index}-${key}`}>{data[key]}</td>);
        });

        setRowData(cells);
    }, [data, fields, index]);

    const processAction = action => {
        setItemIsSelected(true);
        selection_callback({
            data,
            index,
            action_type: 'single',
            selected: true,
        });
        action_callback(action, index);
    }

    const toggleSelection = () => {
        setItemIsSelected(!item_is_selected);
        selection_callback({
            data,
            index,
            action_type: 'single',
            selected: !item_is_selected,
        });
    }

    return (
        <tr onClick={() => item_click_callback(data)}>
            {checkbox ?
                <td key={`checkbox-${index}`}>
                    {item_is_selected ?
                        <input
                            type='checkbox'
                            value={item_is_selected}
                            onChange={e => toggleSelection()}
                            onClick={e => e.stopPropagation()}
                            checked
                        />
                        :
                        <input
                            type='checkbox'
                            value={item_is_selected}
                            onChange={e => toggleSelection()}
                            onClick={e => e.stopPropagation()}
                        />
                    }
                </td>
                :
                ''
            }
            {row_data}

            {checkbox ?
                <td key={`action-${index}`}>
                    <ContextMenu actions={actions} callback={processAction} />
                </td>
                :
                ''
            }
        </tr>
    )
}

export default DataTableItem;