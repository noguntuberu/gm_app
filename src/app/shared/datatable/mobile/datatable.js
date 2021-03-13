import React, { useState, useEffect, useRef } from 'react';
import DataTableItem from './item/item';
import ContextMenu from '../context-menu/context-menu';

import '../datatable.css';
import SpinnerFifty from '../../spinners/spinner-50/spinner-50';
import SpinnerTwentyFive from '../../spinners/spinner-25/spinner-25';

const DataTable = props => {
    let { action, config, onClick, onDataRequest, onListModeChange, onSearchRequest } = props;
    let { fields, items, search_text, is_search_mode } = config;

    let list_wrapper = useRef();

    let [page_number, setPageNumber] = useState(0);
    let [is_page_end, setIsPageEnd] = useState(false);
    let [is_bulk_selection, setIsBulkSelection] = useState(false);

    let [is_loading, setIsLoading] = useState(false);
    let [is_loading_more, setIsLoadingMore] = useState(false);

    let [selected_items, setSelectedItems] = useState({});
    let [table_items, setTableItems] = useState([]);
    let [items_to_display, setItemsToDisplay] = useState([]);

    let [search_keys, setSearchKeys] = useState('');
    let [search_keyword, setSearchKeyword] = useState('');
    let [search_results, setSearchResults] = useState([]);

    useEffect(() => {
        buildSearchKeys();
        setPageNumber(0);
        let normal_list = list_wrapper.current;
        normal_list.addEventListener('scroll', () => handleListScrollEnd(normal_list));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setItemsToDisplay([]);
        setIsLoading(true);
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

        if (is_loading_more) setIsLoadingMore(!is_loading_more);

        //
        if (is_search_mode) {
            results = [...search_results, ...processed_items].reduce((sack, item) => ({
                ...sack,
                [item.id]: item,
            }), {});
            setSearchResults(Object.values(results));
        } else {
            setTableItems(Object.values(results));
        }

        setItemsToDisplay(Object.values(results));
        if (is_loading) setIsLoading(!is_loading);
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
        setIsLoadingMore(true);
    }

    const handleSearch = async (keyword) => {
        onListModeChange(Boolean(keyword));
        setSearchKeyword(keyword);
        setSearchResults([]);
        
        setItemsToDisplay([]);
        setIsLoading(true);
        
        // throttle
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 500) );
        onSearchRequest(search_keys, keyword, 0);
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

    const processAction = (name) => {
        if (!Object.keys(selected_items).length) return;

        const is_single = Object.keys(selected_items).length === 1;
        action({
            name,
            type: is_single ? 'single' : 'bulk',
            data: is_single ? Object.values(selected_items)[0] : Object.values(selected_items),
        });

        closeActionMode();
    }

    const toggleBulkSelection = () => {
        if (is_bulk_selection) {
            closeActionMode();
            return;
        }

        setIsBulkSelection(true);
        setTimeout(() => {
            let source = is_search_mode ? search_results : table_items;
            let selections = source.reduce((sack, result) => {
                if (!result.is_active) return sack;
                return {
                    ...sack,
                    [result.id]: result
                }
            }, {});
            setSelectedItems(selections);
        }, 250);
    }

    return <div className="gm-datatable">
        <section className="gm-datatable-header">
            {
                Object.keys(selected_items).length ?
                    <div>
                        <div className="gm-datatable-actions-wrapper">
                            <div>
                                <span className="gm-datatable-bulk-checkbox">
                                    <input type="checkbox" onChange={toggleBulkSelection} />
                                </span>
                                <div className="gm-datatable-actions">
                                    {
                                        Object.keys(selected_items).length > 1 ?
                                            <ContextMenu actions={config.actions.bulk} callback={processAction} /> :
                                            <ContextMenu actions={config.actions.single} callback={processAction} />
                                    }
                                </div>
                                <span className="gm-datatable-metadata">{Object.keys(selected_items).length} item(s)</span>

                            </div>
                            <span className="close-action" onClick={closeActionMode}>x</span>
                        </div>
                    </div> :
                    <div className="gm-datatable-search">
                        <input type="text" placeholder={search_text || 'Search'} onInput={e => handleSearch(e.target.value)} />
                    </div>
            }
        </section>
        <section className="gm-datatable-table">
            {is_loading ?
                <div className="gm-datatable-loader">
                    <SpinnerFifty />
                </div> :
                <div ref={list_wrapper} className="gm-datatable-item-list-wrapper">
                    {items_to_display.map((item, index) => <DataTableItem
                        data={item}
                        fields={fields}
                        index={index}
                        item_click_callback={handleItemClick}
                        key={item.id}
                        bulk_selection={is_bulk_selection}
                        selection_callback={handleSelection}
                        unselection_callback={handleUnselection}
                        deselect={!Boolean(Object.keys(selected_items).length)}
                    />)}
                    <div className="mobi-no-items">
                        { !items_to_display.length ? 'No items found' : ''}
                    </div>
                    <div className="gm-datatable-foot-loader">{
                        is_loading_more ?
                            <SpinnerTwentyFive /> :
                            <></>
                    }</div>
                </div>
            }
        </section>
    </div >
}
export default DataTable;