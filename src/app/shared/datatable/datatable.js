import React, { useState, useEffect } from 'react';

import DataTableHeader from './header/header';
import DataTableItem from './item/item';

import './datatable.css';

const DataTable = props => {
    const { action, checkbox, config, onClick } = props;
    const { fields, items, search_text, } = config;

    const [number_of_rows_to_display, setNumberOfRowsToDisplay] = useState(10);
    const [page_number, setPageNumber] = useState(0);

    const [is_all_selected, setIsAllSelected] = useState(false);
    const [selected_items, setSelectedItems] = useState({});

    const [all_items, setAllItems] = useState(items);
    const [table_items, setTableItems] = useState(items);

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

    const formatDataTableFooter = (page_number, number_of_rows_to_display, items) => {
        const start = page_number ? page_number * number_of_rows_to_display + 1 : 1;
        const end = number_of_rows_to_display * start;
        const content_text_for_empty_data = `No item(s) to display`;
        const content_text_for_nonempty_data = `Showing ${start} to ${end > items.length ? items.length : end} records of ${items.length}`;

        return items.length ? content_text_for_nonempty_data : content_text_for_empty_data;
    }

    const handleAllSelection = (is_selected = false) => {
        let end = (page_number * number_of_rows_to_display) + number_of_rows_to_display
        let items = handleNumberOfItemsToDisplay();
        if (is_selected) {
            setSelectedItems(items.reduce((result, item, index) => ({
                ...result,
                [index]: item,
            }), {}));

            items.forEach(item => item.metadata.checked = true);
        } else {
            setSelectedItems({});
            items.forEach(item => item.metadata.checked = false);
        }

        setIsAllSelected(is_selected);
        setTableItems([...items, ...table_items.slice(end)]);
    }

    const handleItemClick = item_data => {
        onClick(item_data);
    }

    const handleNumberOfItemsToDisplay = () => {
        const start = page_number * number_of_rows_to_display;
        const end = start + number_of_rows_to_display;
        return [...table_items].slice(start, end);
    }

    const handlePageChange = (value) => {
        const new_page_number = page_number + value;
        setPageNumber(new_page_number);
    }

    const handleSearch = (needle) => {
        const results = all_items.filter(item => item.metadata.haystack.includes(needle.toLowerCase()));
        setTableItems(results);
    }

    const handleSingleSelection = (selection_data) => {
        const { data, index, selected } = selection_data
        let selections = selected_items;
        let items = table_items;

        if (!selected) {
            delete selections[index];
            items[index].metadata.checked = false;
            setIsAllSelected(false);
        } else {
            selections[index] = data;
            items[index].metadata.checked = true;
            if (Object.keys(selections).length === number_of_rows_to_display) {
                setIsAllSelected(true);
            }
        }

        setSelectedItems(selections);
        setTableItems(items);
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

    const processAction = (name, item_index) => {
        const is_single = item_index >= 0;
        action({
            name,
            type: is_single ? 'single' : 'bulk',
            data: is_single ? selected_items[item_index]: Object.values(selected_items),
        });
    }

    const formatPagination = () => {
        const high = Math.floor(table_items.length / number_of_rows_to_display);
        return (
            <div className="gm-datatable-pagination">
                {page_number > 0 ? <button onClick={() => handlePageChange(-1)}> {'<'} </button> : <button disabled > {'<'} </button>}
                {page_number < high ? <button onClick={() => handlePageChange(1)}> {'>'} </button> : <button disabled > {'>'} </button>}
            </div>
        );
    }

    return (
        <div className="gm-datatable">
            <section className="gm-datatable-header">
                <div className="gm-datatable-row-selector-wrap">
                    <div>
                        Show
                    </div>
                    <div className="gm-datatable-row-selector">
                        <select onChange={e => setNumberOfRowsToDisplay(Number(e.target.value))}>
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
                    <thead>
                        <DataTableHeader
                            actions={config.actions.bulk}
                            action_callback={processAction}
                            checkbox={checkbox}
                            checked={is_all_selected}
                            data={fields}
                            selection_callback={handleAllSelection}
                            sort_callback={handleSort}
                        />
                    </thead>
                    <tbody>
                        {handleNumberOfItemsToDisplay().map((item, index) => <DataTableItem
                            actions={config.actions.single}
                            action_callback={processAction}
                            checkbox={checkbox}
                            data={item}
                            fields={fields}
                            index={index}
                            item_click_callback={handleItemClick}
                            key={index}
                            selection_callback={handleSingleSelection}
                        />)}
                    </tbody>
                </table>
            </section>
            <section className="gm-datatable-footer">
                {formatDataTableFooter(page_number, number_of_rows_to_display, table_items)}
                {formatPagination()}
            </section>
        </div >
    )
}

export default DataTable;