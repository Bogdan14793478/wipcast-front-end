import React from 'react';
// import shop from '../../shop.json';
import "./Shop.css";

const Shop = () => {
    let shopping = [
        {
            id: 1,
            title: "lorenIpson",
            category: "accessories",
            price: "$20",
            image: "https://demos.promola.co.za/wipcast/wp-content/uploads/sites/6/2020/05/alex-haigh-fEt6Wd4t4j0-unsplash-scaled.jpg"
        },
        {
            id: 2,
            title: "lorenIpson",
            category: "axsessuar",
            price: "$18",
            image: "https://demos.promola.co.za/wipcast/wp-content/uploads/sites/6/2020/05/faith-yarn-hgtWvsq5e2c-unsplash-scaled.jpg"
        },
        {
            id: 3,
            title: "lorenIpson",
            category: "axsessuar",
            price: "$25",
            image: "https://demos.promola.co.za/wipcast/wp-content/uploads/sites/6/2020/05/eric-gonzalez-Z3CHkelnvHA-unsplash-scaled.jpg"
        },
        {
            id: 4,
            title: "lorenIpson",
            category: "axsessuar",
            price: "$20",
            image: "https://demos.promola.co.za/wipcast/wp-content/uploads/sites/6/2020/05/leana-hodges-qeqEmGGOHg0-unsplash-scaled.jpg"
        }]

    let cartElements = shopping.map(item => {
        console.log(shopping)
        return (
            <div className="block" key={item.id}>
                <div>
                    <img className="img" src={item.image} alt="/" />
                </div>
                <div className="info">
                    <h3 className="title-cart">{item.title}</h3>
                    <h4 className="category-cart">{item.category}</h4>
                    <p className="price-cart">{item.price}</p>
                </div>
            </div>
        )
    })
    return (
        <div className="container">
            {cartElements}
        </div>
    )
}

export default Shop;