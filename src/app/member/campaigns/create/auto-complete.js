/** */
const options = [
    {
        value: '@firstname',
        text: '@firstname'
    },
    {
        value: '@email',
        text: '@email'
    },
    {
        value: '@lastname',
        text: '@lastname'
    },
];

export const autoCompleter = (editor) => {

    const onAction = (autocompleteApi, rng, value) => {
        editor.selection.setRng(rng);
        editor.insertContent(value);
        autocompleteApi.hide();
    }

    editor.ui.registry.addAutocompleter('templatestringcharacter', {
        ch: '@',
        fetch: pattern => {
            return new Promise(function (resolve) {
                const filtered_results = options.filter( option => option.value.includes(pattern.substr(1)));
                const results = filtered_results.map(result => ({
                    ...result,
                    type: 'autocompleteitem',
                }));
                resolve(results);
            });
        },
        minChars: 1,
        onAction,
    })
}