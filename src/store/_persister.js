/** */

const store_name = 'go-mailer-store';
const store_persister = {
    clearStore: () => {
        localStorage.removeItem(store_name);
    },

    initializeStore: () => {
        const store = localStorage.getItem(store_name);
        if (store) {
            return {
                ...JSON.parse(store)
            };
        }

        return {};
    },

    saveStoreState: (store) => {
        localStorage.setItem(store_name, JSON.stringify(store));
    }
};

export default store_persister;