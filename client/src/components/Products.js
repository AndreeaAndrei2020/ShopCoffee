import React, { useEffect, useState } from "react";
import axios from "axios";
import clatite from "./photos/clatite.jpg";
import { Link } from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL;
// console.log(1111, process.env);

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data);
    };
    fetchproducts();
  }, []);

  return (
    <div>
      <img src={clatite} alt="f" style={{ width: "200px" }} />
      {products.map((product) => {
        return (
          <div key={product.id}>
            <div>
              <img
                src={`${API_URL}${product.src}`}
                alt="d"
                style={{ width: "200px" }}
              />
              <div>
                <p>
                  <Link to={`/products/${product.id}`}>{product.title} </Link>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
