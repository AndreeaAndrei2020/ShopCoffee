import { useState } from "react";
import './order.css';
export default function TxList({ txs }) {
  const [textCLicked, setTextCLicked] = useState("copy");
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item) => (
        <div key={item} className="alert alert-info mt-5">
          <div
            className="flex-1 "
            style={{ textAlign: "center", wordWrap: "break-word" }}
          >
            <p
              className="responsive-font-example"
              style={{ textAlign: "center", wordWrap: "break-word" }}
            >
              {item.hash}{" "}
              <button className="btnClicked"
                onClick={() => {
                  navigator.clipboard.writeText(item.hash);
                  setTextCLicked("copied!");
                }}
              >
                {textCLicked}
              </button>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
