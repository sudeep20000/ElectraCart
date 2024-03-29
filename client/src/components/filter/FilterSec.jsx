import { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { BsFillGridFill } from "react-icons/bs";
import { TfiViewListAlt } from "react-icons/tfi";
import { FaThList } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import ItemCard from "../itemCard/ItemCard";
import Loader from "../loader/Loader";
import styles from "./FilterSec.module.css";

const FilterSec = ({
  isLoading,
  isSuccess,
  products,
  isTokenPresent,
  handelSeletedItem,
  handleComponentMount,
}) => {
  const [activeLayout, setActiveLayout] = useState("grid");

  const handelGridView = () => {
    setActiveLayout("grid");
  };

  const handelListView = () => {
    setActiveLayout("list");
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
            <select>
              <option value="" hidden>
                Headphone type
              </option>
              <option value="option1">In-ear headphone</option>
              <option value="option2">On-ear headphone</option>
              <option value="option3">Over-ear headphone</option>
            </select>
            <select>
              <option value="" hidden>
                Company
              </option>
              <option value="option1">JBL</option>
              <option value="option2">Sony</option>
              <option value="option3">Boat</option>
              <option value="option4">Zebronics</option>
              <option value="option5">Marshall</option>
              <option value="option6">Ptron</option>
            </select>
            <select>
              <option value="" hidden>
                Colour
              </option>
              <option value="option1">Blue</option>
              <option value="option2">Balck</option>
              <option value="option3">White</option>
              <option value="option4">Brown</option>
            </select>
            <select>
              <option value="" hidden>
                Price
              </option>
              <option value="option1">₹0 - ₹1,000</option>
              <option value="option2">₹1,000 - ₹10,000</option>
              <option value="option3">₹10,000 - ₹20,000</option>
            </select>
          </div>
        </div>
        <div className={styles.sort_container}>
          <select>
            <option value="" hidden>
              Sort by : Featured
            </option>
            <option value="option1">Price : Lowest</option>
            <option value="option2">Price : Highest</option>
            <option value="option3">Name : (A-Z)</option>
            <option value="option3">Name : (Z-A)</option>
          </select>
        </div>
      </div>

      <div
        className={`${
          activeLayout === "grid"
            ? styles.grid_main_container
            : styles.list_main_container
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={`${
              activeLayout === "grid"
                ? styles.items_grid_container
                : styles.items_list_container
            } ${!isSuccess && styles.normal_div}`}
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
            {!isSuccess && (
              <p className={styles.failFetch}>
                Fail to fetch data ☹ , try again later...
              </p>
            )}
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default FilterSec;
