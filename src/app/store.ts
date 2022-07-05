import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import themeReducer from 'features/theme/themeSlice';
import { paymentsAPI } from 'features/payments/paymentsAPI';
import { mpesaAPI } from 'features/mpesa/mpesaAPI';
import { vouchersAPI } from 'features/vouchers/vouchersAPI';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,

        [paymentsAPI.reducerPath]: paymentsAPI.reducer,
        [mpesaAPI.reducerPath]: mpesaAPI.reducer,
        [vouchersAPI.reducerPath]: vouchersAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(paymentsAPI.middleware, mpesaAPI.middleware, vouchersAPI.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
