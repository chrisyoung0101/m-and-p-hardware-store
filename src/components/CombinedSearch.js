import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Table from './Table';

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

const CombinedSearch = () => {
  const [searchId, setSearchId] = useState('');
  const [combinedData, setCombinedData] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);

  console.log(combinedData);

  const handleSearchById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/sales/combined/${searchId}`
      );
      setCombinedData([response.data]);
      setTableVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAllCombinedData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/combined/`);
      setCombinedData(response.data);
      setTableVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTableVisibility = () => {
    setTableVisible(!tableVisible);
  };

  return (
    <div>
      <StyledInputGroup>
        <StyledLabel htmlFor="searchId">Search Combined by ID:</StyledLabel>
        <input
          type="text"
          id="searchId"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <StyledButton onClick={handleSearchById}>Search</StyledButton>
        <StyledButton onClick={handleGetAllCombinedData}>
          Get All Current Combined Inventory
        </StyledButton>
        {combinedData.length > 0 && (
          <StyledButton onClick={toggleTableVisibility}>
            {tableVisible ? 'Hide Table' : 'Show Table'}
          </StyledButton>
        )}
      </StyledInputGroup>

      {tableVisible && combinedData.length > 0 && (
        <Table
          data={combinedData}
          columns={[
            // Create a columns array with the following columns:
            // private Long id;
            { Header: 'ID', accessor: 'id' },
            //     private Long saleId;
            { Header: 'Sale ID', accessor: 'saleId' },
            // private LocalDate saleDate;
            { Header: 'Sale Date', accessor: 'saleDate' },

            // private String item;
            { Header: 'Item', accessor: 'item' },
            // private Double price;
            { Header: 'Price', accessor: 'price' },
            // private String customerName;
            { Header: 'Customer Name', accessor: 'customerName' },
            // private Long inventoryItemId;
            { Header: 'Inventory Item ID', accessor: 'inventoryItemId' },
            // private String inventoryItemName;
            { Header: 'Inventory Item Name', accessor: 'inventoryItemName' },
            // private int quantity;
            { Header: 'Quantity', accessor: 'quantity' },
          ]}
        />
      )}
    </div>
  );
};

export default CombinedSearch;
