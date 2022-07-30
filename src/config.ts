export const CONFIG = {
    sidooh: {
        services: {
            accounts: {
                api: {
                    url: import.meta.env.VITE_ACCOUNTS_API_URL
                },
                dashboard: {
                    url: import.meta.env.VITE_ACCOUNTS_DASH_URL
                }
            },
            products: {
                dashboard: {
                    url: import.meta.env.VITE_PRODUCTS_DASH_URL
                }
            },
            payments: {
                api: {
                    url: import.meta.env.VITE_PAYMENTS_API_URL
                },
            },
            notify  : {
                dashboard: {
                    url: import.meta.env.VITE_NOTIFY_DASH_URL
                }
            },
            legacy  : {
                url: import.meta.env.VITE_LEGACY_URL
            },
        },

        tagline: 'Sidooh, Makes You Money with Every Purchase!',
        version: '2.0'
    }
};