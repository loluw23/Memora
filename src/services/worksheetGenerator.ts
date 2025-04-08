
// Utility to generate math problems based on options
interface MathGenerationOptions {
  grade: string;
  topics: string[];
  difficulty: string;
  questionCount: number;
  includeGeometricShapes: boolean;
  include3dFigures: boolean;
  copyright?: string;
}

interface Question {
  question: string;
  answer: string;
  explanation?: string;
  figure?: string; // For geometric questions, this would be a description of the shape/figure
}

interface GeneratedWorksheet {
  title: string;
  instructions: string;
  specialMessage?: string;
  questions: Question[];
  answerKey: { [key: number]: string };
  grade?: string;
  subject?: string;
  copyright?: string;
}

// Generate a random number within a range
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate addition problems based on grade level
const generateAdditionProblems = (grade: string, count: number, difficulty: string): Question[] => {
  const questions: Question[] = [];
  
  // Set limits based on grade level and difficulty
  let min = 1;
  let max = 10;
  
  if (grade === '1') {
    max = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
  } else if (grade === '2') {
    max = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 50 : 100;
  } else if (grade === '3') {
    max = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 500;
  } else if (grade === '4') {
    max = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 500 : 1000;
  } else {
    max = difficulty === 'easy' ? 500 : difficulty === 'medium' ? 1000 : 10000;
  }
  
  for (let i = 0; i < count; i++) {
    const num1 = randomInt(min, max);
    const num2 = randomInt(min, max);
    const answer = num1 + num2;
    
    questions.push({
      question: `${num1} + ${num2} = ?`,
      answer: answer.toString(),
      explanation: `Add ${num1} and ${num2} to get ${answer}`
    });
  }
  
  return questions;
};

// Generate subtraction problems based on grade level
const generateSubtractionProblems = (grade: string, count: number, difficulty: string): Question[] => {
  const questions: Question[] = [];
  
  // Set limits based on grade level and difficulty
  let min = 1;
  let max = 10;
  
  if (grade === '1') {
    max = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
  } else if (grade === '2') {
    max = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 50 : 100;
  } else if (grade === '3') {
    max = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 500;
  } else if (grade === '4') {
    max = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 500 : 1000;
  } else {
    max = difficulty === 'easy' ? 500 : difficulty === 'medium' ? 1000 : 10000;
  }
  
  for (let i = 0; i < count; i++) {
    // For subtraction, make sure the first number is larger to avoid negative results
    // for lower grades
    let num1, num2;
    if (Number(grade) <= 3 || difficulty === 'easy') {
      num1 = randomInt(min, max);
      num2 = randomInt(min, num1); // Ensure num2 <= num1 to avoid negative numbers
    } else {
      num1 = randomInt(min, max);
      num2 = randomInt(min, max);
    }
    
    const answer = num1 - num2;
    
    questions.push({
      question: `${num1} - ${num2} = ?`,
      answer: answer.toString(),
      explanation: `Subtract ${num2} from ${num1} to get ${answer}`
    });
  }
  
  return questions;
};

// Generate multiplication problems based on grade level
const generateMultiplicationProblems = (grade: string, count: number, difficulty: string): Question[] => {
  const questions: Question[] = [];
  
  // Set limits based on grade level and difficulty
  let min = 1;
  let max = 5;
  
  if (grade === '3') {
    max = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 12;
  } else if (grade === '4') {
    max = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 12 : 15;
  } else if (grade === '5') {
    max = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 15 : 20;
  } else {
    max = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 30;
  }
  
  for (let i = 0; i < count; i++) {
    const num1 = randomInt(min, max);
    const num2 = randomInt(min, max);
    const answer = num1 * num2;
    
    questions.push({
      question: `${num1} × ${num2} = ?`,
      answer: answer.toString(),
      explanation: `Multiply ${num1} by ${num2} to get ${answer}`
    });
  }
  
  return questions;
};

