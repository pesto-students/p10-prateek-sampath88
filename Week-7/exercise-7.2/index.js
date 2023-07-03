function spiralOrder(matrix) {
    if (matrix.length === 0) {
      return [];
    }
    
    const result = [];
    let topRow = 0;
    let bottomRow = matrix.length - 1;
    let leftColumn = 0;
    let rightColumn = matrix[0].length - 1;
    
    while (topRow <= bottomRow && leftColumn <= rightColumn) {
      for (let i = leftColumn; i <= rightColumn; i++) {
        result.push(matrix[topRow][i]);
      }
      topRow++;
      
      for (let i = topRow; i <= bottomRow; i++) {
        result.push(matrix[i][rightColumn]);
      }
      rightColumn--;
      
      if (topRow <= bottomRow) {
        for (let i = rightColumn; i >= leftColumn; i--) {
          result.push(matrix[bottomRow][i]);
        }
        bottomRow--;
      }
      
      if (leftColumn <= rightColumn) {
        for (let i = bottomRow; i >= topRow; i--) {
          result.push(matrix[i][leftColumn]);
        }
        leftColumn++;
      }
    }
    
    return result;
  }
  
  // Test case
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  console.log(spiralOrder(matrix)); // Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
  