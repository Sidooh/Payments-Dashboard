import { lazy, memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, reset } from 'features/auth/authSlice';
import { useAuth } from 'hooks/useAuth';
import { useAppDispatch } from 'app/hooks';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'utils/helpers';
import { CONFIG } from 'config';
import { TextField } from '@mui/material';

const LoadingButton = lazy(() => import('@mui/lab/LoadingButton'));
const LoginSharp = lazy(() => import('@mui/icons-material/LoginSharp'));

const validationSchema = yup.object({
    email   : yup.string().email('Must be a valid email').max(100).required('Email is required.'),
    password: yup.string().max(20).required('Password is required.')
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {auth, isLoading, isError, isSuccess, message} = useAuth();

    const formik = useFormik({
        initialValues   : {email: "", password: ""},
        validationSchema: validationSchema,
        onSubmit        : values => dispatch(login(values))
    });

    useEffect(() => {
        if (isError) toast({msg: message, type: 'danger'});
        if (isSuccess || auth) navigate('/');

        dispatch(reset());
    }, [auth, isError, isSuccess, message, navigate, dispatch]);

    return (
        <>
            <div className="row flex-between-center mb-2">
                <div className="col-auto"><h5>Sign In</h5></div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <TextField label="Email address" placeholder="Email address..." required name={'email'}
                               value={formik.values.email} autoFocus onChange={formik.handleChange}
                               autoComplete="username" error={Boolean(formik.errors.email)}
                               helperText={formik.errors.email}/>
                </div>
                <div className="mb-3">
                    <TextField label="Password" placeholder="Password..." required type={'password'}
                               name={'password'} value={formik.values.password} onChange={formik.handleChange}
                               error={Boolean(formik.errors.password)} helperText={formik.errors.password}/>
                </div>
                <div className="row flex-between-center">
                    <div className="col-auto">
                        <div className="form-check mb-0">
                            <input className="form-check-input" type="checkbox"
                                   id="basic-checkbox" defaultChecked={true}/>
                            <label className="form-check-label mb-0" htmlFor="basic-checkbox">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <Link className="fs--1" to="/login">Forgot Password?</Link>
                    </div>
                </div>
                <div className="mb-3">
                    <LoadingButton size="small" color="primary" loading={isLoading} type={'submit'}
                                   loadingPosition="end" className="w-100 mt-3" onClick={() => formik.submitForm()}
                                   endIcon={<LoginSharp/>} variant="contained">
                        Sign In
                    </LoadingButton>
                </div>
            </form>
            <div className="position-relative mt-4">
                <hr className="bg-300"/>
                <div className="divider-content-center">🌟</div>
            </div>
            <div className="row g-2 mt-2">
                <div className="col text-center">
                    <i><small>{CONFIG.sidooh.tagline}</small></i>
                </div>
            </div>
        </>
    );
};

export default memo(Login);
