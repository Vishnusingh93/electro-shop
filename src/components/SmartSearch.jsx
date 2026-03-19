
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SmartSearch({ navigate }) {

  const words = [
    "AC Repair Service",
    "LED Bulb",
    "Ceiling Fan",
    "Electric Wire",
    "Switch Board"
  ];

  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {

    if (inputValue !== "") return;

    const currentWord = words[wordIndex];

    const typing = setTimeout(() => {

      if (charIndex < currentWord.length) {
        setPlaceholder(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setWordIndex((prev) => (prev + 1) % words.length);
          setPlaceholder("");
        }, 800);
      }

    }, 80);

    return () => clearTimeout(typing);

  }, [charIndex, wordIndex, inputValue]);

  const handleChange = (e) => {

    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== "") {
      navigate(`/products?q=${value}`);
    }

  };

  return (

    <div className="relative w-full sm:w-64">

      {/* Search Icon */}
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={
          inputValue
            ? ""
            : `Search for "${placeholder}"` || "Search products..."
        }
        className="border pl-10 pr-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

    </div>

  );

}