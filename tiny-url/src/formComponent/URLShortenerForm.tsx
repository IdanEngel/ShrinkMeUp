import { nanoid } from "nanoid";
import React, { useState } from "react";
import validator from 'validator'


interface URLShortenerFormProps {
  onSubmit: (longUrl: string, generatedURL: string) => void;
}

// This component handles the form (Input and Submit Button)
const URLShortenerForm: React.FC<URLShortenerFormProps> = ({ onSubmit }) => {
  // States to save user input and error messages
  const [longUrl, setLongUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Setting the longUrl state when the user types
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(event.target.value);
  };
  // generating the 5 chars key
  const generatedKey = nanoid(5);
  // The final short url
  const generatedURL = "http://localhost:8000/" + generatedKey;
  // Checking if the user entered a valid url
  const isValidURL = (url: string) => {
    try {
      //validate url
      if(validator.isURL(url) && new URL(url)){
        return true;
      }
    } catch (error) {
      return false;
    }
  };
  // submit function that passes the urls and clears the state
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidURL(longUrl)) {
      onSubmit(longUrl, generatedURL);
      setLongUrl("");
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid URL.");
    }
  };

  return (
    <>
      <form className="linkForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={handleInputChange}
          placeholder="Enter your long URL here"
        />
        <button className="shortenButton" type="submit">
          Shorten URL
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
};

export default URLShortenerForm;
