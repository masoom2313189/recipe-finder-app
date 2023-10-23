import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [list, updateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const APP_ID = "213250ff";
  const APP_KEY = "609bf40b770e21e15e1bb0473cf01ec4";
  const [count, setCount] = useState(0);

  const search = () => {
    searchRecipe(inputRef.current.value);
    inputRef.current.value = "";
  };

  const searchRecipe = (query) => {
    setLoading(true);
    let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        updateList(res.hits);
        console.log(res.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchRecipe("chicken");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="InputWrapper">
          <input ref={inputRef} placeholder="Search for recipe" />
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className="wrapper">
          {list.map((item) => {
            return (
              <div className="Ingredient" key={item.recipe.label}>
                <span>{item.recipe.label}</span>
                <img src={item.recipe.image} />
                <div className="Steps">
                  {item.recipe.ingredientLines.map((step, index) => {
                    return <p key={index}>{step}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
