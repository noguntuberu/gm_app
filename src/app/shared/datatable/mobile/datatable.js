import React, { useState, useEffect, useRef } from 'react';
import DataTableItem from './item/item';
import ContextMenu from '../context-menu/context-menu';

import './datatable.css';

const DataTable = props => {
    let { action, config, onClick, onDataRequest, onListModeChange, onSearchRequest } = props;
    let { fields, items, search_text, is_search_mode } = config;

    let item_list_wrapper = useRef();
    let search_list_wrapper = useRef();

    let [page_number, setPageNumber] = useState(0);
    let [is_page_end, setIsPageEnd] = useState(false);
    let [is_bulk_selection, setIsBulkSelection] = useState(false);

    let [selected_items, setSelectedItems] = useState({});
    let [table_items, setTableItems] = useState([]);

    let [search_keys, setSearchKeys] = useState('');
    let [search_keyword, setSearchKeyword] = useState('');
    let [search_results, setSearchResults] = useState([]);

    useEffect(() => {
        buildSearchKeys();
        setPageNumber(0);
        if (!is_search_mode && item_list_wrapper.current) {
            let normal_list = item_list_wrapper.current;
            normal_list.addEventListener('scroll', () => handleListScrollEnd(normal_list));
        }

        if (is_search_mode && search_list_wrapper.current) {
            let search_list = search_list_wrapper.current;
            search_list.addEventListener('scroll', () => handleListScrollEnd(search_list));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [is_search_mode]);

    useEffect(() => {
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [is_page_end]);


    useEffect(() => {
        setIsPageEnd(false);
        let processed_items = items.map(item => ({
            ...item,
            metadata: {
                haystack: (Object.values(item).join()).toLowerCase(),
                checked: false,
            },
        }));

        let results = [...table_items, ...processed_items].reduce((sack, item) => ({
            ...sack,
            [item.id]: item,
        }), {});;

        //
        if (is_search_mode) {
            results = [...search_results, ...processed_items].reduce((sack, item) => ({
                ...sack,
                [item.id]: item,
            }), {});
            setSearchResults(Object.values(results));
            return;
        }

        setTableItems(Object.values(results));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const closeActionMode = () => {
        setSelectedItems({});
        setIsBulkSelection(false);
    }

    const buildSearchKeys = () => {
        let keys = [];
        fields.forEach(field => {
            if (!field.isTitle && !field.isTagline) return;
            keys.push(field.key);
        })

        setSearchKeys(keys.join());
    }

    const handleItemClick = item_data => {
        onClick(item_data);
    }

    const handleListScrollEnd = (target) => {
        let
            scroll_top = target.scrollTop,
            scroll_height = target.scrollHeight,
            offset_height = target.offsetHeight,
            content_height = scroll_height - offset_height;

        //
        if (content_height > scroll_top) return;
        
        setIsPageEnd(true);
    }

    const handleSearch = (keyword) => {
        onListModeChange(Boolean(keyword));
        setSearchKeyword(keyword);
        setSearchResults([]);

        setTimeout(() => onSearchRequest(search_keys, search_keyword, 0), 500);
    }

    const handleSelection = (selected_item) => {
        let selections = { ...selected_items, [selected_item.id]: selected_item };
        setSelectedItems(selections);
    }

    const handleUnselection = (id) => {
        let selections = { ...selected_items };
        delete selections[id];
        setSelectedItems(selections);
    }

    const loadMore = () => {
        if (is_search_mode) {
            onSearchRequest(search_keys, search_keyword, page_number + 1);
            setPageNumber((page_number + 1));
            return;
        }

        onDataRequest((page_number + 1));
        setPageNumber((page_number + 1));
    }

    const processAction = (name, item_index) => {
        const is_single = item_index !== undefined ? item_index >= 0 : Object.keys(selected_items).length >= 1;
        action({
            name,
            type: is_single ? 'single' : 'bulk',
            data: is_single ? Object.values(selected_items)[0] : Object.values(selected_items),
        });
    }

    const toggleBulkSelection = () => {
        if (is_bulk_selection) {
            closeActionMode();
            return;
        }

        setIsBulkSelection(true);
    }

    return <div className="gm-datatable">
        <section className="gm-datatable-header">
            {
                Object.keys(selected_items).length ?
                    <div className="gm-datatable-actions-wrapper">
                        <span className="">
                            <input type="checkbox" onChange={toggleBulkSelection} />
                        </span>
                        <div className="gm-datatable-actions">
                            {
                                Object.keys(selected_items).length > 1 ?
                                    <ContextMenu actions={config.actions.bulk} callback={processAction} /> :
                                    <ContextMenu actions={config.actions.single} callback={processAction} />
                            }
                        </div>
                        <span className="close-action" onClick={closeActionMode}>x</span>
                    </div> :
                    <div className="gm-datatable-search">
                        <input type="text" placeholder={search_text || 'Search'} onInput={e => handleSearch(e.target.value)} />
                    </div>
            }
        </section>
        <section className="gm-datatable-table">
            {
                is_search_mode ?
                    <div ref={search_list_wrapper} className="gm-datatable-item-list-wrapper">
                        {search_results.map((item, index) => <DataTableItem
                            data={item}
                            fields={fields}
                            index={index}
                            item_click_callback={handleItemClick}
                            key={index}
                            bulk_selection={is_bulk_selection}
                            selection_callback={handleSelection}
                            unselection_callback={handleUnselection}
                            deselect={!Boolean(Object.keys(selected_items).length)}
                        />
                        )}
                    </div> :
                    <div ref={item_list_wrapper} className="gm-datatable-item-list-wrapper">
                        {table_items.map((item, index) => <DataTableItem
                            data={item}
                            fields={fields}
                            index={index}
                            item_click_callback={handleItemClick}
                            key={index}
                            bulk_selection={is_bulk_selection}
                            selection_callback={handleSelection}
                            unselection_callback={handleUnselection}
                            deselect={!Boolean(Object.keys(selected_items).length)}
                        />
                        )}
                    </div>
            }
        </section>
    </div>
}
export default DataTable;