// Generate division problems based on grade level
const generateDivisionProblems = (grade: string, count: number, difficulty: string): Question[] => {
  const questions: Question[] = [];
  
  // Set limits based on grade level and difficulty
  let min = 1;
  let max = 10;
  let allowRemainders = false;
  
  if (grade === '3') {
    max = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 12;
    allowRemainders = difficulty === 'hard';
  } else if (grade === '4') {
    max = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 12 : 15;
    allowRemainders = difficulty !== 'easy';
  } else {
    max = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 20 : 30;
    allowRemainders = true;
  }
  
  for (let i = 0; i < count; i++) {
    let num1, num2, answer, question;
    
    if (allowRemainders) {
      // With remainders
      num1 = randomInt(min, max * max);
      num2 = randomInt(min, max);
      const quotient = Math.floor(num1 / num2);
      const remainder = num1 % num2;
      
      if (remainder === 0) {
        question = `${num1} ÷ ${num2} = ?`;
        answer = quotient.toString();
      } else {
        question = `${num1} ÷ ${num2} = ? (Give quotient and remainder)`;
        answer = `${quotient} R ${remainder}`;
      }
    } else {
      // Without remainders - make sure division is clean
      num2 = randomInt(min, max);
      const quotient = randomInt(min, max);
      num1 = num2 * quotient;
      
      question = `${num1} ÷ ${num2} = ?`;
      answer = quotient.toString();
    }
    
    questions.push({
      question,
      answer,
      explanation: `Divide ${num1} by ${num2} to get ${answer}`
    });
  }
  
  return questions;
};

