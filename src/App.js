import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TabBar from "./Components/TabBar";
import RightColumn from "./Components/RightColumns";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  function getData() {
    axios
      .get("https://api.weatherbit.io/v2.0/current?", {
        params: {
          city_id: "5128581",
          key: "ca3585ab32e64a238c94a5213d4ac39a",
        },
      })
      .then((res) => {
        setData(res.data.data);
        setIsLoading(true);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="wrapper">
      {isLoading ? (
        <div className="row">
          <div className="double-column">
            <div className="blue-column">
              <div className="first-element-sx">
                {data?.map((data, index) => {
                  return (
                    <span>
                      <div>
                        <img
                          src={require(`./media/${data.weather.icon}.png`)}
                          alt=""
                          style={{ width: "140px" }}
                        />
                        <p className="weather-description">
                          {data.weather.description}
                        </p>
                      </div>
                    </span>
                  );
                })}
              </div>
              <TabBar text="Now" />
            </div>
          </div>
          <RightColumn />
        </div>
      ) : (
        "No data to show"
      )}
    </div>
  );
}

export default App;
