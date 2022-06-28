/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ACCOUNTS_API_URL: string
    readonly VITE_PRODUCTS_API_URL: string
    readonly VITE_NOTIFY_API_URL: string
    readonly VITE_NOTIFY_DASH_URL: string
    readonly VITE_PAYMENTS_DASH_URL: string
    readonly VITE_ACCOUNTS_DASH_URL: string
    readonly VITE_SAVINGS_DASH_URL: string
    readonly VITE_LEGACY_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}