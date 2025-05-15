import { Button, useMediaQuery, useTheme } from "@mui/material";
import "./ProductCardDetail.css";

const ProductCardDetail = ({ title, description, unit_price, image }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div>
      <h1 className="titleCardDetail">{title}</h1>
      <div className="boxCardDetail">
        <div>
          <img className="imgCardDetail" src={image} alt="" />
        </div>
        <div>
          <h2>Descripción</h2>
          <p className="textDetailDescription">
            {description.split("\n").map((linea, index) => (
              <span key={index}>
                {linea}
                <br />
              </span>
            ))}
          </p>
          <h3 className="cardDetailPrice">${unit_price}</h3>
          <div className="boxButtonsDetail">
            <Button
              size={isLargeScreen ? "large" : "small"}
              style={{ marginRight: 20, marginBottom: 0 }}
              variant="contained"
            >
              Consultar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetail;
