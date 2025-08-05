import React, { useCallback, useEffect, useRef, useState } from "react";
import { baseUrl } from "../../baseUrl";
import {
  ChevronDown,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import BookCover from "./BookCover";
import ReviewCard from "./ReviewCard";

const BooksTable = ({ locale, seed, avgLikes, avgReviews }) => {
  const containerRef = useRef(null);
  const [expandedBook, setExpandedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = useCallback(
    async (pageNum = 0, reset = false) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/api/books?locale=${locale}&seed=${seed}&page=${pageNum}&avgLikes=${avgLikes}&avgReviews=${avgReviews}`
        );
        const data = await response.json();

        if (reset || pageNum === 0) {
          setBooks(data.books);
          setPage(0);
        } else {
          setBooks((prev) => [...prev, ...data.books]);
        }

        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
      setLoading(false);
    },
    [locale, seed, avgLikes, avgReviews]
  );

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/books/${bookId}?locale=${locale}&seed=${seed}&avgLikes=${avgLikes}&avgReviews=${avgReviews}`
      );
      const data = await response.json();
      setBookDetails((prev) => ({ ...prev, [bookId]: data }));
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleScroll = useCallback(() => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBooks(nextPage, false);
    }
  }, [page, loading, hasMore, fetchBooks]);

  useEffect(() => {
    fetchBooks(0, true);
  }, [locale, seed, avgLikes, avgReviews]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    setBookDetails({});
  }, [locale, seed, avgLikes, avgReviews]);

  const toggleBookExpansion = (bookId) => {
    if (expandedBook === bookId) {
      setExpandedBook(null);
    } else {
      setExpandedBook(bookId);
      if (!bookDetails[bookId]) {
        fetchBookDetails(bookId);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div
        ref={containerRef}
        className="bg-white rounded-lg shadow overflow-hidden"
        style={{ height: "70vh", overflowY: "auto" }}
      >
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ISBN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publisher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stats
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <React.Fragment key={book.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => toggleBookExpansion(book.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      {expandedBook === book.id ? (
                        <ChevronDown size={18} className="mr-2 text-gray-400" />
                      ) : (
                        <ChevronRight
                          size={18}
                          className="mr-2 text-gray-400"
                        />
                      )}
                      {book.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {book.isbn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {book.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.publisher}
                    {", "}
                    {book.publishYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <ThumbsUp size={14} className="mr-1 text-blue-400" />
                        {book.likes || 0}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare
                          size={14}
                          className="mr-1 text-purple-400"
                        />
                        {book.reviews?.length || 0}
                      </div>
                    </div>
                  </td>
                </tr>

                {expandedBook === book.id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-6 bg-gray-50">
                      {bookDetails[book.id] ? (
                        <div className="flex gap-6">
                          <BookCover
                            cover={bookDetails[book.id].cover}
                            title={bookDetails[book.id].title}
                            author={bookDetails[book.id].author}
                          />
                          <div className="flex-1">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {bookDetails[book.id].title}
                              </h3>
                              <p className="text-gray-600 mb-1">
                                <strong>Author:</strong>{" "}
                                {bookDetails[book.id].author}
                              </p>
                              <p className="text-gray-600 mb-1">
                                <strong>Publisher:</strong>{" "}
                                {bookDetails[book.id].publisher}
                                {", "}
                                {bookDetails[book.id].publishYear}
                              </p>
                              <p className="text-gray-600 mb-4">
                                <strong>ISBN:</strong>{" "}
                                {bookDetails[book.id].isbn}
                              </p>

                              <div className="flex items-center gap-6 mb-4">
                                <div className="flex items-center">
                                  <ThumbsUp
                                    size={18}
                                    className="mr-2 text-blue-400"
                                  />
                                  <span className="text-lg font-semibold">
                                    {bookDetails[book.id].likes} likes
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare
                                    size={18}
                                    className="mr-2 text-purple-400"
                                  />
                                  <span className="text-lg font-semibold">
                                    {bookDetails[book.id].reviews?.length || 0}{" "}
                                    reviews
                                  </span>
                                </div>
                              </div>
                            </div>

                            {bookDetails[book.id].reviews?.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                  Reviews
                                </h4>
                                <div className="max-h-64 overflow-y-auto">
                                  {bookDetails[book.id].reviews.map(
                                    (review, idx) => (
                                      <ReviewCard key={idx} review={review} />
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                          <span className="ml-3 text-gray-600">
                            Loading book details...
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading more books...</span>
          </div>
        )}

        {!hasMore && books.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            No more books to load
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksTable;