// Generate fraction problems
const generateFractionProblems = (grade: string, count: number, difficulty: string): Question[] => {
  const questions: Question[] = [];
  
  // Define types of fraction problems based on grade
  let operations: string[] = [];
  
  if (grade === '3') {
    operations = ['identify', 'compare'];
  } else if (grade === '4') {
    operations = ['identify', 'compare', 'add-same-denominator', 'subtract-same-denominator'];
  } else if (grade === '5') {
    operations = ['add-same-denominator', 'subtract-same-denominator', 'add-different-denominator', 'subtract-different-denominator'];
  } else {
    operations = ['add-different-denominator', 'subtract-different-denominator', 'multiply', 'divide'];
  }
  
  for (let i = 0; i < count; i++) {
    const operation = operations[randomInt(0, operations.length - 1)];
    let question, answer;
    
    switch (operation) {
      case 'identify':
        // Create a fraction identification question
        const denominator = randomInt(2, 12);
        const numerator = randomInt(1, denominator - 1);
        question = `What fraction is represented by the shaded portion? (${numerator} parts out of ${denominator} total parts)`;
        answer = `${numerator}/${denominator}`;
        break;
        
      case 'compare':
        // Create a fraction comparison question
        const denom1 = randomInt(2, 10);
        const numer1 = randomInt(1, denom1);
        const denom2 = randomInt(2, 10);
        const numer2 = randomInt(1, denom2);
        question = `Compare the fractions ${numer1}/${denom1} and ${numer2}/${denom2} using <, >, or =.`;
        
        const value1 = numer1 / denom1;
        const value2 = numer2 / denom2;
        if (value1 < value2) {
          answer = `${numer1}/${denom1} < ${numer2}/${denom2}`;
        } else if (value1 > value2) {
          answer = `${numer1}/${denom1} > ${numer2}/${denom2}`;
        } else {
          answer = `${numer1}/${denom1} = ${numer2}/${denom2}`;
        }
        break;
        
      case 'add-same-denominator':
        // Addition with same denominator
        const denomSame = randomInt(2, 12);
        const numer1Same = randomInt(1, denomSame - 1);
        const numer2Same = randomInt(1, denomSame - 1);
        question = `${numer1Same}/${denomSame} + ${numer2Same}/${denomSame} = ?`;
        
        let sumNumer = numer1Same + numer2Same;
        let sumDenom = denomSame;
        
        // Simplify fraction if possible
        const gcdSum = gcd(sumNumer, sumDenom);
        if (gcdSum > 1) {
          sumNumer /= gcdSum;
          sumDenom /= gcdSum;
        }
        
        answer = `${sumNumer}/${sumDenom}`;
        if (sumNumer >= sumDenom) {
          const whole = Math.floor(sumNumer / sumDenom);
          const remainder = sumNumer % sumDenom;
          answer = remainder === 0 ? `${whole}` : `${whole} ${remainder}/${sumDenom}`;
        }
        break;
        
      case 'subtract-same-denominator':
        // Subtraction with same denominator
        const denomSubSame = randomInt(2, 12);
        const numer1SubSame = randomInt(2, 12);
        const numer2SubSame = randomInt(1, numer1SubSame);
        question = `${numer1SubSame}/${denomSubSame} - ${numer2SubSame}/${denomSubSame} = ?`;
        
        let diffNumer = numer1SubSame - numer2SubSame;
        let diffDenom = denomSubSame;
        
        // Simplify fraction if possible
        const gcdDiff = gcd(diffNumer, diffDenom);
        if (gcdDiff > 1) {
          diffNumer /= gcdDiff;
          diffDenom /= gcdDiff;
        }
        
        answer = `${diffNumer}/${diffDenom}`;
        break;
        
      case 'add-different-denominator':
      case 'subtract-different-denominator':
      case 'multiply':
      case 'divide':
        // These operations are more complex and would require more detailed implementation
        // For now, we'll use placeholder questions
        if (operation === 'add-different-denominator') {
          question = `Add the fractions: 1/4 + 2/3 = ?`;
          answer = `11/12`;
        } else if (operation === 'subtract-different-denominator') {
          question = `Subtract the fractions: 3/4 - 1/6 = ?`;
          answer = `7/12`;
        } else if (operation === 'multiply') {
          question = `Multiply the fractions: 2/3 × 3/5 = ?`;
          answer = `6/15 = 2/5`;
        } else {
          question = `Divide the fractions: 2/3 ÷ 4/5 = ?`;
          answer = `10/12 = 5/6`;
        }
        break;
    }
    
    questions.push({
      question,
      answer,
      explanation: `Follow the rules for ${operation.replace(/-/g, ' ')} fractions to get ${answer}`
    });
  }
  
  return questions;
};

