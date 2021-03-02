export const table_config = {
    actions: {
        bulk: ['Add to audience', 'Delete'],
        single: ['Add to audience','Edit', 'Delete'],
    },
    allow_bulk_action: true,
    css: {},
    fields: [
        {
            title: 'ID',
            key: 'id',
        },
        {
            title: 'First name',
            key: 'firstname',
            isTitle: true,
        },
        {
            title: 'Last name',
            key: 'lastname',
            isTitle: true,
        },
        {
            title: 'Email',
            key: 'email',
            isTagline: true,
        },
        {
            title: 'Date of birth',
            key: 'date_of_birth',
            formatter: value => { return value ? (new Date(value)).toDateString() : '' },
            isMetadata: true,
        },
    ],
    items: [],
    // search_key: 'name',
    search_text: '',
};

