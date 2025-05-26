import React, { useState } from "react";
import {
  Container, Typography, Box, Button, MenuItem, Select, InputLabel, FormControl, Card, CardMedia, CardContent, CardActions, TextField, Snackbar, Alert
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const beanTypes = [
  { name: "Arabica", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { name: "Robusta", img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
  { name: "Liberica", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80" },
];

const regions = [
  { name: "Ethiopia", vendors: ["Sidamo Estates", "Yirgacheffe Farms"] },
  { name: "Colombia", vendors: ["Huila Beans", "Antioquia Estates"] },
  { name: "Vietnam", vendors: ["Dak Lak Farms", "Lam Dong Estates"] },
];

const beans = {
  "Sidamo Estates": [
    { name: "Sidamo Gold", price: 15, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" },
    { name: "Sidamo Classic", price: 12, img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  ],
  "Yirgacheffe Farms": [
    { name: "Yirgacheffe Floral", price: 18, img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  ],
  "Huila Beans": [
    { name: "Huila Supremo", price: 14, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" },
  ],
  "Antioquia Estates": [
    { name: "Antioquia Dark", price: 16, img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" },
  ],
  "Dak Lak Farms": [
    { name: "Dak Lak Robusta", price: 10, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80" },
  ],
  "Lam Dong Estates": [
    { name: "Lam Dong Blend", price: 13, img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80" },
  ],
};

function App() {
  const [selectedBeanType, setSelectedBeanType] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedBean, setSelectedBean] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // For Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    if (!selectedBean || !selectedVendor) return;
    const beanObj = beans[selectedVendor].find(b => b.name === selectedBean);
    setCart([...cart, { ...beanObj, quantity }]);
    setSnackbarOpen(true);
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Coffee Bean Marketplace
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        Discover, select, and order the world’s finest coffee beans.
      </Typography>

      {/* Bean Type Selection */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Select Bean Type</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {beanTypes.map(bt => (
            <Card
              key={bt.name}
              sx={{
                width: 180,
                border: selectedBeanType === bt.name ? "2px solid #6f4e37" : "1px solid #ccc",
                cursor: "pointer",
                boxShadow: selectedBeanType === bt.name ? 6 : 1,
                transition: "box-shadow 0.2s"
              }}
              onClick={() => setSelectedBeanType(bt.name)}
            >
              <CardMedia component="img" height="120" image={bt.img} alt={bt.name} />
              <CardContent>
                <Typography variant="subtitle1" align="center">{bt.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Region Selection */}
      {selectedBeanType && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Select Coffee Growing Region</Typography>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              value={selectedRegion}
              label="Region"
              onChange={e => {
                setSelectedRegion(e.target.value);
                setSelectedVendor("");
                setSelectedBean("");
              }}
            >
              {regions.map(r => (
                <MenuItem key={r.name} value={r.name}>{r.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Vendor Selection */}
      {selectedRegion && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Select Vendor/Estate</Typography>
          <FormControl fullWidth>
            <InputLabel>Vendor/Estate</InputLabel>
            <Select
              value={selectedVendor}
              label="Vendor/Estate"
              onChange={e => {
                setSelectedVendor(e.target.value);
                setSelectedBean("");
              }}
            >
              {regions.find(r => r.name === selectedRegion).vendors.map(v => (
                <MenuItem key={v} value={v}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Bean Selection */}
      {selectedVendor && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Select Exact Beans</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {beans[selectedVendor].map(b => (
              <Card
                key={b.name}
                sx={{
                  width: 200,
                  border: selectedBean === b.name ? "2px solid #6f4e37" : "1px solid #ccc",
                  cursor: "pointer",
                  boxShadow: selectedBean === b.name ? 6 : 1,
                  transition: "box-shadow 0.2s"
                }}
                onClick={() => setSelectedBean(b.name)}
              >
                <CardMedia component="img" height="120" image={b.img} alt={b.name} />
                <CardContent>
                  <Typography variant="subtitle1" align="center">{b.name}</Typography>
                  <Typography variant="body2" align="center" color="text.secondary">${b.price}/kg</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Quantity and Add to Cart */}
      {selectedBean && (
        <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            label="Quantity (kg)"
            type="number"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1 }}
            sx={{ width: 150 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{ bgcolor: "#6f4e37", "&:hover": { bgcolor: "#5a3c23" } }}
          >
            Add to Cart
          </Button>
        </Box>
      )}

      {/* Cart */}
      {cart.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>Your Cart</Typography>
          {cart.map((item, idx) => (
            <Card key={idx} sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <CardMedia component="img" image={item.img} alt={item.name} sx={{ width: 80, height: 80 }} />
              <CardContent sx={{ flex: 1 }}>
                <Typography>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity} kg × ${item.price} = ${item.quantity * item.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="success"
            onClick={handleCheckout}
            sx={{ mt: 2 }}
          >
            Checkout
          </Button>
        </Box>
      )}

      {/* Order Tracking */}
      {orderPlaced && (
        <Box sx={{ mt: 6 }}>
          <Alert severity="success">
            <Typography variant="h6">Order placed!</Typography>
            <Typography>Your order is being processed. <b>Tracking #: 123456</b></Typography>
          </Alert>
        </Box>
      )}

      {/* Snackbar for Add to Cart */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;