// Generate geometry problems
const generateGeometryProblems = (grade: string, count: number, difficulty: string, includeShapes: boolean, include3dFigures: boolean): Question[] => {
  const questions: Question[] = [];
  
  // Define types of geometry problems based on grade
  let problemTypes: string[] = [];
  
  if (grade === '1' || grade === '2') {
    problemTypes = ['identify-2d', 'count-sides'];
  } else if (grade === '3' || grade === '4') {
    problemTypes = ['identify-2d', 'count-sides', 'perimeter', 'area-rectangle'];
    if (include3dFigures) {
      problemTypes.push('identify-3d');
    }
  } else if (grade === '5' || grade === '6') {
    problemTypes = ['perimeter', 'area-rectangle', 'area-triangle'];
    if (include3dFigures) {
      problemTypes.push('identify-3d', 'volume-cube');
    }
  } else {
    problemTypes = ['area-complex', 'perimeter-complex'];
    if (include3dFigures) {
      problemTypes.push('volume-complex', 'surface-area');
    }
  }
  
  const shapes2D = ['square', 'rectangle', 'triangle', 'circle', 'pentagon', 'hexagon'];
  const shapes3D = ['cube', 'rectangular prism', 'sphere', 'cylinder', 'cone', 'pyramid'];
  
  for (let i = 0; i < count; i++) {
    const problemType = problemTypes[randomInt(0, problemTypes.length - 1)];
    let question, answer, figure;
    
    switch (problemType) {
      case 'identify-2d':
        const shape2D = shapes2D[randomInt(0, shapes2D.length - 1)];
        question = `Name this 2D shape.`;
        answer = shape2D;
        if (includeShapes) {
          figure = generateShapeSVG(shape2D);
        }
        break;
        
      case 'identify-3d':
        const shape3D = shapes3D[randomInt(0, shapes3D.length - 1)];
        question = `Name this 3D figure.`;
        answer = shape3D;
        if (include3dFigures) {
          figure = `[A ${shape3D} is shown]`;
        }
        break;
        
      case 'count-sides':
        const sideShape = shapes2D[randomInt(0, shapes2D.length - 1)];
        let sides;
        switch (sideShape) {
          case 'triangle': sides = 3; break;
          case 'square': sides = 4; break;
          case 'rectangle': sides = 4; break;
          case 'pentagon': sides = 5; break;
          case 'hexagon': sides = 6; break;
          default: sides = 0; // circle has 0 sides
        }
        question = `How many sides does a ${sideShape} have?`;
        answer = sides.toString();
        if (includeShapes) {
          figure = generateShapeSVG(sideShape);
        }
        break;
        
      case 'perimeter':
        // Simple perimeter question
        const length = randomInt(2, 10);
        const width = randomInt(2, 10);
        question = `Find the perimeter of a rectangle with length ${length} units and width ${width} units.`;
        answer = `${2 * (length + width)} units`;
        if (includeShapes) {
          figure = generateRectangleSVG(length, width);
        }
        break;
        
      case 'area-rectangle':
        // Area of rectangle
        const areaLength = randomInt(2, 10);
        const areaWidth = randomInt(2, 10);
        question = `Find the area of a rectangle with length ${areaLength} units and width ${areaWidth} units.`;
        answer = `${areaLength * areaWidth} square units`;
        if (includeShapes) {
          figure = generateRectangleSVG(areaLength, areaWidth, true);
        }
        break;
        
      case 'area-triangle':
        // Area of triangle
        const base = randomInt(2, 10);
        const height = randomInt(2, 10);
        question = `Find the area of a triangle with base ${base} units and height ${height} units.`;
        answer = `${(base * height) / 2} square units`;
        if (includeShapes) {
          figure = generateTriangleSVG(base, height);
        }
        break;
        
      case 'volume-cube':
        // Volume of a cube
        const side = randomInt(2, 8);
        question = `Find the volume of a cube with side length ${side} units.`;
        answer = `${side * side * side} cubic units`;
        if (includeShapes && include3dFigures) {
          figure = generateCubeSVG(side);
        }
        break;
        
      case 'volume-complex':
      case 'area-complex':
      case 'perimeter-complex':
      case 'surface-area':
        // These would be more complex problems for higher grades
        question = `For a ${problemType.replace(/-/g, ' ')} problem...`;
        answer = `Answer would depend on specific problem`;
        break;
    }
    
    questions.push({
      question,
      answer,
      explanation: `Apply the formula for ${problemType.replace(/-/g, ' ')} to get ${answer}`,
      figure: (includeShapes || include3dFigures) ? figure : undefined
    });
  }
  
  return questions;
};

// Generate SVG representation of shapes
function generateShapeSVG(shapeName: string): string {
  switch(shapeName.toLowerCase()) {
    case 'square':
      return '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/></svg>';
    case 'rectangle':
      return '<svg width="120" height="80" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="60" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/></svg>';
    case 'triangle':
      return '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 10,90 90,90" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/></svg>';
    case 'circle':
      return '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/></svg>';
    case 'pentagon':
      return '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 90,40 75,90 25,90 10,40" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/></svg>';
    case 'hexagon':
      return '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/></svg>';
    default:
      return `[A ${shapeName} is shown]`;
  }
}

