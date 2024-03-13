import PropTypes from 'prop-types';
import './Bottle.css'
const Bottle = ({bottle , handleAddToCart}) => {
    const {name , price , img} = bottle;
    return (
        <div className="bottle">
            <h2>Bottle name : {name}</h2>
            <img src={img} alt="" />
            <h4>${price}</h4>
            <button className='btn' onClick={handleAddToCart}>Purchase</button>
        </div>
    );
};

Bottle.propTypes = 
{
    bottle:PropTypes.object.isRequired,
    handleAddToCart:PropTypes.func.isRequired
}
export default Bottle;