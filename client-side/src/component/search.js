import './component.css';


const SearchBar = () => (
    <form action="/" method="get" >
        <label htmlFor="header-search">
            <span className="visually-hidden">Search... </span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search..."
            name="s" 
            className='search-input'
            style={{width:"25vw"}}
        />
        <button onClick={(e)=> e.preventDefault()}> <i className="gg-search m-1" ></i> </button>
        
    </form>
);

export default SearchBar;