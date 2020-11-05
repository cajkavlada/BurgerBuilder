import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup, setIsSignup] = useState(true);

    const {onSetAuthRedirectPath} = props;
    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, props.buildingBurger, props.authRedirectPath]);

    const inputChangeHandler = (event, id) => {
        const updatedControlsForm = {
            ...controls,
            [id]: {
                ...controls[id],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[id].validation),
                touched: true
            }
        };
        setControls(updatedControlsForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup((prevState) => !prevState);
    }

    const formElementsArray = [];
    for (const key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            change={(event) => inputChangeHandler(event, formElement.id)}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched} />
    ));

    if (props.loading) {
        form = <Spinner />
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = (<p>{props.error.message}</p>);
    }
    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }
    return (
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button btnType="Danger" click={switchAuthModeHandler}>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);