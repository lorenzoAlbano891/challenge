import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/App.css";
function RightColumns() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.weatherbit.io/v2.0/current?", {
        params: {
          city_id: "5128581",
          key: "ca3585ab32e64a238c94a5213d4ac39a",
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {});
  }, []);

  var now = new Date();
  var date = now.toUTCString().split("", 11);
  var time = now.getHours() + ":" + now.getMinutes();

  return (
    <div className="column">
      {data?.map((weather, index) => {
        return (
          <div key={index}>
            <div className="location">
              <p className="location-city">{weather.city_name}</p>
              <h5 className="subtitleDx">
                {weather.country_code === "US" ? (
                  <p className="location-state">UNITED STATES</p>
                ) : null}
              </h5>
            </div>
            <div className="time-info">
              <p className="temperature">{weather.temp}°</p>
              <p className="time">{time} a.m.</p>
              <p className="date">{date} 2022</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RightColumns;
