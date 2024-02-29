import React, { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import './Pagination.css'; // Assuming you have a CSS file named Pagination.css for styling

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      alert('Failed to fetch data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage(prevPage => (prevPage === totalPages ? prevPage : prevPage + 1));
  };

  const handleClickPrevious = () => {
    setCurrentPage(prevPage => (prevPage === 1 ? prevPage : prevPage - 1));
  };

  const generatePageNumbers = () => {
    return (
      <span style={{ backgroundColor: '#00cc00', color: '#ffffff', padding: '5px 10px', borderRadius: '5px' }}>
        {currentPage}
      </span>
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="pagination-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-row">
            <button onClick={handleClickPrevious} disabled={currentPage === 1}>
            <span style={{ backgroundColor: '#00cc00', color: '#ffffff', padding: '5px 10px', borderRadius: '5px' }}>
        Previous
      </span>
              
            </button>
            {generatePageNumbers()}
            <button onClick={handleClickNext} disabled={currentPage === totalPages}>
            <span style={{ backgroundColor: '#00cc00', color: '#ffffff', padding: '5px 10px', borderRadius: '5px' }}>
         Next
      </span>
             
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
