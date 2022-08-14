import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

    ethers.utils.getAddress(addr); ///getAddress etse un=utils

    const tx = await signer.sendTransaction({
      //Cerere de tranzacție
      to: addr, ///cui trimit? patronului
      value: ethers.utils.parseEther(ether),
    });

    setTxs([tx]);
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

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  // console.log(111, order);

  const calculateTotalPriceInEth = () => {
    // console.log("Total price", state.totalPrice);
    // console.log("Coin", priceInEth);
    return state.totalPrice / priceInEth;
  };
  const yourPrice = calculateTotalPriceInEth();
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs, ///tranzactia
      ether: data.get("ether"),
      addr: data.get("addr"), ///cui trimit
    });
    setAddressTransaction(data.get("addr"));
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment {yourPrice}
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
                value={"0xC51b4Ad6D07406C87621C91DFC7E564c2aF740A8"}
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
                value={yourPrice}
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          {addressTransaction ? (
            <>
              {" "}
              <p style={{ color: "white" }}>da</p>
            </>
          ) : (
            <>
              {" "}
              <p style={{ color: "white" }}>nu</p>
            </>
          )}
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
export default CryptoPaymentsForm;
