import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((ingredient) =>
        <li key={ingredient}>{ingredient}: {props.ingredients[ingredient]}</li>
    );
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button click={props.hide} btnType="Danger">CANCEL</Button>
            <Button click={props.checkout} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;