function generateRectangleSVG(length: number, width: number, showArea: boolean = false): string {
  const scaleFactor = 10;
  const svgWidth = length * scaleFactor + 20;
  const svgHeight = width * scaleFactor + 20;
  const rectWidth = length * scaleFactor;
  const rectHeight = width * scaleFactor;
  
  let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect x="10" y="10" width="${rectWidth}" height="${rectHeight}" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>`;
  
  // Add dimensions
  svg += `<text x="${10 + rectWidth/2}" y="${svgHeight - 5}" text-anchor="middle" font-size="12">${length} units</text>`;
  svg += `<text x="5" y="${10 + rectHeight/2}" text-anchor="middle" font-size="12" transform="rotate(-90, 5, ${10 + rectHeight/2})">${width} units</text>`;
  
  if (showArea) {
    svg += `<text x="${10 + rectWidth/2}" y="${10 + rectHeight/2}" text-anchor="middle" font-size="14" fill="#64748b">Area = ${length * width}</text>`;
  }
  
  svg += '</svg>';
  return svg;
}

function generateTriangleSVG(base: number, height: number): string {
  const scaleFactor = 10;
  const svgWidth = base * scaleFactor + 20;
  const svgHeight = height * scaleFactor + 20;
  const triangleBase = base * scaleFactor;
  const triangleHeight = height * scaleFactor;
  
  let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<polygon points="${10 + triangleBase/2},10 10,${10 + triangleHeight} ${10 + triangleBase},${10 + triangleHeight}" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>`;
  
  // Add dimensions
  svg += `<text x="${10 + triangleBase/2}" y="${svgHeight - 5}" text-anchor="middle" font-size="12">Base = ${base} units</text>`;
  svg += `<line x1="${10 + triangleBase}" y1="${10 + triangleHeight}" x2="${10 + triangleBase}" y2="${10}" stroke="#64748b" stroke-dasharray="4" stroke-width="1"/>`;
  svg += `<text x="${svgWidth - 5}" y="${10 + triangleHeight/2}" text-anchor="middle" font-size="12" transform="rotate(-90, ${svgWidth - 5}, ${10 + triangleHeight/2})">Height = ${height} units</text>`;
  
  svg += '</svg>';
  return svg;
}

function generateCubeSVG(side: number): string {
  const scaleFactor = 10;
  const size = side * scaleFactor;
  const offset = side * 3;
  
  let svg = `<svg width="${size + offset}" height="${size + offset}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size + offset} ${size + offset}">`;
  
  // Draw a simple cube isometric projection
  svg += `<polygon points="${offset},0 ${size + offset},0 ${size},${offset} 0,${offset}" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>`;
  svg += `<polygon points="0,${offset} ${size},${offset} ${size},${size + offset} 0,${size + offset}" fill="#d1d5db" stroke="#64748b" stroke-width="2"/>`;
  svg += `<polygon points="${size},${offset} ${size + offset},0 ${size + offset},${size} ${size},${size + offset}" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>`;
  
  // Add dimension
  svg += `<text x="${size/2}" y="${size + offset + 15}" text-anchor="middle" font-size="12">Side length = ${side} units</text>`;
  
  svg += '</svg>';
  return svg;
}

