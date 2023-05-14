import React, { useState } from 'react';
import Table from './Table';
import styled from 'styled-components';

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;

  input {
    margin-bottom: 5px;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
`;

const StyledButton = styled.button`
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const SalesSearch = () => {
  const [sales, setSales] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [tableVisible, setTableVisible] = useState(true);

  const handleSearch = () => {
    // Perform the API request to search sales by ID
    fetch(`http://localhost:8080/sales/${searchId}`)
      .then((response) => response.json())
      .then((data) => setSales([data]))
      .catch((error) => console.log(error));
  };

  const handleGetAllSales = () => {
    // Perform the API request to get all sales
    fetch('http://localhost:8080/sales')
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
        setTableVisible(true);
      })
      .catch((error) => console.log(error));
  };

  const toggleTableVisibility = () => {
    setTableVisible(!tableVisible);
  };

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Sale Date', accessor: 'saleDate' },
    { Header: 'Item', accessor: 'item' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Customer Name', accessor: 'customerName' },
  ];

  return (
    <div>
      <StyledInputGroup>
        <StyledLabel htmlFor="searchInput">Search Sales by ID: </StyledLabel>
        <input
          type="text"
          id="searchInput"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <StyledButton onClick={handleSearch}>Search</StyledButton>
        <StyledButton onClick={handleGetAllSales}>Get All Sales</StyledButton>
        {sales.length > 0 && (
          <StyledButton onClick={toggleTableVisibility}>
            {tableVisible ? 'Hide Table' : 'Show Table'}
          </StyledButton>
        )}
      </StyledInputGroup>
      {tableVisible && sales.length > 0 && (
        <Table data={sales} columns={columns} />
      )}
    </div>
  );
};

export default SalesSearch;
