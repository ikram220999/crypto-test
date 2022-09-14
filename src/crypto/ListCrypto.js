import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
// import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import "./ListCrypto.css";

const ListCrypto = () => {
  const [crypto, setCrypto] = useState([]);
  console.log("data crypto", crypto);

  function getCryptoData() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then(function (response) {
        console.log(response);
        setCrypto(response.data);
      })
      .catch();
  }

  useEffect(() => {
    getCryptoData();
  }, []);

  return (
    <Container fluid className="p-3 cont">
      <h1 className="h3 mb-5"> </h1>

                  {crypto.map((cry, index) => {
                    return (
                      <div className="wrapper-crypto w-100 mb-3 p-4 border">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex flex-row align-items-center w-100">
                            <img src={cry.image} width="30" className=""></img>
                            <span>&nbsp;&nbsp; &nbsp;&nbsp;</span>
                            <h6 className="w-50 p-0 m-0 mr-3" color="grey">{cry.name}</h6>
                            <div className="w-25 d-flex justify-content-end">
                              {cry.market_cap_change_percentage_24h >= 0 ? (
                                <Badge color="success ">
                                  +{" "}
                                  {cry.market_cap_change_percentage_24h.toFixed(
                                    2
                                  )}
                                </Badge>
                              ) : (
                                <Badge color="danger">
                                  {cry.market_cap_change_percentage_24h.toFixed(
                                    2
                                  )}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <h6 className="p-0 m-0">{cry.current_price}</h6>
                        </div>
                      </div>
                    );
                  })}
            
              {/* {Object.keys(crypto).map(function (key) {
                        {
                          if (crypto[key].type == "fiat") {
                            return (
                              <tr>
                                <td>{key.toUpperCase()}</td>
                                <td>{crypto[key].name}</td>
                                <td>{crypto[key].value}</td>
                                <td>{crypto[key].unit}</td>
                              </tr>
                            );
                          } else {
                            return "";
                          }
                        }
                      })} */}
           
    </Container>
  );
};

export default ListCrypto;
