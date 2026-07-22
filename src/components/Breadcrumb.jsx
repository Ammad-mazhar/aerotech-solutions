import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { routePath } from '../utils/seo';

// Reusable, compact breadcrumb trail. `items` is an ordered array of
// { label, path } from Home to the current page. Every item except the last
// renders as a real, crawlable <Link>; the last item is always plain text
// with aria-current="page" (its `path`, if present, is ignored for display —
// callers still include it so the same array can build BreadcrumbList JSON-LD
// via seo.js's breadcrumbSchema(), keeping the visible trail and the
// structured data derived from one source instead of two).
const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <>
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li className="breadcrumb-item" key={item.label}>
                {isLast ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link to={routePath(item.path)}>{item.label}</Link>
                )}
                {!isLast && <ChevronRight size={13} className="breadcrumb-separator" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <style>{`
        .breadcrumb-nav {
          margin-bottom: 1.5rem;
        }
        .breadcrumb-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem;
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 0.85rem;
          line-height: 1.4;
        }
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .breadcrumb-item a {
          color: #a7f3d0;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .breadcrumb-item a:hover {
          color: #f97316;
        }
        .breadcrumb-item span[aria-current="page"] {
          color: #ffffff;
          font-weight: 600;
        }
        .breadcrumb-separator {
          color: rgba(255, 255, 255, 0.35);
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
};

export default Breadcrumb;
