import { Metadata } from 'next';
import BlogPreviewContent from './BlogPreviewContent';

// Interface for Blog (aligned with schema/blog.ts)
interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  publishedDate: string;
  status: 'Published' | 'Draft';
  category?: string;
  featuredImage?: string;
}

// Dynamic metadata for specific blog post
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${params.id}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    const { blog }: { blog: Blog } = await response.json();

    return {
      title: `${blog.title} - Mintsurvey`,
      description: blog.content.slice(0, 150) + (blog.content.length > 150 ? '...' : ''),
      openGraph: {
        title: `${blog.title} - Mintsurvey`,
        description: blog.content.slice(0, 150) + (blog.content.length > 150 ? '...' : ''),
        images: [
          {
            url: blog.featuredImage || 'https://yourdomain.com/images/default-blog-og-image.png',
            width: 1200,
            height: 630,
            alt: `${blog.title} Preview`,
          },
        ],
        url: `https://yourdomain.com/inspiration/preview/${params.id}`,
        type: 'article',
        siteName: 'Mintsurvey',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${blog.title} - Mintsurvey`,
        description: blog.content.slice(0, 150) + (blog.content.length > 150 ? '...' : ''),
        images: [blog.featuredImage || 'https://yourdomain.com/images/default-blog-og-image.png'],
      },
    };
  } catch (error) {
    return {
      title: 'Blog Not Found - Mintsurvey',
      description: 'Unable to load this blog post.',
    };
  }
}

export default async function BlogPreviewPage({ params }: { params: { id: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${params.id}`);
  const data = response.ok ? await response.json() : null;
  const blog: Blog | null = data ? data.blog : null;

  return <BlogPreviewContent blog={blog}/>;
}