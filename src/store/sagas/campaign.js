/** */
import { call, put, } from 'redux-saga/effects';
import { mailing_host } from './_config';
import Request from './_request';

import { READ_CAMPAIGN, set_error, set_process, } from '../actions/process';
import {
    ADD_MANY_CAMPAIGNS_TO_STORE, 
    ADD_ONE_CAMPAIGN_TO_STORE, 
    READ_MANY_CAMPAIGNS, 
    READ_ONE_CAMPAIGN,

    addManyCampaignsToStore,
} from '../actions/campaign';

const mailing_uri = `${mailing_host}/campaigns`;

export function* readManyCampaigns(action) {
    try {
        const query = action.payload;
        const request = new Request();
        const response = yield call(
            [request, request.get],
            `${mailing_uri}?${query}`,
        );
        yield put(set_process(READ_CAMPAIGN, response));
        yield put(addManyCampaignsToStore(response.data.payload));
    } catch (e) {
        yield put(set_error(READ_CAMPAIGN, e));
    }
}