import React, { useState, useEffect } from "react";
import "../App.css";

import URLShortenerForm from "../formComponent/URLShortenerForm";
import axios from "axios";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";

import { nanoid } from "nanoid";
import DOMPurify from "dompurify";

const App: React.FC = () => {
  // short link (generatedUrl) state
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  // Copy to clipboard button state
  const [copyButton, setCopyButton] = useState<boolean>(false);

  useEffect(() => {}, [generatedUrl]);

  const downloadQRCode = async () => {
    const qrCodeElement = document.getElementById("qr-code");
    if (qrCodeElement) {
      const canvas = await html2canvas(qrCodeElement);
      const imageURL = canvas.toDataURL("image/png");

      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "qrcode.png";
      link.click();
    }
  };

  const MAX_RETRIES = 3; // Maximum number of retries
  let retries = 0;
  // handleSubmit is responsible for posting the db with both urls and save them
  const handleSubmit = async (longUrl: string | null, generatedURL: string | null) => {
    if (!longUrl && !generatedURL) {
      setGeneratedUrl(null);
      console.error("error");
      return;
    }
    try {
      // Posting to server the original and shorten (dobby) links
      await axios
        .post("http://localhost:8000/sendLink", {
          originalLink: longUrl,
          dobbyLink: generatedURL,
        })
        // If response is good (200), the generated url is set
        .then((response) => {
          setGeneratedUrl(response.data.shortenLink);
        })
        .catch((error) => {
          // If I get response 400, it means the shorten link is existed in db
          if (error.response && error.response.status === 400) {
            // Then we retry to create a new shorten link and call the function again
            // This occurs maximum 3 times
            if (retries < MAX_RETRIES) {
              // The new generated shorten link
              const newGeneratedURL = "http://localhost:8000/" + nanoid(5);
              // Retry the request with and increment the number of retries
              console.log(error.response.data.detail, "Retrying Request...");
              retries += 1;
              handleSubmit(longUrl, newGeneratedURL);
            } else {
              // Maximum retries reached, logging the error
              console.log("Maximum retries reached. Unable to create short URL.");
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="formLink">
        <h1>Shrink Me Up</h1>
        <URLShortenerForm onSubmit={handleSubmit} />
        {generatedUrl !== null && ( // Check for undefined before rendering
          <>
            <div className="generatedLink">
              Generated URL:{" "}
              <a href={DOMPurify.sanitize(generatedUrl)} className="generatedUrl">
                {" "}
                {DOMPurify.sanitize(generatedUrl)}
              </a>
            </div>
            <div>
              {!copyButton ? ( // Check if copy button is clicked
                <button
                  className="copy-button"
                  onClick={() => {
                    // Saving to Clipboard
                    navigator.clipboard.writeText(generatedUrl), setCopyButton(true);
                  }}
                >
                  Copy To Clipboard
                </button>
              ) : (
                <p>Copied!</p>
              )}
            </div>
            <div className="qr-wrapper">
              <h2> You Also Have A QR Code!</h2>
              <QRCode value={generatedUrl} id="qr-code" />
              <button onClick={downloadQRCode} className="qr-download">Download QR Code</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
