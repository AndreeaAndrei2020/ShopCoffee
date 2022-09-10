import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../../Redux/Actions/OrderActions.js";
import { CART_CLEAR_ITEMS } from "../../../Redux/Constants/CartConstants.js";
import ErrorMessage from "./ErrorMessage.js";
import TxList from "./TsxList.js";

const { ethers } = require("ethers");

const SingleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

///CONT 3 0x35a6A913944FF3eE97E50784F55F55d2E3f0fB35
const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts"); ///intreaba care cont
    // Connecting to MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum); //A connection to the Ethereum network
    const signer = provider.getSigner(); ///Holds your private key and can sign things
    const amount = ethers.utils.parseEther(ether);
    const tx = await signer.sendTransaction({
      to: addr, 
      value: amount,
    });
    setTxs([tx]);
    return tx;
  } catch (err) {
    setError(err.message);
  }
};

function CryptoPaymentsForm(state) {
  const idEth = "ethereum";
  const [priceInEth, setPriceInEth] = useState();
  const [sendTransaction, setSendTransaction] = useState(false);

  //obtinem pretul actual al ethereum
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(idEth));
    setPriceInEth(data.market_data.current_price.eur);
  };
  fetchCoin();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const priceInEuro = cart.totalPrice;

  const calculateTotalPriceInEth = () => {
    return priceInEuro / priceInEth;
  };

  let TotalPriceInEth = calculateTotalPriceInEth().toString();
  if (TotalPriceInEth.length > 20) {
    const cutFromPrice = TotalPriceInEth.length - 20;
    TotalPriceInEth = TotalPriceInEth.slice(0, -cutFromPrice);
  }

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const style1 = { padding: "20px" };
  const [styleForTransaction, setStyleForTransaction] = useState(style1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    const paymentResponse = await startPayment({
      setError,
      setTxs,
      ether: TotalPriceInEth,
      addr: "0xC51b4Ad6D07406C87621C91DFC7E564c2aF740A8",
    });
    if (paymentResponse) {
      setSendTransaction(true);
      await dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        })
      );
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("weather");
      dispatch({ type: CART_CLEAR_ITEMS });
    }
  };

  return (
    <div>
      <ErrorMessage message={error} />
      {sendTransaction && (
        <div style={{ height: "100vh" }}>
          {" "}
          <h3 style={{ color: "white", textAlign: "center" }}>
           Mulțumim pentru comandă, {userInfo.name}.
          </h3>
          <h4 style={{ color: "white", textAlign: "center" }}>
            {" "}
           Mai jos este id-ul tranzacției &darr;{" "}
          </h4>
          <div>
            {" "}
            <TxList txs={txs} />
            <p
              style={{
                color: "white",
                textAlign: "center",
                paddingTop: "20px",
              }}
            >
              {" "}
             Puteți verifica tranzacția pe acest link , introducând id-ul tranzacției. 
              <a
                style={{ color: "#00b74a", wordWrap: "break-word" }}
                target="_blank"
                href="https://ropsten.etherscan.io/"
              >
                https://ropsten.etherscan.io/tx/0x055bdaaa93c55150d5128180a1c5450f35404f83ce01994ad0a4e9bc7f1e35b6!
              </a>
            </p>
          </div>
        </div>
      )}

      {cart.cartItems.length > 0 || error ? (
        <>
          <div
            className="row d-flex justify-content-center align-items-center h-100"
            style={{ marginBottom: "100px " }}
          >
            <div className="col-lg-10 col-xl-8">
              <div className="card">
                <section>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      className="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0"
                      style={styleForTransaction}
                    >
                      <div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row mt-1">
                            <h6 className="text-success">
                              <b> Preț actual ETH :</b>
                            </h6>
                            <h6
                              className="fw-bold  ms-1"
                              style={{ color: "green" }}
                            >
                              {" "}
                              <b> 1 ETH = {priceInEth} euro</b>
                            </h6>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row mt-1">
                            <h6 className="text-success">
                              <b>Prețul comenzii în ETH:</b>
                            </h6>
                            <h6
                              className="fw-bold  ms-1"
                              style={{ color: "green" }}
                            >
                              <b> {TotalPriceInEth} ETH </b>
                            </h6>
                          </div>
                        </div>
                        <hr />
                        {txs.length > 0 ? null : (
                          <button
                            className="btn btn-success btn-lg btn-block"
                            onClick={handleSubmit}
                          > Finalizați plata
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
export default CryptoPaymentsForm;
