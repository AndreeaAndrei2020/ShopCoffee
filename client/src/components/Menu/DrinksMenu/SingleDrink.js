import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singleDrinks.css";

const API_URL = process.env.REACT_APP_API_URL;

const SingleDrink = () => {
  const { id } = useParams();
  const [drink, setDrink] = useState({});
  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await axios.get(`${API_URL}/api/drinks/${id}`);
      setDrink(data["product"]);
    };
    fetchproduct();
  }, [id]);

  return (
    <div className="Product">

 
    <div className="small-container single-product">
      <div className="row">
        <div className="col2">
          <img src={`${API_URL}${drink.image}`} alt={drink.name}></img>
        </div>
        <div className="col2">
          <h1>{drink.name}</h1>
          <h4>{drink.price} ron</h4>
          <button  className="btnAddCard">
            Add to Card
          </button>
          <input type="number" id="quantity" name="quantity" min="1"  /> <br></br>

          <p className="description">{drink.description}</p>
        </div>
      </div>
    </div>
    </div>
  );
};
{
  /* {drink.name} */
}

export default SingleDrink;
