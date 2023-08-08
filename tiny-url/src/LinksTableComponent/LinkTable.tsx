import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LinkTable.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import DOMPurify from "dompurify";

interface LinkData {
  _id: string;
  originalLink: string;
  dobbyLink: string;
}

// This Component is for all shorten links presentation
const LinkTable: React.FC = () => {
  // All links state
  const [links, setLinks] = useState<LinkData[]>([]);
  // Loading screen state
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  // fetching links when dom is mounted
  useEffect(() => {
    fetchLinks();
  }, []);

  // fetching all links from database
  const fetchLinks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/allLinks");
      setLinks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching links:", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="table-container">
      {/* Conditional rendering */}
      {isLoading ? (
        <LoadingScreen />
      ) : links.length === 0 ? (
        // If there are no links will display this instead of empty table
        <>
          <h1>There Are No Shorten Link Yet (Sad Face) </h1>
          <h2>Feel Free To Add Some ;-) </h2>
        </>
      ) : (
        <table className="link-table">
          <thead>
            <tr>
              <th>Original Link</th>
              <th>ShrinkMeUp Link</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.dobbyLink}>
                <td>{link.originalLink}</td>
                <td>
                  <a href={DOMPurify.sanitize(link.dobbyLink)}>{link.dobbyLink}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LinkTable;
