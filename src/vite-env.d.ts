/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LOG_LEVEL: string

    readonly VITE_ACCOUNTS_API_URL: string
    readonly VITE_PAYMENTS_API_URL: string

    readonly VITE_MERCHANTS_DASHBOARD_URL: string
    readonly VITE_NOTIFY_DASHBOARD_URL: string
    readonly VITE_PRODUCTS_DASHBOARD_URL: string
    readonly VITE_ACCOUNTS_DASHBOARD_URL: string
    readonly VITE_SAVINGS_DASHBOARD_URL: string
    readonly VITE_USSD_DASHBOARD_URL: string

    readonly VITE_LEGACY_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}