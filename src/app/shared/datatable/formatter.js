import React from 'react';

const extractFieldKeys = (fields = []) => {
    let field_keys = {}
    fields.forEach(field => {
        field_keys[field.key] = field.title;
    })

    return field_keys;
}

const generateTableBody = data => {
    const { actions, action_callback, checkbox, fields, items, selection_callback } = data;
    let body_data = [];

    const field_keys = extractFieldKeys(fields);
    items.forEach((item, index) => {
        let row_data = [];

        Object.keys(field_keys).forEach(key => {
            if (key === 'checkbox' || key === 'action') return;
            row_data.push(<td key={`${item[key]}`}>{item[key]}</td>);
        });

        if (checkbox) {
            const key = `checkbox-${index}`;
            row_data.unshift(
                <td key={key}>
                    <input type='checkbox' value={index} onChange={e => selection_callback(e.target.value)} />
                </td>
            )

            row_data.push(
                <td key={`action-${index}`}>
                    <ContextMenu actions={actions} callback={action_callback} />
                </td>
            )
        }
        body_data.push(<tr key={index}>{row_data}</tr>);
    });

    return body_data;
}

const generateTableHead = data => {
    const { actions, action_callback, checkbox, fields, selection_callback } = data;

    let head_data = [];
    fields.forEach((field, i) => {
        if (field.key === 'action') return;
        head_data.push(<th scope="col" key={field.key}>{field.title}</th>);
    });

    if (checkbox) {
        head_data.unshift(
            <th key={'bulk-checkbox'}>
                <input type='checkbox' onChange={e => selection_callback(-1)} />
            </th>
        );

        head_data.push(
            <th key='bulk-action'>
                <ContextMenu actions={actions} callback={action_callback} />
            </th>
        )
    }

    return head_data
}

export const extractTableDataFromProps = (config) => {
    const { actions, } = config
    const { bulk, single } = actions;
    const table_head = generateTableHead({ ...config, actions: bulk,});
    const table_body = generateTableBody({ ...config, actions: single, });

    return [table_head, ...table_body];
}