const products = [
  {
    id: "spc-01",
    title: "UV Sheets for Bed and Media Walls ",
    category: "PVC UV Sheets",
    images: [
      "/public/images/uv1.jpeg",
      "/public/images/uv2.jpeg",
      "/public/images/uv3.jpeg",
    ],
  },
  {
    id: "spc-02",
    title: "Natural Oak SPC Flooring",
    category: "SPC Flooring",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "wpc-imported-01",
    title: "Fluted WPC Wall Panel",
    category: "WPC & Imported Panels",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },
  {
    id: "wpc-imported-02",
    title: "Decorative WPC Wall Panel",
    category: "WPC & Imported Panels",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "ceiling-01",
    title: "2×2 Ceiling Panel",
    category: "Ceiling 2×2",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "wpc-solid-01",
    title: "Classic Solid WPC Panel",
    category: "WPC Solid Panels",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "wallpaper-01",
    title: "Textured Interior Wallpaper",
    category: "Wallpapers",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "skirting-01",
    title: "Classic PVC Skirting",
    category: "PVC Skirtings",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "wood-flooring-01",
    title: "Natural Wood Flooring",
    category: "Wood Flooring",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "vinyl-01",
    title: "Modern Vinyl Flooring",
    category: "Vinyl Flooring",
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "blinds-01",
    title: "Roller Blinds",
    category: "Blinds",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "uv-sheet-01",
    title: "Marble Finish UV Sheet",
    category: "PVC UV Sheets",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1618220924273-338d82d8b9c9?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "moulding-01",
    title: "Decorative PVC Moulding",
    category: "PVC Mouldings",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },

  {
    id: "sticker-01",
    title: "Decorative PVC Sticker",
    category: "PVC Stickers",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=75&fm=webp",
      "https://images.unsplash.com/photo-1618220924273-338d82d8b9c9?auto=format&fit=crop&w=700&q=75&fm=webp",
    ],
  },
];

export default products;
