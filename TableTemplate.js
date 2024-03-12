// <![CDATA[
    'use strict';

class TableTemplate {
    static fillIn(tableId, dictionary, columnName) {
      const table = document.getElementById(tableId);
      const headerRow = table.rows[0];
  
      // Fill in template strings in the header row
      for (let cellIndex = 0; cellIndex < headerRow.cells.length; cellIndex++) {
        const cell = headerRow.cells[cellIndex];
        const originalText = cell.textContent;
        const updatedText = TableTemplate.processTemplateString(originalText, dictionary);
        cell.textContent = updatedText;
      }
  
      // If columnName is specified, fill in template strings in the specified column
      if (columnName) {
        const columnIndex = TableTemplate.getColumnIndex(table, columnName);
  
        if (columnIndex === -1) {
          return;
        }
  
        for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
          const cell = table.rows[rowIndex].cells[columnIndex];
          const originalText = cell.textContent;
          const updatedText = TableTemplate.processTemplateString(originalText, dictionary);
          cell.textContent = updatedText;
        }
      } else {
        // Fill in template strings in the entire table
        for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
          const row = table.rows[rowIndex];
          for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
            const cell = row.cells[cellIndex];
            const originalText = cell.textContent;
            const updatedText = TableTemplate.processTemplateString(originalText, dictionary);
            cell.textContent = updatedText;
          }
        }
      }
  
      // Make the table visible if it was hidden
      table.style.visibility = "visible";
    }
  
    static processTemplateString(text, dictionary) {
      const templateRegex = /{{(.*?)}}/g;
      const updatedText = text.replace(templateRegex, (match, propertyName) => {
        const propertyValue = dictionary[propertyName.trim()];
        return propertyValue || "";
      });
      return updatedText;
    }
  
    static getColumnIndex(table, columnName) {
      const headerRow = table.rows[0];
      for (let cellIndex = 0; cellIndex < headerRow.cells.length; cellIndex++) {
        const cell = headerRow.cells[cellIndex];
        if (cell.textContent.trim() === columnName) {
          return cellIndex;
        }
      }
      return -1;
    }
  }
  
 
  
  
  
 
  
  