// Greatest Common Divisor (for fraction simplification)
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Generate algebra problems
const generateAlgebraProblems = (grade: string, count: number, difficulty: string): Question[] => {
  const questions: Question[] = [];
  
  if (Number(grade) < 6) {
    // For lower grades, generate simpler pre-algebra problems
    for (let i = 0; i < count; i++) {
      const a = randomInt(1, 10);
      const b = randomInt(1, 20);
      const c = a * randomInt(1, 5);
      
      questions.push({
        question: `Find the value of x: ${a} × x = ${c}`,
        answer: `x = ${c / a}`,
        explanation: `Divide both sides by ${a} to get x = ${c / a}`
      });
    }
  } else {
    // For higher grades, generate more complex algebra problems
    for (let i = 0; i < count; i++) {
      let question, answer;
      
      const type = randomInt(1, 4);
      
      switch(type) {
        case 1:
          // Linear equation: ax + b = c
          const a = randomInt(2, 10);
          const b = randomInt(1, 20);
          const x = randomInt(-10, 10);
          const c = a * x + b;
          
          question = `Solve for x: ${a}x + ${b} = ${c}`;
          answer = `x = ${x}`;
          break;
          
        case 2:
          // Two-step equation: ax + b = c
          const a2 = randomInt(2, 5);
          const b2 = randomInt(5, 15);
          const x2 = randomInt(-5, 5);
          const c2 = a2 * x2 + b2;
          
          question = `Solve for x: ${a2}x + ${b2} = ${c2}`;
          answer = `x = ${x2}`;
          break;
          
        case 3:
          // System of equations (simplified for worksheet)
          question = "Solve the system:\nx + y = 5\n2x - y = 1";
          answer = "x = 2, y = 3";
          break;
          
        case 4:
          // Quadratic equation (simplified for worksheet)
          question = "Solve: x² - 5x + 6 = 0";
          answer = "x = 2 or x = 3";
          break;
      }
      
      questions.push({
        question,
        answer,
        explanation: "Apply algebraic principles to solve for the unknown variable."
      });
    }
  }
  
  return questions;
};

// Generate math worksheet based on options
export const generateMathWorksheet = (
  options: MathGenerationOptions, 
  title: string, 
  instructions: string,
  specialMessage?: string
): GeneratedWorksheet => {
  const { grade, topics, difficulty, questionCount, includeGeometricShapes, include3dFigures, copyright } = options;
  let questions: Question[] = [];
  
  // Calculate questions per topic
  const topicsCount = topics.length;
  const questionsPerTopic = Math.floor(questionCount / topicsCount);
  let remainingQuestions = questionCount - (questionsPerTopic * topicsCount);
  
  // Generate questions for each selected topic
  for (const topic of topics) {
    const topicQuestionCount = questionsPerTopic + (remainingQuestions > 0 ? 1 : 0);
    if (remainingQuestions > 0) remainingQuestions--;
    
    switch (topic) {
      case 'addition':
        questions = [...questions, ...generateAdditionProblems(grade, topicQuestionCount, difficulty)];
        break;
      case 'subtraction':
        questions = [...questions, ...generateSubtractionProblems(grade, topicQuestionCount, difficulty)];
        break;
      case 'multiplication':
        questions = [...questions, ...generateMultiplicationProblems(grade, topicQuestionCount, difficulty)];
        break;
      case 'division':
        questions = [...questions, ...generateDivisionProblems(grade, topicQuestionCount, difficulty)];
        break;
      case 'fractions':
        questions = [...questions, ...generateFractionProblems(grade, topicQuestionCount, difficulty)];
        break;
      case 'geometry':
        questions = [...questions, ...generateGeometryProblems(grade, topicQuestionCount, difficulty, includeGeometricShapes, include3dFigures)];
        break;
      case 'algebra':
      case 'pre_algebra':
      case 'expressions':
        questions = [...questions, ...generateAlgebraProblems(grade, topicQuestionCount, difficulty)];
        break;
      // Add more topics as needed
    }
  }
  
  // Shuffle questions if mixed difficulty or topics
  if (topics.length > 1 || difficulty === 'mixed') {
    questions = shuffleArray(questions);
  }
  
  // Create answer key
  const answerKey: { [key: number]: string } = {};
  questions.forEach((q, index) => {
    answerKey[index + 1] = q.answer;
  });
  
  return {
    title,
    instructions,
    specialMessage,
    questions,
    answerKey,
    grade,
    subject: 'Mathematics',
    copyright: copyright || `© ${new Date().getFullYear()} Memora Learning. All rights reserved.`
  };
};

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default {
  generateMathWorksheet
};
