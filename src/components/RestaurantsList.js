import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, [currentPage]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const retrieveRestaurants = () => {
    console.log(currentPage);
    RestaurantDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        // total = response.data.total_results;
        setMaxPages(Math.ceil(response.data.total_results / 20));
        console.log(maxPages);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by, page = 0) => {
    // let url;
    // if (searchCuisine === "All Cuisines" || searchCuisine === "") {
    //   url = `?name=${searchName}&zipcode=${searchZip}&page=${page}`;
    //   console.log("Only Name and Zip")
    // } else if (searchZip === "" && (searchCuisine === "All Cuisines" || searchCuisine === "")) {
    //   console.log("Only Name")
    //   url = `?name=${searchName}&page=${page}`;
    // } else if (searchZip === "" && (searchCuisine !== "All Cuisines" || searchCuisine !== "")) {
    //   console.log(searchCuisine === "")
    //   console.log(searchZip)
    //   console.log(searchName)
    //   console.log("Only Name and cuisine")
    //   url = `?name=${searchName}&cuisine=${searchCuisine}&page=${page}`;
    // }
    //  else {
    //   console.log("All")
    //   url = `?name=${searchName}&zipcode=${searchZip}&cuisine=${searchCuisine}&page=${page}`;
    // }
    RestaurantDataService.find(query, by, page)
      .then((response) => {
        console.log(response.data);
        setMaxPages(Math.ceil(response.data.total_results / 20));
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name", currentPage);
  };

  const findByZip = () => {
    find(searchZip, "zipcode", currentPage);
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-lg-4 input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-lg-4 input-group">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              return (
                <option value={cuisine}>{cuisine.substring(0, 20)}</option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-1">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </button>
        </div>
        <div className="col-lg-10">Current Page: {currentPage + 1}</div>
        <div className="col-lg-1">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= maxPages - 1}
          >
            Next
          </button>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant.id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
