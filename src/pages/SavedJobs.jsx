import React from 'react';
import { Link } from 'react-router-dom';
import { BookmarkX, MapPin, Building2, ChevronLeft } from 'lucide-react';
import { useBookmark } from '../context/BookmarkContext';

function SavedJobs() {
  const { bookmarks, removeBookmark } = useBookmark();

  return (
    <main style={{ 
      padding: '6rem 1rem 6rem', 
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '800', 
          color: 'var(--text-main)',
          margin: 0
        }}>
          وظائفي المحفوظة 📑
        </h2>
        <span style={{ 
          background: 'var(--accent)', 
          color: 'var(--primary)', 
          padding: '0.4rem 1rem', 
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '0.9rem'
        }}>
          {bookmarks.length} وظيفة محفوظة
        </span>
      </div>

      {bookmarks.length > 0 ? (
        <div className="jobs-grid">
          {bookmarks.map((job) => {
            const isPlaceholder = !job.applyUrl || job.applyUrl === '#';

            const CardContent = (
              <>
                <div className="job-header">
                  <div style={{ display: 'flex', gap: '1.2rem', flex: 1, minWidth: 0 }}>
                    <div className="company-logo">
                      {job.logo || (job.company ? job.company.substring(0, 2) : '؟')}
                    </div>
                    <div className="job-title-info">
                      <h3>{job.title}</h3>
                      <p className="company-name">{job.company}</p>
                    </div>
                  </div>
                  <button
                    className="bookmark-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeBookmark(job.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      color: '#f59e0b',
                      fontSize: '1.5rem',
                      transition: 'var(--transition)',
                      flexShrink: 0,
                    }}
                    title="إزالة من المحفوظات"
                  >
                    ⭐
                  </button>
                </div>
                <div className="job-meta">
                  <span><MapPin size={16} /> {job.city}، {job.location}</span>
                  <span><Building2 size={16} /> {job.category}</span>
                  <span>{job.date}</span>
                </div>
                <div className="job-footer">
                  <span className="category-tag">بدوام كامل</span>
                  <div className="details-btn" style={{ display: 'flex', alignItems: 'center' }}>
                    التفاصيل والتقديم <ChevronLeft size={16} style={{ marginRight: '5px' }} />
                  </div>
                </div>
              </>
            );

            return isPlaceholder ? (
              <div key={job.id} className="job-card animate-fade no-link" style={{ display: 'block' }}>
                {CardContent}
              </div>
            ) : (
              <Link
                to={`/job/${job.id}`}
                key={job.id}
                className="job-card animate-fade"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
              >
                {CardContent}
              </Link>
            );
          })}
        </div>
      ) : (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          textAlign: 'center',
          gap: '1rem'
        }}>
          <BookmarkX size={60} strokeWidth={1} style={{ opacity: 0.4, color: 'var(--text-muted)' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
            لا توجد وظائف محفوظة
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: 0 }}>
            ابدأ بحفظ الوظائف التي تهمك بالنقر على نجمة ⭐️ بجانب كل وظيفة.
          </p>
          <Link
            to="/"
            style={{
              marginTop: '1rem',
              display: 'inline-block',
              padding: '0.8rem 2rem',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'var(--transition)',
            }}
          >
            عودة للبحث عن الوظائف
          </Link>
        </div>
      )}
    </main>
  );
}

export default SavedJobs;
