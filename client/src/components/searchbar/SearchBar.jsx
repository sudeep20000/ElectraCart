import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <label htmlFor="search-input" className={styles.search_icon}>
        <IoSearchOutline color="grey" size={24} />
      </label>
      <input
        type="search"
        id="search-input"
        placeholder="Search by Product Name"
      />
    </div>
  );
};

export default SearchBar;
