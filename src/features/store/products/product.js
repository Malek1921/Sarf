const products = [
  // --- APPLE GROUP ---
  {
    id: 1,
    name: "MacBook Air M3",
    company: "Apple",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    company: "Apple",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "AirPods Max",
    company: "Apple",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=800&auto=format&fit=crop",
  },

  // --- LOGITECH ---
  {
    id: 5,
    name: "Mechanical Keyboard",
    company: "Logitech",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
  },

  // --- FELLOW ---
  {
    id: 6,
    name: "Electric Kettle",
    company: "Fellow",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop",
  },

  // --- NIKE ---
  {
    id: 8,
    name: "Air Max Sneakers",
    company: "Nike",
    category: "clothing",
    unit: "pair",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Dri-FIT Training Tee",
    company: "Nike",
    category: "clothing",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Sport Duffel Bag",
    company: "Nike",
    category: "clothing",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
  },

  // --- IKEA ---
  {
    id: 11,
    name: "Adjustable Standing Desk",
    company: "IKEA",
    category: "furniture",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Work Lamp",
    company: "IKEA",
    category: "furniture",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 13,
    name: "Potted Faux Plant",
    company: "IKEA",
    category: "furniture",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop",
  },

  // --- LULULEMON ---
  {
    id: 15,
    name: "Everywhere Belt Bag",
    company: "Lululemon",
    category: "clothing",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop",
  },

  // --- SONY ---
  {
    id: 16,
    name: "Noise Cancelling Headphones",
    company: "Sony",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 17,
    name: "Alpha a7 Camera",
    company: "Sony",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
  },

  // --- HOME ---
  {
    id: 21,
    name: "Porcelain Bowl",
    company: "Hasami Porcelain",
    category: "grocery",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
  },

  // --- PATAGONIA ---
  {
    id: 23,
    name: "Winter Beanie",
    company: "Patagonia",
    category: "clothing",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
  },

  // --- RAZER ---
  {
    id: 26,
    name: "Gaming Mouse",
    company: "Razer",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 27,
    name: "Gaming Headset",
    company: "Razer",
    category: "electronics",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop",
  },

  // --- MOLESKINE ---
  {
    id: 28,
    name: "Hardcover Notebook",
    company: "Moleskine",
    category: "grocery",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 29,
    name: "Classic Rollerball Pen",
    company: "Moleskine",
    category: "grocery",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
  },

  // --- RAY-BAN ---
  {
    id: 30,
    name: "Wayfarer Sunglasses",
    company: "Ray-Ban",
    category: "clothing",
    unit: "pc",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
  },
];

export default products;
