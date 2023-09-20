import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Header from "../components/Header";

function Categories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        "https://64d7c9805f9bf5b879cdf957.mockapi.io/api/v1/categories"
      );

      setData(res.data);
    } catch (error) {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteCat = async (id) => {
    const req = window.confirm("Do you wont to delete " + id + "-category");
    if (req) {
      await axios.delete(
        `https://64d7c9805f9bf5b879cdf957.mockapi.io/api/v1/categories/${id}`
      );
      getData();
    } else {
      alert("ok");
    }
  };

  const handleSearch = async (e) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://64d7c9805f9bf5b879cdf957.mockapi.io/api/v1/categories?search=${e.target.value}`
      );
      setData(res.data);
    } catch (error) {
      setLoading(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showProducts = (id) => {
    localStorage.setItem("productID", id);
    window.location.href = "/products";
  };

  return (
    <>
      <Header />

      <section className="container">
        <div className="categories-header">
          <input
            type="search"
            className="form-input"
            onChange={handleSearch}
            placeholder="Search"
          />
          <p>{data.length}</p>
        </div>
        <div className="as-row">
          {loading ? (
            <div className="loader container">
              <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : data.length ? (
            data.map((el) => (
              <div className="category-card" key={el.id}>
                <div className="img-div">
                  <LazyLoadImage className="w-100" src={el.img} alt="" />
                </div>
                <div className="p-3">
                  <h3 className="gradient-txt">{el.title.slice(0, 17)}...</h3>
                  <p>{el.descr.slice(0, 60)}...</p>
                  <div className="d-flex justify-content-between">
                    <p>
                      <b className="gradient-txt">date:</b>{" "}
                      {el.createdAt.slice(0, 10)}
                    </p>{" "}
                    <p>
                      <b className="gradient-txt">id:</b> {el.id}
                    </p>
                  </div>
                  <div className="btn-div d-flex justify-content-between align-items-center gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteCat(el.id)}
                    >
                      Delete <i class="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => showProducts(el.id)}
                      className="btn btn-outline-secondary"
                    >
                      See products <i class="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            "Not Found!"
          )}
        </div>
      </section>
    </>
  );
}

export default Categories;
