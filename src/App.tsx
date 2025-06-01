/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from "react";
import { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Card,
  CardHeader,
  CardPreview,
  Button,
  Text,
  Title1,
  Title3,
  Subtitle1,
  Input,
  Select,
  Field,
  Toaster,
  useToastController
} from "@fluentui/react-components";
import { ShoppingCart24Regular } from '@fluentui/react-icons';

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
  const [selectedBeanType, setSelectedBeanType] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [selectedBean, setSelectedBean] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<any[]>([]);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const toaster = useToastController();

  const handleAddToCart = () => {
    if (!selectedBean || !selectedVendor) return;
    // @ts-ignore
    const beanObj = beans[selectedVendor].find((b: any) => b.name === selectedBean);
    setCart([...cart, { ...beanObj, quantity }]);
    toaster.dispatchToast({
      intent: 'success',
      content: 'Added to cart!'
    });
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <FluentProvider theme={webLightTheme} style={{ minHeight: '100vh', padding: 32 }}>
      <Title1 align="center">Coffee Bean Marketplace</Title1>
      <Text align="center" style={{ color: '#666', marginBottom: 24 }}>
        Discover, select, and order the world’s finest coffee beans.
      </Text>

      {/* Bean Type Selection */}
      <div style={{ marginTop: 24 }}>
        <Title3>Select Bean Type</Title3>
        <div style={{ display: 'flex', gap: 16 }}>
          {beanTypes.map((bt: any) => (
            <Card
              key={bt.name}
              style={{
                width: 180,
                border: selectedBeanType === bt.name ? "2px solid #6f4e37" : "1px solid #ccc",
                cursor: "pointer",
                boxShadow: selectedBeanType === bt.name ? "0 4px 16px #6f4e3722" : "0 1px 4px #ccc3",
                transition: "box-shadow 0.2s"
              }}
              onClick={() => setSelectedBeanType(bt.name)}
            >
              <CardPreview>
                <img src={bt.img} height={120} alt={bt.name} style={{ width: '100%', objectFit: 'cover', borderRadius: 8 }} />
              </CardPreview>
              <CardHeader>
                <Subtitle1>{bt.name}</Subtitle1>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Region Selection */}
      {selectedBeanType && (
        <div style={{ marginTop: 24 }}>
          <Title3>Select Coffee Growing Region</Title3>
          <Field label="Region">
            <Select
              value={selectedRegion}
              onChange={(_e: any, data: any) => {
                setSelectedRegion(data.value || "");
                setSelectedVendor("");
                setSelectedBean("");
              }}
              placeholder="Pick a region"
              options={regions.map((r: any) => ({ value: r.name, content: r.name }))}
            />
          </Field>
        </div>
      )}

      {/* Vendor Selection */}
      {selectedRegion && (
        <div style={{ marginTop: 24 }}>
          <Title3>Select Vendor/Estate</Title3>
          <Field label="Vendor/Estate">
            <Select
              value={selectedVendor}
              onChange={(_e: any, data: any) => {
                setSelectedVendor(data.value || "");
                setSelectedBean("");
              }}
              placeholder="Pick a vendor/estate"
              options={regions.find((r: any) => r.name === selectedRegion)?.vendors.map((v: any) => ({ value: v, content: v })) || []}
            />
          </Field>
        </div>
      )}

      {/* Bean Selection */}
      {selectedVendor && (
        <div style={{ marginTop: 24 }}>
          <Title3>Select Exact Beans</Title3>
          <div style={{ display: 'flex', gap: 16 }}>
            {/* @ts-ignore */}
            {beans[selectedVendor].map((b: any) => (
              <Card
                key={b.name}
                style={{
                  width: 200,
                  border: selectedBean === b.name ? "2px solid #6f4e37" : "1px solid #ccc",
                  cursor: "pointer",
                  boxShadow: selectedBean === b.name ? "0 4px 16px #6f4e3722" : "0 1px 4px #ccc3",
                  transition: "box-shadow 0.2s"
                }}
                onClick={() => setSelectedBean(b.name)}
              >
                <CardPreview>
                  <img src={b.img} height={120} alt={b.name} style={{ width: '100%', objectFit: 'cover', borderRadius: 8 }} />
                </CardPreview>
                <CardHeader>
                  <Subtitle1>{b.name}</Subtitle1>
                  <Text style={{ color: '#888' }}>${b.price}/kg</Text>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      {selectedBean && (
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Field label="Quantity (kg)">
            <Input
              type="number"
              value={quantity}
              min={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: 120 }}
            />
          </Field>
          <Button
            appearance="primary"
            icon={<ShoppingCart24Regular />}
            onClick={handleAddToCart}
            style={{ backgroundColor: "#6f4e37", color: "#fff" }}
          >
            Add to Cart
          </Button>
        </div>
      )}

      {/* Cart */}
      {cart.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <Title3>Your Cart</Title3>
          {cart.map((item: any, idx: number) => (
            <Card key={idx} style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
              <CardPreview>
                <img src={item.img} alt={item.name} width={80} height={80} style={{ borderRadius: 8 }} />
              </CardPreview>
              <CardHeader>
                <Subtitle1>{item.name}</Subtitle1>
                <Text style={{ color: '#888' }}>{item.quantity} kg × ${item.price} = ${item.quantity * item.price}</Text>
              </CardHeader>
            </Card>
          ))}
          <Button
            appearance="primary"
            style={{ marginTop: 16, backgroundColor: "#228B22", color: "#fff" }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      )}

      {/* Order Tracking */}
      {orderPlaced && (
        <div style={{ marginTop: 48 }}>
          <Toaster position="top" />
          <Card style={{ background: '#e6ffe6', border: '1px solid #228B22', padding: 16 }}>
            <Title3>Order placed!</Title3>
            <Text>Your order is being processed. <b>Tracking #: 123456</b></Text>
          </Card>
        </div>
      )}
      <Toaster position="bottom" />
    </FluentProvider>
  );
}

export default App;