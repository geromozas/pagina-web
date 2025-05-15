import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig.js";
import ProductCardDetail from "../../productCard/ProductCardDetail.jsx";

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((err) => console.log(err));
  }, [id]);

  // console.log(product);

  return (
    <div style={{ marginTop: 40 }}>
      {product && (
        <div>
          <ProductCardDetail
            title={product.title}
            description={product.description}
            unit_price={product.unit_price}
            image={product.image}
          />
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
