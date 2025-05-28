
import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Box,
  Button,
  Card,
  Image,
  Group,
  NumberInput,
  Notification,
  Select as MantineSelect,
  rem
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

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
    <Container size="md" px="md" py="xl">
      <Title order={1} align="center" mb="sm">Coffee Bean Marketplace</Title>
      <Text align="center" color="dimmed" mb="md">
        Discover, select, and order the world’s finest coffee beans.
      </Text>

      {/* Bean Type Selection */}
      <Box mt="md">
        <Title order={3} mb="xs">Select Bean Type</Title>
        <Group spacing="md">
          {beanTypes.map(bt => (
            <Card
              key={bt.name}
              shadow={selectedBeanType === bt.name ? "xl" : "sm"}
              padding="sm"
              radius="md"
              withBorder
              style={{
                width: 180,
                border: selectedBeanType === bt.name ? "2px solid #6f4e37" : "1px solid #ccc",
                cursor: "pointer",
                transition: "box-shadow 0.2s"
              }}
              onClick={() => setSelectedBeanType(bt.name)}
            >
              <Image src={bt.img} height={120} alt={bt.name} radius="md" />
              <Text align="center" mt="xs" weight={500}>{bt.name}</Text>
            </Card>
          ))}
        </Group>
      </Box>

      {/* Region Selection */}
      {selectedBeanType && (
        <Box mt="md">
          <Title order={3} mb="xs">Select Coffee Growing Region</Title>
          <MantineSelect
            data={regions.map(r => ({ value: r.name, label: r.name }))}
            value={selectedRegion}
            onChange={value => {
              setSelectedRegion(value || "");
              setSelectedVendor("");
              setSelectedBean("");
            }}
            placeholder="Pick a region"
          />
        </Box>
      )}

      {/* Vendor Selection */}
      {selectedRegion && (
        <Box mt="md">
          <Title order={3} mb="xs">Select Vendor/Estate</Title>
          <MantineSelect
            data={regions.find(r => r.name === selectedRegion)?.vendors.map(v => ({ value: v, label: v })) || []}
            value={selectedVendor}
            onChange={value => {
              setSelectedVendor(value || "");
              setSelectedBean("");
            }}
            placeholder="Pick a vendor/estate"
          />
        </Box>
      )}

      {/* Bean Selection */}
      {selectedVendor && (
        <Box mt="md">
          <Title order={3} mb="xs">Select Exact Beans</Title>
          <Group spacing="md">
            {beans[selectedVendor].map(b => (
              <Card
                key={b.name}
                shadow={selectedBean === b.name ? "xl" : "sm"}
                padding="sm"
                radius="md"
                withBorder
                style={{
                  width: 200,
                  border: selectedBean === b.name ? "2px solid #6f4e37" : "1px solid #ccc",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s"
                }}
                onClick={() => setSelectedBean(b.name)}
              >
                <Image src={b.img} height={120} alt={b.name} radius="md" />
                <Text align="center" mt="xs" weight={500}>{b.name}</Text>
                <Text align="center" size="sm" color="dimmed">${b.price}/kg</Text>
              </Card>
            ))}
          </Group>
        </Box>
      )}

      {/* Quantity and Add to Cart */}
      {selectedBean && (
        <Group mt="md" align="center">
          <NumberInput
            label="Quantity (kg)"
            value={quantity}
            onChange={val => setQuantity(Number(val) || 1)}
            min={1}
            style={{ width: 150 }}
          />
          <Button
            leftSection={<IconShoppingCart size={18} />}
            color="brown"
            onClick={handleAddToCart}
            style={{ backgroundColor: "#6f4e37" }}
          >
            Add to Cart
          </Button>
        </Group>
      )}

      {/* Cart */}
      {cart.length > 0 && (
        <Box mt="xl">
          <Title order={3} mb="xs">Your Cart</Title>
          {cart.map((item, idx) => (
            <Card key={idx} mb="sm" style={{ display: "flex", alignItems: "center" }}>
              <Image src={item.img} alt={item.name} width={80} height={80} radius="md" />
              <Box ml="md" style={{ flex: 1 }}>
                <Text>{item.name}</Text>
                <Text size="sm" color="dimmed">
                  {item.quantity} kg × ${item.price} = ${item.quantity * item.price}
                </Text>
              </Box>
            </Card>
          ))}
          <Button
            color="green"
            mt="md"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      )}

      {/* Order Tracking */}
      {orderPlaced && (
        <Box mt="xl">
          <Notification color="green" title="Order placed!" onClose={() => setOrderPlaced(false)}>
            Your order is being processed. <b>Tracking #: 123456</b>
          </Notification>
        </Box>
      )}

      {/* Snackbar for Add to Cart */}
      <Notification
        color="teal"
        title="Added to cart!"
        onClose={() => setSnackbarOpen(false)}
        style={{ position: "fixed", bottom: rem(24), left: "50%", transform: "translateX(-50%)", display: snackbarOpen ? "block" : "none", zIndex: 9999 }}
      >
        Added to cart!
      </Notification>
    </Container>
  );
}

export default App;