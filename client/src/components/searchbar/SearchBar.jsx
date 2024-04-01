import { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

const SearchBar = ({ filteredObj, handelSetFilterObj }) => {
  const [searchText, setSearchText] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    };
    document.addEventListener("keydown", callback);
    return document.addEventListener("keydown", callback);
  }, []);

  const handleTypeSearch = (e) => {
    const newSearchText = e.target.value;
    handelSetFilterObj({ ...filteredObj, search: newSearchText });
    setSearchText(newSearchText);
  };

  return (
    <div className={styles.searchbar}>
      <label htmlFor="searchInput" className={styles.search_icon}>
        <IoSearchOutline color="grey" size={24} />
      </label>
      <input
        type="search"
        id="searchInput"
        placeholder="Search by Product Name"
        value={searchText}
        ref={inputEl}
        onChange={(e) => handleTypeSearch(e)}
      />
    </div>
  );
};

export default SearchBar;
