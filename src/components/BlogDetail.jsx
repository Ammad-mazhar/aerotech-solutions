import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { blogsData } from '../data/blogsData';
import { blogSeoContent } from '../data/blogSeoContent';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogsData.find((p) => p.id === id);
  const extra = blogSeoContent[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '80vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#052e16' }}>
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#991b1b', padding: '24px', borderRadius: '16px', maxWidth: '500px', margin: '0 auto' }}>
          <AlertCircle size={48} style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>Article Not Found</h2>
          <p style={{ marginBottom: '24px' }}>We couldn't find the blog post: <strong>{id}</strong></p>
          <button
            onClick={() => navigate('/blogs')}
            style={{ padding: '12px 24px', background: '#3b82f6', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700' }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // JSON-LD: Article + FAQPage + BreadcrumbList (only added when deep SEO content exists for this post)
  const structuredData = extra ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": post.title,
        "description": extra.metaDescription,
        "image": `https://aerotechsolutioninc.com${post.image}`,
        "datePublished": post.date,
        "author": { "@type": "Organization", "name": "Aerotech Solution Inc" },
        "publisher": {
          "@type": "Organization",
          "name": "Aerotech Solution Inc",
          "logo": { "@type": "ImageObject", "url": "https://aerotechsolutioninc.com/logo/logo 2.png" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://aerotechsolutioninc.com/blogs/${post.id}` }
      },
      {
        "@type": "FAQPage",
        "mainEntity": extra.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aerotechsolutioninc.com/" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://aerotechsolutioninc.com/blogs" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://aerotechsolutioninc.com/blogs/${post.id}` }
        ]
      }
    ]
  } : null;

  return (
    <>
      <Helmet>
        <title>{extra ? extra.metaTitle : `${post.title} | Aerotech Solution Blog`}</title>
        <meta name="description" content={extra ? extra.metaDescription : post.paragraphs[0].slice(0, 160)} />
        <link rel="canonical" href={`https://aerotechsolutioninc.com/blogs/${post.id}`} />
        <meta property="og:title" content={extra ? extra.metaTitle : post.title} />
        <meta property="og:description" content={extra ? extra.metaDescription : post.paragraphs[0].slice(0, 160)} />
        <meta property="og:url" content={`https://aerotechsolutioninc.com/blogs/${post.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://aerotechsolutioninc.com${post.image}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={extra ? extra.metaTitle : post.title} />
        <meta name="twitter:description" content={extra ? extra.metaDescription : post.paragraphs[0].slice(0, 160)} />
        <meta name="twitter:image" content={`https://aerotechsolutioninc.com${post.image}`} />
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>
      <section className="blog-detail-page">
        <style>{`
          .blog-detail-page {
            padding: 5rem 0 6rem;
            background-color: #052e16;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 60vh;
          }
          .blog-detail-container {
            max-width: 820px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }
          .blog-back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #a7f3d0;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 2rem;
            transition: color 0.2s;
          }
          .blog-back-link:hover {
            color: #f97316;
          }
          .blog-detail-meta {
            display: flex;
            gap: 1rem;
            align-items: center;
            font-size: 0.9rem;
            color: #f97316;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .blog-detail-meta span:not(:last-child)::after {
            content: '•';
            margin-left: 1rem;
            color: rgba(255,255,255,0.3);
          }
          .blog-detail-title {
            font-size: clamp(2rem, 4vw, 2.75rem);
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.02em;
            line-height: 1.2;
            margin-bottom: 2rem;
          }
          .blog-detail-image-wrap {
            position: relative;
            margin-bottom: 2.5rem;
          }
          .blog-detail-image {
            width: 100%;
            max-height: 480px;
            object-fit: cover;
            border-radius: 1rem;
            display: block;
            box-shadow: 0 20px 40px -12px rgba(0,0,0,0.4);
          }
          .blog-detail-badge {
            position: absolute;
            top: 18px;
            left: 18px;
            background-color: #f97316;
            color: #7f1d1d;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.4rem 1rem;
            border-radius: 999px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          }
          .blog-detail-body {
            background-color: #ffffff;
            border-radius: 1rem;
            padding: 2.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .blog-detail-paragraph {
            font-size: 1.1rem;
            color: #334155;
            line-height: 1.8;
            margin-bottom: 1.3rem;
          }
          .blog-detail-paragraph:last-child {
            margin-bottom: 0;
          }
          .blog-detail-cta {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 3rem;
          }
          .blog-detail-cta a {
            display: inline-block;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-weight: 700;
            text-decoration: none;
            transition: background-color 0.2s;
          }
          .cta-primary {
            background-color: #f97316;
            color: #7f1d1d;
          }
          .cta-primary:hover {
            background-color: #ea580c;
          }
          .cta-secondary {
            background-color: #052e16;
            color: #ffffff;
            border: 1px solid rgba(34, 197, 94, 0.4);
          }
          .cta-secondary:hover {
            background-color: #064e3b;
          }
          .blog-seo-section {
            margin-top: 3rem;
          }
          .blog-seo-heading {
            font-size: clamp(1.5rem, 3vw, 1.9rem);
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.02em;
            margin-bottom: 1rem;
          }
          .blog-seo-intro {
            color: #a7f3d0;
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 1.25rem;
          }
          .blog-seo-para {
            color: #d1d5db;
            font-size: 1.05rem;
            line-height: 1.8;
            margin-bottom: 1.1rem;
          }
          .blog-seo-card {
            background-color: #ffffff;
            border-radius: 0.875rem;
            padding: 1.5rem 1.75rem;
            margin-bottom: 1rem;
            border: 1px solid #e2e8f0;
          }
          .blog-seo-card-title {
            font-size: 1.05rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 0.4rem;
          }
          .blog-seo-card-text {
            font-size: 0.975rem;
            color: #475569;
            line-height: 1.65;
            margin: 0;
          }
        `}</style>
        <div className="blog-detail-container">
          <Link to="/blogs" className="blog-back-link">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="blog-detail-meta">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="blog-detail-title">{post.title}</h1>

          <div className="blog-detail-image-wrap">
            <img className="blog-detail-image" src={post.image} alt={post.alt} />
            <span className="blog-detail-badge">{post.category}</span>
          </div>

          <div className="blog-detail-body">
            {post.paragraphs.map((para, idx) => (
              <p className="blog-detail-paragraph" key={idx}>{para}</p>
            ))}
          </div>

          {extra && extra.sections.map((section, i) => (
            <div className="blog-seo-section" key={i}>
              <h2 className="blog-seo-heading">{section.heading}</h2>
              {section.intro && <p className="blog-seo-intro">{section.intro}</p>}
              {section.paragraphs && section.paragraphs.map((para, j) => (
                <p className="blog-seo-para" key={j}>{para}</p>
              ))}
              {section.items && section.items.map((item, j) => (
                <div className="blog-seo-card" key={j}>
                  <h3 className="blog-seo-card-title">{item.title}</h3>
                  <p className="blog-seo-card-text">{item.text}</p>
                </div>
              ))}
            </div>
          ))}

          {extra && (
            <div className="blog-seo-section">
              <h2 className="blog-seo-heading">Frequently Asked Questions</h2>
              {extra.faqs.map((faq, i) => (
                <div className="blog-seo-card" key={i}>
                  <h3 className="blog-seo-card-title">{faq.q}</h3>
                  <p className="blog-seo-card-text">{faq.a}</p>
                </div>
              ))}
            </div>
          )}

          <div className="blog-detail-cta">
            <Link to={`/services/${post.id}`} className="cta-primary">
              View Service Details
            </Link>
            <Link to="/book-service" className="cta-secondary">
              Book Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
