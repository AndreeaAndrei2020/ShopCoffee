import axios from "axios";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART_CLEAR_ITEMS } from "../../Redux/Constants/CartConstants.js";
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


    const tx = await signer.sendTransaction({
      to: addr, ///cui trimit? patronului
      value: ethers.utils.parseEther(ether),
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
  const [addressTransaction, setAddressTransaction] = useState();

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
  if(TotalPriceInEth.length > 20 )
  {
    const cutFromPrice = TotalPriceInEth.length-20;
    TotalPriceInEth= TotalPriceInEth.slice(0,-cutFromPrice);
  }  

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

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
      setAddressTransaction("0xC51b4Ad6D07406C87621C91DFC7E564c2aF740A8");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("shippingAddress");
      dispatch({ type: CART_CLEAR_ITEMS });
    }
  };

  return (
    <div>
      <ErrorMessage message={error} />
      {addressTransaction && (
        <>
          {" "}
          <h3 style={{ color: "white", textAlign: "center" }}>
            Thank you for your order, {userInfo.name}
          </h3>
          <h4 style={{ color: "white", textAlign: "center" }}>
            {" "}
            Bellow is your transaction id &darr;{" "}
          </h4>
          <div>
            {" "}
            <TxList txs={txs} />
            <p style={{ color: "white", textAlign: "center",paddingTop:'20px' }}>
              {" "}
              You cand verify your transaction id on this link :
              <a
                style={{ color: "#00b74a", wordWrap: "break-word" }}
                target="_blank"
                href="https://ropsten.etherscan.io/"
              >
                https://ropsten.etherscan.io/tx/0x055bdaaa93c55150d5128180a1c5450f35404f83ce01994ad0a4e9bc7f1e35b6!
              </a>
            </p>
          </div>
        </>
      )}

      {cart.cartItems.length > 0 || error ? (
        <>
          <section style={{ paddingTop: "10%" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0">
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row mt-1">
                      <h6 style={{ color: "white" }}>
                        The actual price of ETH :
                      </h6>
                      <h6 className="fw-bold text-success ms-1">
                        {" "}
                        1 ETH = {priceInEth} euro
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row mt-1">
                      <h6 style={{ color: "white" }}>Your order in DOLAR :</h6>
                      <h6 className="fw-bold text-success ms-1">
                        {priceInEuro} euro
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row mt-1">
                      <h6 style={{ color: "white" }}>Your order in ETH :</h6>
                      <h6 className="fw-bold text-success ms-1">
                        {TotalPriceInEth} ETH
                      </h6>
                    </div>
                  </div>
                  <hr />
                  {txs.length > 0 ? null : (
                    <button
                      className="btn btn-success btn-lg btn-block"
                      onClick={handleSubmit}
                    >
                      Proceed to payment{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>
          {" "}
          Your shopping bag is empty now .{" "}
        </p>
      )}
    </div>
  );
}
export default CryptoPaymentsForm;
