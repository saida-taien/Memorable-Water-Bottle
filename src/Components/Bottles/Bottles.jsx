import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css';
import { addToLocalStorage, getStoredCart, removeFromLocalStorage } from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";
const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart , setCart] = useState([]);

    useEffect(() => {
        fetch('Bottle.json')
            .then(res => res.json())
            .then(data => setBottles(data));
    }, []);

    useEffect( () =>
    {
        console.log("Called the useEffect" , bottles.length);
        if(bottles.length)
        {
            const storedCart = getStoredCart();
            console.log(storedCart , bottles);
            const savedCart  = [];
            for(const id of storedCart)
            {
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle)
                {
                    savedCart.push(bottle);
                }
            }
            console.log(savedCart);
            setCart(savedCart);
        }
    } , [bottles]);

    const handleAddToCart = bottle =>
    {
        const newCart = [...cart , bottle];
        setCart(newCart);
        addToLocalStorage(bottle.id);
    }


    const handleRemoveFromCart = id =>
    {
        //Visual cart remove

        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        // remove from local storage

        removeFromLocalStorage(id);
    }

    return (
        <div>
            <h4>Bottles Available : {bottles.length}</h4>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottle => <Bottle key={bottles.id} bottle={bottle} handleAddToCart={()=> handleAddToCart(bottle)}></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;