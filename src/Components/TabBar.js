import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/TabBar.css";

function TabBar(props) {
  const [toggleState, setToggleState] = useState(1);
  const [dataTab, setDataTab] = useState([]);
  const [dataTabWeek, setDataTabWeek] = useState([]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.weatherbit.io/v2.0/history/hourly?city_id=5128581&start_date=2022-03-27%3A16&end_date=2022-03-27%3A21&key=ca3585ab32e64a238c94a5213d4ac39a"
      )
      .then((res) => {
        setDataTab(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.weatherbit.io/v2.0/forecast/daily?city_id=5128581&key=ca3585ab32e64a238c94a5213d4ac39a"
      )
      .then((res) => {
        setDataTabWeek(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <p className="tabs-title">Today</p>
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <p className="tabs-title">Week</p>
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {dataTab?.map((dataTab, index) => {
            return (
              <div className="item-tabs" key={index}>
                <p>{dataTab.datetime.slice(-2)}:00 a.m.</p>
                <img
                  src={require(`../media/${dataTab.weather.icon}.png`)}
                  alt="icon-weather"
                />
                <p>{dataTab.azimuth} C°</p>
              </div>
            );
          })}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {dataTabWeek?.slice(0, 5).map((dataTabWeek, index) => {
            return (
              <div className="item-tabs" key={index}>
                <p>{dataTabWeek.datetime}</p>
                <img
                  src={require(`../media/${dataTabWeek.weather.icon}.png`)}
                  alt="icon-weather"
                />
                <p>{dataTabWeek.temp} C°</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TabBar;
