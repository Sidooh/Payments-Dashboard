import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest } from '@/lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { login, reset } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/app/store';
import * as yup from 'yup';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { toast } from '@/lib/utils';
import { CONFIG } from '@/config';
import SubmitButton from '@/components/common/SubmitButton.tsx';

const formSchema = yup.object({
    email: yup.string().max(100).required('Email is required.'),
    password: yup.string().max(20).required('Password is required.'),
});

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token, isError, isSuccess, isLoading, message } = useAuth();
    const form = useForm<LoginRequest>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit: SubmitHandler<LoginRequest> = (values) => dispatch(login(values));

    useEffect(() => {
        if (isError) toast({ titleText: message, icon: 'error' });
        if (isSuccess || token) navigate('/');

        dispatch(reset());
    }, [token, isError, isSuccess, message, navigate, dispatch]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Card className={'lg:p-5 lg:max-w-3xl lg:min-w-[30rem] relative shadow-xl border-0'}>
                    <CardHeader>
                        <CardTitle className={'text-end text-primary'}>
                            Welcome Back
                            <hr className="mt-3 w-1/2 ms-auto" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={() => (
                                    <FormItem>
                                        <Input
                                            placeholder="username@sidooh.co.ke"
                                            type={'email'}
                                            {...form.register('email')}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={() => (
                                    <FormItem>
                                        <Input
                                            placeholder="********"
                                            type={'password'}
                                            {...form.register('password')}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className={'flex-col'}>
                        <SubmitButton
                            className={'w-full'}
                            text={'Sign In'}
                            isLoading={isLoading}
                            loadingText={'Signing In...'}
                            disabled={isLoading || !form.formState.isValid}
                            icon={AiOutlineLogin}
                        />

                        <div className={'mt-5'}>
                            <div className="relative mt-4">
                                <hr className="bgap-300" />
                                <div className="divider-content-center">🌟</div>
                            </div>
                            <div className="mt-2">
                                <div className="text-center text-stone-400">
                                    <i>
                                        <small>{CONFIG.tagline}</small>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default Login;
