import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchbarDropdown = (props) => {
  const { options, onInputChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.addEventListener("click", (event) => {
      event.stopPropagation();
      ulRef.current.style.display = "flex";
      onInputChange(event);
    });
    document.addEventListener("click", (event) => {
      ulRef.current.style.display = "none";
    });
  }, []);

  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Search..."
        ref={inputRef}
        onChange={onInputChange}
      />
      <ul className="list-group" id="result" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              className="list-group-item list-group-item-action "
              key={index}
              onClick={(e) => {
                inputRef.current.value = option;
              }}
            >
              {option}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

const defaultOptions = [];
for (let i = 0; i < 10; i++) {
  defaultOptions.push(`option ${i}`);
  defaultOptions.push(`suggestion ${i}`);
  defaultOptions.push(`advice ${i}`);
}

function App() {
  const [options, setOptions] = useState([]);
  const onInputChange = (event) => {
    const newOptions = defaultOptions.filter((option) =>
      option.includes(event.target.value)
    );
    setOptions(newOptions);
  };
  return (
    <div className="App">
      <h2>Search Bar Dropdown</h2>
      <SearchbarDropdown options={options} onInputChange={onInputChange} />
      <button type="button" className="btn btn-primary">
        Search
      </button>
    </div>
  );
}

export default App;
