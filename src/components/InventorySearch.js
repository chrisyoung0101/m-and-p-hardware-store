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

const InventorySearch = () => {
  const [searchId, setSearchId] = useState('');
  const [inventoryData, setInventoryData] = useState([]);

  const handleSearchById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/inventory-items/${searchId}`
      );
      setInventoryData([response.data]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAllInventory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/inventory-items/`
      );
      setInventoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <StyledInputGroup>
        <StyledLabel htmlFor="searchId">Search Inventory By ID:</StyledLabel>
        <input
          type="text"
          id="searchId"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <StyledButton onClick={handleSearchById}>Search</StyledButton>
        <StyledButton onClick={handleGetAllInventory}>
          Get All Current Inventory
        </StyledButton>
      </StyledInputGroup>

      {inventoryData.length > 0 && (
        <Table
          data={inventoryData}
          columns={[
            {
              Header: 'ID',
              accessor: 'id',
            },
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Quantity',
              accessor: 'quantity',
            },
            // Add other relevant columns
          ]}
        />
      )}
    </div>
  );
};

export default InventorySearch;
