import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.InputElement];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(styles.Invalid);
        validationError = <p className={styles.ValidationError}>Please enter a valid value!</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputStyles.join(' ')} onChange={props.change} {...props.elementConfig} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputStyles.join(' ')} onChange={props.change} {...props.elementConfig} value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select className={inputStyles.join(' ')} onChange={props.change} value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} >{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={inputStyles.join(' ')} onChange={props.change} {...props.elementConfig} value={props.value} />;
    }
    
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;