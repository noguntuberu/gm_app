import React, { useState, useEffect, useRef } from 'react';
import ContextMenu from '../../context-menu/context-menu';

const DataTableItem = props => {
    const {
        actions, action_callback, deselect,
        checkbox, data, bulk_selection,
        fields, index, item_click_callback, 
        selection_callback, unselection_callback,
    } = props;
    let checkbox_ref = useRef();

    const [row_data, setRowData] = useState([]);
    let [is_selected, setIsSelected] = useState(false);

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
    }, [data, fields, index, item_click_callback]);

    useEffect(() => {
        let checkbox = checkbox_ref.current;
        if (deselect && is_selected) {
            checkbox.click();
        }

        if (bulk_selection && !is_selected) {
            checkbox.click()
        }
    }, [deselect, is_selected, bulk_selection]);

    const processAction = action => {
        selection_callback(data);
        action_callback(action, index);
    }

    const handleItemSelection = () => {
        if (!is_selected) selection_callback(data);
        else unselection_callback(data.id);
        setIsSelected(!is_selected);
    }

    return (
        <tr className="text-blue-2">
            {checkbox ?
                <td key={`checkbox-${index}`}>
                    <input ref={checkbox_ref} type='checkbox' value={is_selected} onChange={handleItemSelection} />
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