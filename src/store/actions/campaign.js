/** */
export const READ_MANY_CAMPAIGNS = 'read multiple campaigns.';
export const READ_ONE_CAMPAIGN = 'read one campaign.';

export const ADD_MANY_CAMPAIGNS_TO_STORE = 'add multiple campaigns to atore.';
export const ADD_ONE_CAMPAIGN_TO_STORE = 'add one campaign to store.';
export const LOAD_CAMPAIGNS_TO_STORE = 'load up campaigns to store.';
export const REM_ONE_CAMPAIGN_FROM_STORE = 'remove a campaign from the store.';

/** */
export const readManyCampaigns = (payload) => ({
    type: READ_MANY_CAMPAIGNS,
    payload,
});

export const readOneCampaign = (payload) => ({
    type: READ_ONE_CAMPAIGN,
    payload,
});

export const addManyCampaignsToStore = (payload) => ({
    type: ADD_MANY_CAMPAIGNS_TO_STORE,
    payload,
});

export const addOneCampaignToStore = (payload) => ({
    type: ADD_ONE_CAMPAIGN_TO_STORE,
    payload,
});

export const loadCampaignsToStore = (payload) => ({
    type: LOAD_CAMPAIGNS_TO_STORE,
    payload,
});

export const removeOneCampaignFromStore = (payload) => ({
    type: REM_ONE_CAMPAIGN_FROM_STORE,
    payload,
});