import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import themeReducer from 'features/theme/themeSlice';
import { paymentsAPI } from 'features/payments/paymentsAPI';
import { mpesaAPI } from 'features/mpesa/mpesaAPI';
import { vouchersAPI } from 'features/vouchers/vouchersAPI';
import { floatAccountsApi } from 'features/float-accounts/floatAccountsApi';
import { dashboardApi } from "../features/dashboard/dashboard.api";
import { analyticsApi } from "../features/analytics/analyticsApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,

        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [analyticsApi.reducerPath]: analyticsApi.reducer,
        [paymentsAPI.reducerPath]: paymentsAPI.reducer,
        [mpesaAPI.reducerPath]: mpesaAPI.reducer,
        [vouchersAPI.reducerPath]: vouchersAPI.reducer,
        [floatAccountsApi.reducerPath]: floatAccountsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(
            dashboardApi.middleware,
            analyticsApi.middleware,
            paymentsAPI.middleware,
            mpesaAPI.middleware,
            vouchersAPI.middleware,
            floatAccountsApi.middleware
        )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
