
interface GridWorksheetOptions {
  numProblems: number;
  operations: ('addition' | 'subtraction' | 'multiplication' | 'division')[];
  maxNumber: number;
  minNumber?: number;
  allowNegatives?: boolean;
  mixedOperations?: boolean;
}

interface MathProblem {
  question: string;
  answer: string;
}

export const generateMathGridWorksheet = (options: GridWorksheetOptions): MathProblem[] => {
  const { 
    numProblems, 
    operations, 
    maxNumber, 
    minNumber = 0, 
    allowNegatives = false,
    mixedOperations = true 
  } = options;
  
  const problems: MathProblem[] = [];
  
  for (let i = 0; i < numProblems; i++) {
    // Select operation - either random from the list or in sequence if not mixed
    const operationIndex = mixedOperations 
      ? Math.floor(Math.random() * operations.length) 
      : i % operations.length;
    
    const operation = operations[operationIndex];
    
    const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    
    // For division, ensure we have a clean division
    let num2: number;
    
    if (operation === 'division') {
      // Make sure we don't divide by zero
      num2 = Math.floor(Math.random() * (maxNumber - 1)) + 1;
      
      // For cleaner division problems, make num1 a multiple of num2
      const quotient = Math.floor(Math.random() * 10) + 1;
      const cleanNum1 = num2 * quotient;
      
      // Use the clean num1 if it's within our range
      if (cleanNum1 <= maxNumber) {
        num2 = num2;
        num1 = cleanNum1;
      }
    } else if (operation === 'subtraction' && !allowNegatives) {
      // For subtraction, ensure num1 >= num2 if negatives aren't allowed
      num2 = Math.floor(Math.random() * (num1 + 1));
    } else {
      num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    }
    
    let question: string;
    let answer: string;
    
    switch (operation) {
      case 'addition':
        question = `${num1} + ${num2} =`;
        answer = `${num1 + num2}`;
        break;
      case 'subtraction':
        question = `${num1} - ${num2} =`;
        answer = `${num1 - num2}`;
        break;
      case 'multiplication':
        question = `${num1} × ${num2} =`;
        answer = `${num1 * num2}`;
        break;
      case 'division':
        question = `${num1} ÷ ${num2} =`;
        answer = `${num1 / num2}`;
        break;
      default:
        question = '';
        answer = '';
    }
    
    problems.push({ question, answer });
  }
  
  return problems;
};

export default {
  generateMathGridWorksheet
};
