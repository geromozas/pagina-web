import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig.js";
import { getDocs, collection, limit, query } from "firebase/firestore";
import ProductCard from "../../productCard/ProductCard.jsx";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let refCollection = collection(db, "products");

    let productQuery = query(refCollection, limit(3));

    getDocs(productQuery)
      .then((res) => {
        let newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="boxHome">
      <div className="homeStart">
        <div className="boxTextHome">
          <h1 className="titleHome">Titulo</h1>
          <p className="textInitialHome">
            Ejemplo texto: breve presentacion, breve presentación, breve
            presentación, breve presentación, breve presentación, breve
            presentación, breve presentación, breve presentación, breve
            presentación.
          </p>
          <div className="buttonsHome">
            <Link to={"/shop"}>
              <Button
                size="small"
                variant="contained"
                className="explorerCourse"
                style={{ marginRight: 20 }}
              >
                Explorar productos
              </Button>
            </Link>
            <Link to={"/about-me"}>
              <Button size="small" variant="contained">
                Conoce más
              </Button>
            </Link>
          </div>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/pagina-web-b1102.firebasestorage.app/o/placeholder.jpg?alt=media&token=ac4ce2ca-e34f-4dfb-8d42-877a57f91be8"
          alt="imagen presentación"
          className="imgHome"
        />
      </div>
      <div
        style={{
          marginTop: 50,
          backgroundColor: "#27548A",
          borderRadius: "10px",
        }}
      >
        <h1 className="outStanding">Lo más destacado</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                description={product.description_small}
                unit_price={product.unit_price}
                id={product.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
