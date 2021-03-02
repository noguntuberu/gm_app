import React, { useState, useEffect, useRef } from 'react';

import './item.css';

const DatatableItem = props => {
    let {
        data, deselect, fields, index, bulk_selection,
        item_click_callback, selection_callback, unselection_callback
    } = props;
    let checkbox_ref = useRef();

    let [item_badge, setItemBadge] = useState(null);
    let [item_metadata, setMetadata] = useState('');
    let [item_title, setItemTitle] = useState('');
    let [item_tagline, setTagline] = useState('');

    let [is_selected, setIsSelected] = useState(false);

    useEffect(() => {
        buildItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        let checkbox = checkbox_ref.current;
        if (deselect && is_selected) {
            checkbox.click();
        }

        if(bulk_selection && !is_selected) {
            checkbox.click()
        }
    }, [deselect, is_selected, bulk_selection]);

    const buildItemTitle = (value) => {
        setItemTitle(`${item_title} ${value}`);
    }

    const buildItemTagline = (value) => {
        setTagline(`${item_tagline} ${value}`);
    }

    const buildItemMetadata = (value) => {
        setMetadata(`${item_metadata} ${value}`);
    }

    const buildItem = () => {
        fields.forEach((field) => {
            let { formatter, key } = field;
            let value = data[key];
            if (formatter) value = formatter(value);

            //
            if (field.isTitle) buildItemTitle(value);
            if (field.isTagline) buildItemTagline(value);
            if (field.isMetadata) buildItemMetadata(value);
            if (field.isBadge) setItemBadge(value);
        });
    }

    const handleItemSelection = () => {
        if (!is_selected) selection_callback(data);
        else unselection_callback(data.id);
        setIsSelected(!is_selected);
    }

    return <div key={index} className="gm-datatable-item">
        <div>
            <input ref={checkbox_ref} type='checkbox' value={is_selected} onChange={handleItemSelection} />
        </div>
        <div onClick={() => item_click_callback(data)}>
            <div className="gm-datatable-item-title">{item_title}</div>
            <div className="gm-datatable-item-tagline">{item_tagline}</div>
            <div className="gm-datatable-item-meta-wrapper">
                <span className="gm-datatable-item-metadata">{item_metadata}</span>
                <span className="gm-datatable-item-badge">{item_badge}</span>
            </div>
        </div>
    </div>;
}

export default DatatableItem;