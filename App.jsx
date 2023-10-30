import { useState } from "react";
import Nav from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";
//Database
import products from './db/data';

 function App() {
  const [selectedCategory,setSelectedCategory]=useState(null);
  const[query,setQuery]=useState("");
  //input filter


  const handleinputChange=event=>{
    setQuery(event.target.value)
  }
  const filterItems = products.filter((product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  //Radio filters
  const handleChange=(event)=>{
    setSelectedCategory(event.target.value);
  }
  //Buttons Filter
  const handleClick=(event)=>{
    setSelectedCategory(event.target.value)
  }
  function filteredData(products,selected,query)
  {
    let filteredProducts=products;

    //Filtering Input Items
    if (query){
      filteredProducts = filterItems
    }
    //selected Filter
    if(selected){
      filteredProducts=filteredProducts.filter(
     ({category,color,company,newPrice,title}) =>
       category===selected ||
       color===selected ||
       company===selected || 
       newPrice===selected ||
       title===selected
      )
    }
     return filteredProducts.map(
    ({img,title,star,reviews,prevPrice,newPrice})=>(
      < Card 
      key={Math.random()}
      img={img}
      title={title}
      star={star}
      reviews={reviews}
      newPrice={newPrice}
      prevPrice={prevPrice}
      />

     )
     
     );
  }
  const result=filteredData(products,selectedCategory,query);

  return(
    <>
   <Sidebar handleChange={handleChange}/>
   <Nav query={query} handleinputChange={handleinputChange}/>
   <Recommended handleClick={handleClick}/>
   <Products result={result}/>
  
   
   
   </>
  ) 
}

export default App;
