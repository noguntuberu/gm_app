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
        },
        {
            title: 'Last name',
            key: 'lastname',
        },
        {
            title: 'Email',
            key: 'email',
        },
        {
            title: 'Date of birth',
            key: 'date_of_birth',
            formatter: value => { return (new Date(value)).toDateString() },
        },
    ],
    items: [],
    // search_key: 'name',
    search_text: '',
};

