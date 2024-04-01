import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { BsFillGridFill } from "react-icons/bs";
import { TfiViewListAlt } from "react-icons/tfi";
import { FaThList } from "react-icons/fa";
import ItemCard from "../itemCard/ItemCard";
import Loader from "../loader/Loader";
import styles from "./FilterSec.module.css";
import Images from "../../images/Images";

const FilterSec = ({
  isLoading,
  products,
  filteredObj,
  isFound,
  handelSetFilterObj,
  isTokenPresent,
  handelSeletedItem,
  handleComponentMount,
}) => {
  const [activeLayout, setActiveLayout] = useState("grid");
  const [filters, setFilters] = useState({
    type: "",
    brand: "",
    color: "",
    price: "",
  });
  const [sortBy, setSortBy] = useState("");

  const handelGridView = () => {
    setActiveLayout("grid");
  };

  const handelListView = () => {
    setActiveLayout("list");
  };

  const handelheadphoneType = (e) => {
    const type = e.target.value;
    handelSetFilterObj({ ...filteredObj, type });
    setFilters((prevFilter) => {
      return { ...prevFilter, type };
    });
  };

  const handelheadphoneBrand = (e) => {
    const brand = e.target.value;
    handelSetFilterObj({ ...filteredObj, brand });
    setFilters((prevFilter) => {
      return { ...prevFilter, brand };
    });
  };

  const handelheadphoneColor = (e) => {
    const color = e.target.value;
    handelSetFilterObj({ ...filteredObj, color });
    setFilters((prevFilter) => {
      return { ...prevFilter, color };
    });
  };

  const handelheadphonePrice = (e) => {
    const price = e.target.value;
    handelSetFilterObj({ ...filteredObj, price });
    setFilters((prevFilter) => {
      return { ...prevFilter, price };
    });
  };

  const handelSortBy = (e) => {
    const sortBy = e.target.value;
    handelSetFilterObj({ ...filteredObj, sortBy });
    setSortBy(sortBy);
  };

  return (
    <>
      <div className={styles.filter_sec}>
        <div className={styles.filter_container}>
          <div className={styles.view_btns}>
            <div className={styles.grid_view} onClick={handelGridView}>
              {activeLayout === "grid" ? (
                <BsFillGridFill size={26} />
              ) : (
                <CiGrid41 size={26} />
              )}
            </div>
            <div className={styles.list_view} onClick={handelListView}>
              {activeLayout === "list" ? (
                <FaThList size={24} />
              ) : (
                <TfiViewListAlt size={24} />
              )}
            </div>
          </div>
          <div className={styles.filter_btns}>
            <select
              value={filters.type}
              onChange={(e) => handelheadphoneType(e)}
            >
              <option value="">Headphone type</option>
              <option value="in-ear">In-ear headphone</option>
              <option value="on-ear">On-ear headphone</option>
              <option value="over-ear">Over-ear headphone</option>
            </select>

            <select
              value={filters.brand}
              onChange={(e) => handelheadphoneBrand(e)}
            >
              <option value="">Company</option>
              <option value="JBL">JBL</option>
              <option value="Sony">Sony</option>
              <option value="Boat">Boat</option>
              <option value="Zebronics">Zebronics</option>
              <option value="Marshall">Marshall</option>
              <option value="PTron">Ptron</option>
            </select>

            <select
              value={filters.color}
              onChange={(e) => handelheadphoneColor(e)}
            >
              <option value="">Colour</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
            </select>

            <select
              value={filters.price}
              onChange={(e) => handelheadphonePrice(e)}
            >
              <option value="">Price</option>
              <option value="0-1000">₹0 - ₹1,000</option>
              <option value="1000-10000">₹1,000 - ₹10,000</option>
              <option value="10000-20000">₹10,000 - ₹20,000</option>
            </select>
          </div>
        </div>

        <div className={styles.sort_container}>
          <select value={sortBy} onChange={(e) => handelSortBy(e)}>
            <option value="">Sort by : features</option>
            <option value="price:asc">Price : Lowest</option>
            <option value="price:desc">Price : Highest</option>
            <option value="brand:asc">Name : (A-Z)</option>
            <option value="brand:desc">Name : (Z-A)</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      ) : (
        <>
          {isFound ? (
            <div
              className={`${
                activeLayout === "grid"
                  ? styles.grid_main_container
                  : styles.list_main_container
              }`}
            >
              <div
                className={`${
                  activeLayout === "grid"
                    ? styles.items_grid_container
                    : styles.items_list_container
                }`}
              >
                {products.map((product, i) => (
                  <ItemCard
                    product={product}
                    activeLayout={activeLayout}
                    isTokenPresent={isTokenPresent}
                    handelSeletedItem={handelSeletedItem}
                    handleComponentMount={handleComponentMount}
                    key={i}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className={styles.not_found}>
              <img src={Images.image8} alt="no search result" />
              <span>Sorry, no results found!</span>
            </p>
          )}
        </>
      )}
    </>
  );
};

export default FilterSec;
