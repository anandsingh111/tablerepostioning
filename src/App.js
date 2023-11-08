import React, { useState } from "react";
import "./styles.css";
const tableData = [
  { id: 1, name: "John Doe", age: 30, city: "New York" },
  { id: 2, name: "Jane Smith", age: 28, city: "Los Angeles" },
  { id: 3, name: "Bob Johnson", age: 35, city: "Chicago" },
  { id: 4, name: "Alice Williams", age: 32, city: "San Francisco" }
];

const initialColumnOrder = ["id", "name", "age", "city"];

const App = () => {
  const [columns, setColumns] = useState(initialColumnOrder);

  const handleColumnDrag = (e, column) => {
    e.dataTransfer.setData("text/plain", column);
  };

  const handleColumnDrop = (e, targetColumn) => {
    e.preventDefault();
    const draggedColumn = e.dataTransfer.getData("text/plain");
    const newColumnOrder = [...columns];
    const draggedColumnIndex = newColumnOrder.indexOf(draggedColumn);
    const targetColumnIndex = newColumnOrder.indexOf(targetColumn);
    newColumnOrder.splice(draggedColumnIndex, 1);
    newColumnOrder.splice(targetColumnIndex, 0, draggedColumn);
    setColumns(newColumnOrder);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <table className="generic-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column}
                draggable
                onDragStart={(e) => handleColumnDrag(e, column)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleColumnDrop(e, column)}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
