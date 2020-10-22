import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import styles from './Burger.module.css'

const burger = (props) => {

    let ingredientsTags = Object.keys(props.ingredients).map((ingredient)=>{
        return [...Array(props.ingredients[ingredient])]
            .map((_, index)=><BurgerIngredient type={ingredient} key={ingredient + index}/>);
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(ingredientsTags.length===0){
        ingredientsTags = <p>Please start adding ingredients!</p>
    }

    return(
    <div className={styles.Burger}>
        <BurgerIngredient type="BreadTop" />
            {ingredientsTags}
        <BurgerIngredient type="BreadBottom" />
    </div>
    );
};

export default burger;