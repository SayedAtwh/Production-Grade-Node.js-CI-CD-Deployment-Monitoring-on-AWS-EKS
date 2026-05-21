import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Briefcase, ChevronRight, Search, ChevronLeft } from 'lucide-react';

function Companies({ selectedCountry, jobsData }) {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 12;

  useEffect(() => {
    // 1. Filter jobs by country
    const countryJobs = jobsData.filter(job => job.location === selectedCountry);

    // 2. Aggregate jobs by company
    const companiesMap = {};
    countryJobs.forEach(job => {
      if (!companiesMap[job.company]) {
        companiesMap[job.company] = {
          name: job.company,
          logo: job.logo || job.company.substring(0, 2),
          jobCount: 0,
          categories: new Set(),
          cities: new Set()
        };
      }
      companiesMap[job.company].jobCount += 1;
      companiesMap[job.company].categories.add(job.category);
      companiesMap[job.company].cities.add(job.city);
    });

    // 3. Convert map to array and format properties
    let companiesArray = Object.values(companiesMap).map(comp => ({
      ...comp,
      categories: Array.from(comp.categories),
      cities: Array.from(comp.cities)
    }));

    // 4. Sort by job count (highest first)
    companiesArray.sort((a, b) => b.jobCount - a.jobCount);

    // 5. Filter by search term
    if (searchTerm) {
      companiesArray = companiesArray.filter(comp =>
        comp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setCompanies(companiesArray);
    setCurrentPage(1); // Reset to first page when data changes
  }, [selectedCountry, searchTerm]);

  // Pagination logic
  const indexOfLastComp = currentPage * companiesPerPage;
  const indexOfFirstComp = indexOfLastComp - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstComp, indexOfLastComp);
  const totalPages = Math.ceil(companies.length / companiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0', backgroundColor: '#f8fafc' }}>
      {/* Header Section */}
      <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 0', marginBottom: '3rem', textAlign: 'center' }}>
        <div className="container animate-fade">
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>
            استكشف كبرى الشركات في {selectedCountry}
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto 2rem' }}>
            اكتشف الشركات التي تبحث عن مواهب جديدة وقدم على آلاف الوظائف المتاحة.
          </p>

          {/* Search Box */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'white',
            padding: '0.5rem',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <Search color="var(--text-muted)" style={{ margin: '0 1rem' }} />
            <input
              type="text"
              placeholder="ابحث عن اسم الشركة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '0.8rem',
                fontSize: '1rem',
                fontFamily: 'inherit',
                color: 'var(--text-main)',
                background: 'transparent'
              }}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)' }}>
            شركات توظف حالياً ({companies.length})
          </h2>
        </div>

        {companies.length > 0 ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {currentCompanies.map((company, index) => (
                <div key={index} className="job-card animate-fade" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)',
                      fontSize: '1.2rem', fontWeight: '900', border: '1px solid #e2e8f0', flexShrink: 0
                    }}>
                      {company.logo}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>{company.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                        <MapPin size={14} />
                        <span>{company.cities.join('، ')}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', flex: 1 }}>
                    {company.categories.slice(0, 3).map((cat, i) => (
                      <span key={i} style={{
                        background: '#f1f5f9', color: 'var(--text-muted)',
                        padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600'
                      }}>
                        {cat}
                      </span>
                    ))}
                    {company.categories.length > 3 && (
                      <span style={{ background: '#f1f5f9', color: 'var(--text-muted)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600' }}>
                        +{company.categories.length - 3} مجالات أخرى
                      </span>
                    )}
                  </div>

                  <div style={{
                    borderTop: '1px solid #f1f5f9', paddingTop: '1.2rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: 'var(--primary)', fontWeight: '800', background: 'var(--accent)',
                      padding: '0.5rem 1rem', borderRadius: '8px'
                    }}>
                      <Briefcase size={16} />
                      {company.jobCount} وظائف متاحة
                    </span>

                    <Link to="/" style={{ color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      تصفح <ChevronLeft size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination animate-fade" style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid transparent',
                    background: currentPage === 1 ? '#e2e8f0' : 'var(--white)', color: currentPage === 1 ? '#94a3b8' : 'var(--primary)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold',
                    boxShadow: currentPage === 1 ? 'none' : 'var(--shadow-sm)', transition: 'var(--transition)'
                  }}
                >
                  السابق
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    style={{
                      width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '8px', border: 'none', background: currentPage === i + 1 ? 'var(--primary)' : 'var(--white)',
                      color: currentPage === i + 1 ? 'white' : 'var(--text-main)', fontWeight: 'bold',
                      boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'var(--transition)'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid transparent',
                    background: currentPage === totalPages ? '#e2e8f0' : 'var(--white)', color: currentPage === totalPages ? '#94a3b8' : 'var(--primary)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold',
                    boxShadow: currentPage === totalPages ? 'none' : 'var(--shadow-sm)', transition: 'var(--transition)'
                  }}
                >
                  التالي
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results animate-fade" style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '16px' }}>
            <Building2 size={60} strokeWidth={1} color="var(--text-muted)" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>لا توجد شركات مطابقة للبحث</h3>
            <p style={{ color: 'var(--text-muted)' }}>جرب البحث باسم شركة أخرى في {selectedCountry}.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Companies;
