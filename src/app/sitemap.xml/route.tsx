import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/schema/blog';
import Project from '@/schema/project';

export async function GET(request: Request) {
  try {
    // Redirect non-bot users in production
    const userAgent = request.headers.get('user-agent') || '';
    const isLocal = process.env.NODE_ENV === 'development';
    if (!isLocal && !/bot|crawl|spider|googlebot|bingbot|yahoo|baiduspider/i.test(userAgent)) {
      const baseUrl = 'https://www.teriwebsite.com';
      return NextResponse.redirect(baseUrl);
    }

    // Connect to database
    await connectDB();

    // Fetch blogs and projects
    const blogs = await Blog.find({ status: 'Published' })
      .select('slug publishedDate _id')
      .exec();
    const projects = await Project.find({ status: 'Published' })
      .select('_id startDate')
      .exec();

    // Debug logs
    console.log('Blogs:', blogs.map(b => ({ slug: b.slug, id: b._id })));
    console.log('Projects:', projects.map(p => p._id));

    // Base URL
    const baseUrl = isLocal ? 'http://localhost:3000' : 'https://www.teriwebsite.com';

    // Static pages (all your pages added)
    const staticPages = [
      { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/inspiration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/brandgrowth`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/candidate`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
      { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
      { url: `${baseUrl}/checkout`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
      { url: `${baseUrl}/client`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/ecom`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/home`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${baseUrl}/joblisting`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
      { url: `${baseUrl}/lib`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 }, 
      { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
      { url: `${baseUrl}/miauto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/micompliance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/miconnect`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/micorrelate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/privacypolicy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${baseUrl}/requestquote`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
      { url: `${baseUrl}/scripts`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 }, 
      { url: `${baseUrl}/solution`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/talktous`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/termsandconditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    // Dynamic pages
    const dynamicPages = [
      ...blogs
        .filter(blog => blog.slug && !/^(tyjg|ddd|ssss|aaaaa|aaaa|how-smart-)$/i.test(blog.slug))
        .map(blog => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: blog.publishedDate ? new Date(blog.publishedDate) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })),
      ...projects.map(project => ({
        url: `${baseUrl}/project/${project._id}`,
        lastModified: project.startDate ? new Date(project.startDate) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })),
      ...blogs
        .filter(blog => blog._id)
        .map(blog => ({
          url: `${baseUrl}/inspiration/preview/${blog._id}`,
          lastModified: blog.publishedDate ? new Date(blog.publishedDate) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })),
    ];

    // Combine all pages
    const allPages = [...staticPages, ...dynamicPages];

    // Debug total pages
    console.log('Total Pages in Sitemap:', allPages.map(p => p.url));

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(page => `
      <url>
        <loc>${encodeURI(page.url)}</loc>
        <lastmod>${page.lastModified.toISOString()}</lastmod>
        <changefreq>${page.changeFrequency}</changefreq>
        <priority>${page.priority}</priority>
      </url>
    `)
    .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('Sitemap generation failed:', (error as Error).message);
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>Internal Server Error: Sitemap generation failed</message>
</error>`;
    return new NextResponse(errorXml, {
      status: 500,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}