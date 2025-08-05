import { useState } from "react";
import Field from "./Field";
import FieldSet from "./FieldSet";
import { Shuffle } from "lucide-react";

const locales = [
  { code: "en-US", name: "English (USA)", flag: "US" },
  { code: "fr-FR", name: "Français (France)", flag: "FR" },
  { code: "de-DE", name: "Deutsch (Germany)", flag: "DE" },
];

const BookListActions = ({locale, setLocale, seed, setSeed, avgLikes, setAvgLikes, avgReviews, setAvgReviews}) => {

  const generateRandomSeed = () => {
    return Math.floor(Math.random() * 10000000);
  };

  return (
    <FieldSet>
      <Field label="Language">
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {locales.map((loc) => (
            <option key={loc.code} value={loc.code}>
              {loc.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="relative">
        <Field label="Seed">
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </Field>
        <button
          onClick={() => setSeed(generateRandomSeed())}
          className="absolute top-9 right-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
          title="Generate random seed"
        >
          <Shuffle size={18} />
        </button>
      </div>

      <Field label="Likes" count={avgLikes}>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={avgLikes}
          onChange={(e) => setAvgLikes(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </Field>

      <Field label="Review">
        <input
          type="number"
          min="0"
          max="20"
          step="0.1"
          value={avgReviews}
          onChange={(e) => setAvgReviews(parseFloat(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </Field>
    </FieldSet>
  );
};

export default BookListActions;
