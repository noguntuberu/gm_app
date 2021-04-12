import React, { useState, useEffect } from 'react';

import DataTableHeader from './header/header';
import DataTableItem from './item/item';
import Spinner from '../../spinners/spinner-50/spinner-50';

import '../datatable.css';

const DataTable = props => {
    const { action, checkbox, config, onClick, request_complete } = props;
    const { fields, items, search_text, } = config;

    const [number_of_rows_to_display, setNumberOfRowsToDisplay] = useState(10);
    const [page_number, setPageNumber] = useState(0);

    let [is_bulk_selection, setIsBulkSelection] = useState(false);
    const [selected_items, setSelectedItems] = useState({});

    const [all_items, setAllItems] = useState(items);
    const [table_items, setTableItems] = useState(items);
    const [items_to_display, setItemsToDisplay] = useState([]);

    useEffect(() => {
        handleNumberOfItemsToDisplay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page_number, table_items]);

    useEffect(() => {
        let processed_items = items.map(item => ({
            ...item,
            metadata: {
                haystack: (Object.values(item).join()).toLowerCase(),
                checked: false,
            },
        }));

        setAllItems(processed_items);
        setTableItems(processed_items.slice());
    }, [items]);

    /** */
    const closeActionMode = () => {
        setSelectedItems({});
        setIsBulkSelection(false);
    }

    const formatDataTableFooter = (page_number, number_of_rows_to_display, items) => {
        const start = page_number ? page_number * number_of_rows_to_display + 1 : 1;
        const end = (number_of_rows_to_display + start) - 1;
        const content_text_for_empty_data = `No item(s) to display`;
        const content_text_for_nonempty_data = `Showing ${start} to ${end > items.length ? items.length : end} records of ${items.length}`;

        return items.length ? content_text_for_nonempty_data : content_text_for_empty_data;
    }

    const formatPagination = () => {
        const high = Math.ceil(table_items.length / number_of_rows_to_display);
        return (
            <div className="gm-datatable-pagination">
                {page_number > 0 ? <button onClick={() => handlePageChange(-1)}> {'<'} </button> : <button disabled > {'<'} </button>}
                {page_number < high - 1 ? <button onClick={() => handlePageChange(1)}> {'>'} </button> : <button disabled > {'>'} </button>}
            </div>
        );
    }

    const handleItemClick = item_data => {
        onClick(item_data);
    }

    const handleNumberOfItemsToDisplay = () => {
        const start = page_number * number_of_rows_to_display;
        const end = start + number_of_rows_to_display;

        setItemsToDisplay([...table_items].slice(start, end));
    }

    const handlePageChange = (value) => {
        const new_page_number = page_number + value;
        setPageNumber(new_page_number);
    }

    const handleSearch = (needle) => {
        const results = all_items.filter(item => item.metadata.haystack.includes(needle.toLowerCase()));
        setTableItems(results);
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

    const handleSort = (field, is_ascending) => {
        let sorted_items = [...table_items];
        if (!is_ascending) {
            sorted_items.sort((a, b) => {
                if (a[field] > b[field]) return 1;
                else return -1;
            });
        } else {
            sorted_items.sort((a, b) => {
                if (a[field] > b[field]) return -1;
                else return 1;
            });
        }

        setTableItems([...sorted_items]);
    }

    const processAction = (name) => {
        if (!Object.keys(selected_items).length) return;

        const is_single = Object.keys(selected_items).length === 1;
        action({
            name,
            type: is_single ? 'single' : 'bulk',
            data: is_single ? Object.values(selected_items)[0] : Object.values(selected_items),
        });
    }

    const toggleBulkSelection = async () => {
        if (is_bulk_selection) {
            closeActionMode();
            return;
        }

        setIsBulkSelection(true);
        await new Promise((r, e) => setTimeout(r, 500));

        let source = items_to_display;
        let selections = source.reduce((sack, result) => {
            if (!result.is_active) return sack;
            return {
                ...sack,
                [result.id]: result
            }
        }, {});
        setSelectedItems(selections);
    }

    return (
        <div className="gm-datatable">
            {!request_complete ?
                <div className="gm-datatable-loader">
                    <Spinner />
                </div> :
                <>
                    <section className="gm-datatable-header">
                        <div className="gm-datatable-row-selector-wrap">
                            <div>
                                Show
                    </div>
                            <div className="gm-datatable-row-selector">
                                <select className="text-blue-3" onChange={e => setNumberOfRowsToDisplay(Number(e.target.value))}>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                            <div>
                                items per page.
                    </div>
                        </div>
                        <div className="gm-datatable-search">
                            <input type="text" placeholder={search_text || 'Search'} onInput={e => handleSearch(e.target.value)} />
                        </div>
                    </section>
                    <section className="gm-datatable-table">
                        <table>
                            <thead className="gm-bg-blue-10 text-blue-2">
                                <DataTableHeader
                                    actions={config.actions.bulk}
                                    action_callback={processAction}
                                    checkbox={checkbox}
                                    data={fields}
                                    sort_callback={handleSort}
                                    onChange={toggleBulkSelection}
                                />
                            </thead>
                            <tbody>
                                {items_to_display.map((item, index) => <DataTableItem
                                    actions={config.actions.single}
                                    action_callback={processAction}
                                    checkbox={checkbox}
                                    data={item}
                                    fields={fields}
                                    index={index}
                                    item_click_callback={handleItemClick}
                                    key={index}
                                    bulk_selection={is_bulk_selection}
                                    selection_callback={handleSelection}
                                    unselection_callback={handleUnselection}
                                    deselect={!Boolean(Object.keys(selected_items).length)}
                                />)}
                            </tbody>
                        </table>
                    </section>
                    <section className="gm-datatable-footer">
                        <div>{formatDataTableFooter(page_number, number_of_rows_to_display, table_items)}</div>
                        {formatPagination()}
                    </section>
                </>
            }
        </div >
    )
}

export default DataTable;