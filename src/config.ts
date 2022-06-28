export const CONFIG = {
    sidooh: {
        services: {
            accounts: {
                api: {
                    url: import.meta.env.VITE_ACCOUNTS_API_URL
                }
            },
            products: {
                api: {
                    url: import.meta.env.VITE_PRODUCTS_API_URL
                }
            },
            notify  : {
                api      : {
                    url: import.meta.env.VITE_NOTIFY_API_URL
                },
                dashboard: {
                    url: import.meta.env.VITE_NOTIFY_DASH_URL
                }
            },
            legacy  : {
                dashboard: {
                    url: import.meta.env.VITE_LEGACY_URL
                }
            },
        },

        tagline: 'Sidooh, Makes You Money with Every Purchase!',
        version: '2.0'
    }
};