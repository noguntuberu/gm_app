import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datatable from "../../shared/datatable/datatable";
import { readManyCampaigns } from "../../../store/actions/campaign";
import { READ_CAMPAIGN, set_process } from "../../../store/actions/process";

const ListCampaigns = () => {
    const dispatch = useDispatch();
    const read_campaign_process = useSelector( state => state.processes[READ_CAMPAIGN]);

    useEffect(() => {
        dispatch(readManyCampaigns());

        if (!read_campaign_process || !Object.keys(read_campaign_process).length) return;
        
        const { error, payload, success, } = read_campaign_process;
        if (!success && error) {
            console.log(error);
        }
        
        console.log(payload);
        dispatch(set_process(READ_CAMPAIGN, {}));
    }, []);

    const config = {
        actions: {
            bulk: ['Online', 'Offline'],
            single: ['Online', 'Offline'],
        },
        allow_bulk_action: true,
        css: {},
        fields: [
            {
                title: 'ID',
                key: 'id',
            },
            {
                title: 'Name',
                key: 'name',
            },
            {
                title: 'Date created',
                key: 'creation_date',
                formatter: value => { return (new Date(value)).toDateString() },
            },
        ],
        items: [
            {
                id: '0001',
                name: 'Nathan Oguntuberu',
                creation_date: 1602999418997,
            },
            {
                id: '0002',
                name: 'Martin Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0003',
                name: 'Ezinne Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0004',
                name: 'Bolanle Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0005',
                name: 'Belinda Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0006',
                name: 'Ugochi Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0007',
                name: 'Hannah Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0008',
                name: 'Omolade Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0009',
                name: 'Lolade Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0010',
                name: 'Folasade Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0011',
                name: 'Chisom Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0012',
                name: 'Aisha Fowler',
                creation_date: 1602999418997,
            },
            {
                id: '0013',
                name: 'Laide Fowler',
                creation_date: 1602999418997,
            },
        ],
        search_key: 'name',
        search_text: '',
    }

    const handleDatatableAction = payload => {
        console.log(payload);
    }

    const handleItemClick = payload => {
        console.log(payload);
    }

    return (
        <div>
            <Datatable config={config} action={handleDatatableAction} onClick={handleItemClick} checkbox />
        </div>
    )
}

export default ListCampaigns;