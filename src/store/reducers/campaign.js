/** */
import { ADD_MANY_CAMPAIGNS_TO_STORE, ADD_ONE_CAMPAIGN_TO_STORE, LOAD_CAMPAIGNS_TO_STORE } from '../actions/campaign';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_MANY_CAMPAIGNS_TO_STORE:
            return {
                ...state,
                ...payload.reduce((campaigns, campaign) => ({
                    ...campaigns,
                    [campaign.id]: campaign,
                }), {}),
            };
        case ADD_ONE_CAMPAIGN_TO_STORE:
            return {
                ...state,
                [payload.id]: payload,
            };
        case LOAD_CAMPAIGNS_TO_STORE:
            return {
                ...payload.reduce((campaigns, campaign) => ({
                    ...campaigns,
                    [campaign.id]: campaign,
                }), {}),
            };
        default:
            return state;
    }
}