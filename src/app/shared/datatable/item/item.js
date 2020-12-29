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
        let field_keys = {};
        let cells = [];
        fields.forEach((field, index) => {
            field_keys[field.key] = field;
            if (field.formatter) {
                cells.push(<td onClick={() => item_click_callback(data)} key={`${index}-${data[field.key]}`}>{field.formatter(data[field.key])}</td>);
                return;
            }

            cells.push(<td onClick={() => item_click_callback(data)} key={`${index}-${data[field.key]}`}>{data[field.key]}</td>);
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
        <tr>
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