import { useState } from 'react';
import  '../styles/categories.css'
function Categories({onCategoryChange}){
    const [selectedCategory,setSelectedCategory] = useState("Fruits");

    const categories = ["Fruits","Vegetables","Dairy","Snacks","Beverages","Bakery"];

     const handleClick = (cat) => {
     setSelectedCategory(cat);
     onCategoryChange(cat);   // <-- VERY IMPORTANT
  };

    return(
    <div className="category-container py-2">
       <div className=" d-flex  justify-content-center gap-5 ">
        {categories.map((cat)=>(
            <p
            key={cat}
            className={`category-item ${selectedCategory === cat ? "active-category" : ""}`}
            onClick={()=>handleClick(cat)}
            >
                {cat}
            </p>
        ))}
         
       </div>
   </div>
 );
}

export default Categories;