/** */
export const getToastOptions = (is_success = false) => ({
    variant: is_success ? 'success' : 'error',
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
    },
    preventDuplicate: true,
})