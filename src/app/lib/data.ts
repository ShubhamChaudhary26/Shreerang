// lib/data.ts

export const DUMMY_PRODUCTS = Array.from({ length: 40 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  price: (29.99 + i * 5.0).toFixed(2),
  image: '/path/to/placeholder.jpg', // Replace with actual image paths later
  oldPrice: (29.99 + i * 5.0 + 5.0).toFixed(2), // Example old price
  inStock: 200 + i,
  sku: `SKU-${i + 1}`,
  category: `Category ${i % 3 + 1}`,
  tags: ['Business', 'Seo', 'Marketing'].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1), // Random tags
  description: `Do you want to become a UI/UX designer but you don't know where to start? This course will allow you to develop your user interface design skills and you can add UI designer to your CV and start getting clients for your skills.
                Hi everyone, I'm Arash and I'm a UI/UX designer. In this course, I will help you learn and master Figma app comprehensively from scratch. Figma is an innovative and brilliant tool for User Interface design. It's used by everyone from entrepreneurs and startups to Apple, Airbnb, Facebook, etc.`,
  materialAndCare: [
    'Main: 100% Cotton',
    'One size fits all',
    'Soft twill',
    'Imported',
    'Ribbed, diagonal pattern',
    'Product color: Dark greenish',
  ],
  reviewsCount: Math.floor(Math.random() * 5),
}));

export type Product = typeof DUMMY_PRODUCTS[0]; // Exporting the type for better type safety