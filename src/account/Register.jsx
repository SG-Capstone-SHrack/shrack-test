import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useUserActions, useAlertActions } from '_actions';

export { Register };

function Register({ history }) {
    const userActions = useUserActions();
    const alertActions = useAlertActions();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Please type your gender.'),
        lastName: Yup.string()
            .required('Please type your age.'),
        height: Yup.string()
            .required('Height is required'),
        weight: Yup.string()
            .required('Weight is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
    function onSubmit(data) {
        return userActions.register(data)
            .then(() => {
                history.push('/account/login');
                alertActions.success('Registration successful');
            })
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Gender(male/female)</label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>                    
                    <div className="form-group">
                        <label>Height</label>
                        <input name="height" type="text" {...register('height')} className={`form-control ${errors.height ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.height?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Weight</label>
                        <input name="weight" type="text" {...register('weight')} className={`form-control ${errors.height ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.weight?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Nickname</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="login" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>
    )
}
