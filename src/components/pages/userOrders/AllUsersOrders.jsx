import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const AllUsersOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersCollections = collection(db, "orders");
    getDocs(ordersCollections)
      .then((res) => {
        const ordersArr = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(ordersArr);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {orders.length === 0 ? (
        <div>
          <h1
            style={{
              marginTop: 200,
              marginBottom: 50,
              textAlign: "center",
            }}
          >
            Uups parece que todavia no hay compras hechas
          </h1>
        </div>
      ) : (
        <div style={{ marginTop: 40 }}>
          <div className="boxTitleMyOrders">
            <h1>Compras de todos los usuarios</h1>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de compras">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="left">ID de Orden</TableCell> */}
                  <TableCell align="left" style={{ fontSize: 25 }}>
                    Email del Cliente
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: 25 }}>
                    Producto
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: 25 }}>
                    Imagen
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: 25 }}>
                    Precio
                  </TableCell>
                  <TableCell align="left" style={{ fontSize: 25 }}>
                    Total de Orden
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) =>
                  order.items.map((product) => (
                    <TableRow key={`${order.id}-${product.id}`}>
                      {/* <TableCell align="left">{order.id}</TableCell> */}
                      <TableCell align="left" style={{ fontSize: 20 }}>
                        {order.email}
                      </TableCell>
                      <TableCell align="left" style={{ fontSize: 20 }}>
                        {product.title}
                      </TableCell>
                      <TableCell align="left">
                        <img
                          src={product.image}
                          alt="imagen producto"
                          style={{
                            width: 100,
                            height: 150,
                            borderRadius: 8,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left" style={{ fontSize: 20 }}>
                        ${product.unit_price}
                      </TableCell>
                      <TableCell align="left" style={{ fontSize: 20 }}>
                        ${order.total}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default AllUsersOrders;
