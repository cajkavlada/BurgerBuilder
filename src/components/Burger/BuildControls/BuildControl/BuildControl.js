import React from 'react';
import styles from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.ingredient}</div>
        <button className={styles.Less} onClick={props.removeIngredient} 
            disabled={props.ammount<=0}>-</button>
        <div>{props.ammount}</div>
        <button className={styles.More} onClick={props.addIngredient}>+</button>
    </div>
);

export default buildControl;