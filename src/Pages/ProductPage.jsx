import axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Header from "../components/Header";

function ProductPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const productID = localStorage.getItem("productID");

  const getData = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://64d7c9805f9bf5b879cdf957.mockapi.io/api/v1/categories/${productID}/product?p=${page}&l=6`
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
        `https://64d7c9805f9bf5b879cdf957.mockapi.io/api/v1/categories/${productID}/product/${id}`
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
        `https://64d7c9805f9bf5b879cdf957.mockapi.io/api/v1/categories/${productID}/product?search=${e.target.value}`
      );
      setData(res.data);
    } catch (error) {
      setLoading(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = async (e) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://64d7c9805f9bf5b879cdf957.mockapi.io/api/v1/categories/${productID}/product?order=${e.target.value}`
      );
      setData(res.data);
    } catch (error) {
      setLoading(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const prevPage = () => {
    setPage(page - 1);
    getData();
  };
  const nextPage = () => {
    setPage(page + 1);
    getData();
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
        <div className="filters">
          <div className="filter d-flex justify-content-between gap-5 my-3">
            <select
              className="form-select"
              onChange={handleSort}
              aria-label="Default select example"
            >
              <option value="">All</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
            <input
              type="number"
              onChange={handleSearch}
              className="form-control"
              placeholder="price..."
            />
          </div>
        </div>
        <div className="as-row">
          {loading ? (
            <div className="container">loading</div>
          ) : data.length ? (
            data.map((el) => (
              <div className="category-card" key={el.id}>
                <div className="img-div">
                  <LazyLoadImage className="w-100" src={el.img} alt="" />
                </div>
                <div className="p-3">
                  <h3 className="gradient-txt">{el.product.slice(0, 17)}...</h3>
                  <div className="d-flex justify-content-between">
                    <p>
                      <b className="gradient-txt">date:</b>{" "}
                      {el.createdAt.slice(0, 10)}
                    </p>{" "}
                    <p>
                      <b className="gradient-txt">price:</b> {el.price}
                    </p>
                  </div>
                  <div className="btn-div d-flex justify-content-between align-items-center gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteCat(el.id)}
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            "Not Found!"
          )}
        </div>
        <div className="mb-3 d-flex gap-2 justify-content-center">
          <button onClick={prevPage} className="btn btn-outline-secondary">
            <i class="fa-solid fa-backward"></i> Prev
          </button>
          <button className="btn btn-outline-success">{page}</button>
          <button onClick={nextPage} className="btn btn-outline-secondary">
            Next <i class="fa-solid fa-forward"></i>
          </button>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
