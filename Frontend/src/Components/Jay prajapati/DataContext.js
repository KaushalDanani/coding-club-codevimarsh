// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext({
  filteredData: [],
  setFilteredData: () => {},
});

export const DataProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    localStorage.setItem('filteredData', JSON.stringify(filteredData));
  }, [filteredData]);


  return (
    <DataContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </DataContext.Provider>
  );
};
