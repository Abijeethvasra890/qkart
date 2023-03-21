import { AddShoppingCartOutlined } from "@mui/icons-material";
//import IconButton from '@mui/material/IconButton';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  // console.log("product"+product)

  return (
    <Card className="card">
      <CardMedia
        component="img"
        // height="140"
        image={product.image}
        alt={product._id}
      />
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {/* {title} */}
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {/* {releaseDate} */}
          <b>${product.cost}</b>
        </Typography>
        <Rating
          value={product.rating}
          readOnly
        />
        <br />
        <CardActions className="card-actions">
          <Button fullWidth className="card-button" variant="contained" onClick={handleAddToCart} startIcon={<AddShoppingCartOutlined />
          } >
            {/* <IconButton style={{color:'white'}} aria-label="add to shopping cart"> */}
            {/* </IconButton> */}
            Add to Cart
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
