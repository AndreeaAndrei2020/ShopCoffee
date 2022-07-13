import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {
  const {id}  = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchproduct();
  }, [id]);

  return <div>merge : {product.title}</div>;
};

export default Product;
