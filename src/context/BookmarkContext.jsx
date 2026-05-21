import React, { createContext, useState, useContext, useEffect } from 'react';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedBookmarks = localStorage.getItem('masarBookmarks');
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (e) {
        console.error('Error parsing stored bookmarks:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('masarBookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoading]);

  const toggleBookmark = (job) => {
    setBookmarks(prevBookmarks => {
      const existingIndex = prevBookmarks.findIndex(b => String(b.id) === String(job.id));
      if (existingIndex > -1) {
        // Remove bookmark
        return prevBookmarks.filter(b => String(b.id) !== String(job.id));
      } else {
        // Add bookmark
        return [...prevBookmarks, job];
      }
    });
  };

  const isBookmarked = (jobId) => {
    return bookmarks.some(b => String(b.id) === String(jobId));
  };

  const removeBookmark = (jobId) => {
    setBookmarks(prevBookmarks => prevBookmarks.filter(b => String(b.id) !== String(jobId)));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, removeBookmark, isLoading }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
}
