/** */
const template_strings = [
    {
        type: 'autocompleteitem',
        value: 'firstName',
        text: 'First Name'
    }
];

export const autoCompleter = (editor) => {
    const fetch = async pattern => {
        return template_strings;
    }

    const onAction = (autocompleteApi, rng, value) => {
        editor.selection.setRng(rng);
        editor.insertContent(value);
        autocompleteApi.hide();
    }

    editor.ui.registry.addAutocompleter('templatestringcharacter', {
        ch: '@',
        fetch: pattern => {
            return new Promise(function (resolve) {
                var results = [{
                    type: 'autocompleteitem',
                    value: 'firstName',
                    text: 'First Name'
                }];
                resolve(results);
            });
        },
        minChars: 1,
        onAction,
    })
}