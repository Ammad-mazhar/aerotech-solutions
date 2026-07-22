import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogsData';
import { canonicalUrl, routePath, breadcrumbSchema } from '../utils/seo';
import Breadcrumb from './Breadcrumb';

const breadcrumbTrail = [
  { label: 'Home', path: '/' },
  { label: 'Blogs', path: '/blogs' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [breadcrumbSchema(breadcrumbTrail)]
};

const BlogsPage = () => {
  return (
    <>
      <Helmet>
        <title>Aerotech Solution | Blog - Appliance Repair Tips & Guides</title>
        <meta name="description" content="Expert appliance repair tips and guides from Aerotech Solution covering refrigerators, ovens, washers, dryers, HVAC, and more. Learn what to check before you call a technician." />
        <meta name="keywords" content="appliance repair blog, appliance repair tips, refrigerator troubleshooting, washer dryer repair guide, HVAC furnace tips" />
        <link rel="canonical" href={canonicalUrl('/blogs')} />
        <meta property="og:title" content="Aerotech Solution Blog | Appliance Repair Tips & Guides" />
        <meta property="og:description" content="Expert tips and guides for every major home appliance, written by certified Aerotech Solution technicians." />
        <meta property="og:url" content={canonicalUrl('/blogs')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aerotechsolutioninc.com/banner-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aerotech Solution Blog | Appliance Repair Tips" />
        <meta name="twitter:description" content="Guides on refrigerators, ovens, washers, dryers, HVAC, and more from certified appliance repair technicians." />
        <meta name="twitter:image" content="https://aerotechsolutioninc.com/banner-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <section className="blogs-page">
        <style>{`
          .blogs-page {
            padding: 5rem 0;
            background-color: #052e16;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 60vh;
          }
          .blogs-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }
          .blogs-header {
            text-align: center;
            margin-bottom: 4rem;
          }
          .blogs-header h1 {
            font-size: 3rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.5rem;
            letter-spacing: -0.025em;
          }
          .blogs-header p {
            font-size: 1.25rem;
            color: #a7f3d0;
            max-width: 700px;
            margin: 0 auto;
          }
          .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
          }
          .blog-card {
            background-color: #ffffff;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .blog-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.25);
          }
          .blog-card-image {
            position: relative;
          }
          .blog-card-image img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
          }
          .blog-card-badge {
            position: absolute;
            top: 14px;
            left: 14px;
            background-color: #f97316;
            color: #7f1d1d;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.35rem 0.85rem;
            border-radius: 999px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          }
          .blog-card-type-badge {
            position: absolute;
            top: 14px;
            right: 14px;
            background-color: #052e16;
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.35rem 0.85rem;
            border-radius: 999px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
          .blog-card-body {
            padding: 1.75rem;
            display: flex;
            flex-direction: column;
            flex: 1;
          }
          .blog-meta {
            display: flex;
            gap: 1rem;
            align-items: center;
            font-size: 0.85rem;
            color: #f97316;
            font-weight: 600;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .blog-meta span:not(:last-child)::after {
            content: '•';
            margin-left: 1rem;
            color: #cbd5e1;
          }
          .blog-card-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 0.75rem;
            letter-spacing: -0.02em;
            line-height: 1.35;
          }
          .blog-card-excerpt {
            font-size: 0.975rem;
            color: #475569;
            line-height: 1.65;
            margin-bottom: 1.25rem;
            flex: 1;
          }
          .blog-card-readmore {
            font-weight: 700;
            color: #f97316;
            font-size: 0.95rem;
          }
          .blogs-cta {
            text-align: center;
            margin-top: 4rem;
          }
          .blogs-cta h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1rem;
          }
          .blogs-cta p {
            color: #a7f3d0;
            margin-bottom: 2rem;
          }
          .blogs-cta-button {
            display: inline-block;
            background-color: #f97316;
            color: #7f1d1d;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-weight: 700;
            text-decoration: none;
            transition: background-color 0.2s;
          }
          .blogs-cta-button:hover {
            background-color: #ea580c;
          }
        `}</style>
        <div className="blogs-container">
          <Breadcrumb items={breadcrumbTrail} />

          <div className="blogs-header">
            <h1>Appliance Repair Tips & Guides</h1>
            <p>Straightforward advice from our certified technicians on every appliance we service — what's normal, what's a warning sign, and when to call a professional.</p>
          </div>

          <div className="blog-grid">
            {blogsData.map((post) => (
              <Link className="blog-card" key={post.id} to={routePath(`/blogs/${post.id}`)}>
                <div className="blog-card-image">
                  <img src={post.image} alt={post.alt} loading="lazy" />
                  <span className="blog-card-badge">{post.category}</span>
                  <span className="blog-card-type-badge">Blog</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.paragraphs[0].slice(0, 140)}...</p>
                  <span className="blog-card-readmore">Read Full Article →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="blogs-cta">
            <h3>Ready to get your appliance fixed?</h3>
            <p>Book a certified technician today and get back to normal fast.</p>
            <Link to={routePath('/book-service')} className="blogs-cta-button">
              Book Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogsPage;
