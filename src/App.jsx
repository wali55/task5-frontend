import { useState } from "react";
import BookListActions from "./components/BookListActions";
import Header from "./components/Header";
import BooksTable from "./components/BooksTable";

function App() {
  const [locale, setLocale] = useState('en-US');
  const [seed, setSeed] = useState(42);
  const [avgLikes, setAvgLikes] = useState(3.5);
  const [avgReviews, setAvgReviews] = useState(2.3);

  return (
    <div>
      <Header />
      <BookListActions locale={locale} setLocale={setLocale} seed={seed} setSeed={setSeed} avgLikes={avgLikes} setAvgLikes={setAvgLikes} avgReviews={avgReviews} setAvgReviews={setAvgReviews} />
      <BooksTable locale={locale} seed={seed} avgLikes={avgLikes} avgReviews={avgReviews} />
    </div>
  );
}

export default App;
