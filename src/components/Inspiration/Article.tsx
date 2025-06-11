'use client';

import Image from 'next/image';
import { Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';

interface Article {
  title: string;
  date: string;
  image: string;
  category: string;
}

const articles: Article[] = [
  {
    title: 'How to navigate the tariff turmoil label is entering a golden',
    date: '10 APR 2025',
    image: '/inspiration/article1.png',
    category: 'Article',
  },
  {
    title: 'Top insights into why private label is entering a golden era',
    date: '10 APR 2025',
    image: '/inspiration/article2.png',
    category: 'Article',
  },
];

export default function ArticleCards() {
  return (
    <ScrollFadeIn delay={0.2}>

    <div className="flex flex-col md:flex-row gap-8 py-1 mt-10">
      {articles.map((article, index) => (
        <motion.div
        key={index}
          className="w-full md:w-1/2 transition-all duration-300 transform hover:scale-[1.05] hover:shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 * index }}
          >
          <Card
            className="shadow-none border-none p-0"
            cover={
              <Image
                src={article.image}
                alt={article.title}
                width={600}
                height={300}
                className="object-cover h-64 w-full"
              />
            }
          >
            <p className="h5 flex items-center gap-2">{article.category}</p>
            <h3 className="h3">{article.title}</h3>
            <p className="h5 dark">
              <CalendarOutlined /> {article.date}
            </p>
          </Card>
        </motion.div>
      ))}
    </div>
      </ScrollFadeIn>
  );
}
