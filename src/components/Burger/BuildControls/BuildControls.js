import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const buildControls = (props) => {

    const fullAmount = Object.values(props.ingredients).reduce((arr,el)=>(arr+el),0);

    const buildControls = Object.keys(props.ingredients).map((ingredient) => 
        <BuildControl 
            ingredient={ingredient} 
            ammount={props.ingredients[ingredient]} 
            key={ingredient}
            addIngredient={props.addIngredient.bind(this, ingredient)} 
            removeIngredient={props.removeIngredient.bind(this, ingredient)}/>        
    );

    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {buildControls}
            <button className={styles.OrderButton} disabled={fullAmount<1} onClick={props.order}>ORDER NOW</button>
        </div>
    );
};

export default buildControls;