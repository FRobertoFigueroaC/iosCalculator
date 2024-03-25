import { useRef, useState } from 'react';

enum Operator {
  add,
  substract,
  multiply,
  divide
}



export const useCalculator = () => {
  
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const lasOperation = useRef<Operator>();

  // reset to cero 
  const clean = () => {
   setNumber('0');
   setPreviousNumber('0');
  }
  // delete last number
  const deleteOperation = () => {
    if(number.length > 1){
      if(number.length === 2 && number.includes('-')) return setNumber('0')
      const newNumber = number.slice(0,-1);
      return setNumber(newNumber)
    } else return setNumber('0')
    
  }

  const toggleSign = () => {
   if (number.includes('-')) {
    return setNumber(number.replace('-',''))
   }
   setNumber(`-${number}`)
  }

  const buildNumber = (numberString: string) => {
    // Just one point 
    if (number.includes('.') && numberString === '.') return;
    if (number.startsWith('0') || number.startsWith('-0')) {
      // decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      // evaluate if there is another cero and no point 
      if(numberString === '0' && number.includes('.')){
        return setNumber(number + numberString);
      }

      // evaluate if it is different of cero, there is no point ans is the forst number
      if(numberString !== '0' && !number.includes('.')){
        return setNumber(numberString);
      }

      // Avoid 0000
      if (numberString === '0' && !number.includes('.'))return;
      return setNumber(number + numberString);
    }
   setNumber(number + numberString);
  }

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPreviousNumber(number.slice(0,-1));
    } else {
      setPreviousNumber(number)
    }
    setNumber('0');
   
  }

  // operations
  const addOperation = () => {
   setLastNumber();
   lasOperation.current = Operator.add;
  //  setNumber(`${Number(previousNumber) + Number(number)}`)
  }
  const substractOperation = () => {
   setLastNumber();
   lasOperation.current = Operator.substract;
  }
  const multiplyOperation = () => {
   setLastNumber();
   lasOperation.current = Operator.multiply;
  }
  const divideOperation = () => {
   setLastNumber();
   lasOperation.current = Operator.divide;
  }

  const calculateResult = () => {
   const num1 = Number(number);
   const num2 = Number(previousNumber);
   switch (lasOperation.current) {
    case Operator.add:
      setNumber(`${num1 + num2}`)
      break;
    case Operator.substract:
      setNumber(`${num2 - num1}`)
      break;
    case Operator.multiply:
      setNumber(`${num1 * num2}`)
      break;
    case Operator.divide:
      setNumber(`${num2/num1}`)
      break;
    default: throw new Error('Operation not found')
   }
   setPreviousNumber('0')

  }
  
  
  return {
    // Props
    number,
    previousNumber,

    // Methods
    buildNumber,
    clean,
    calculateResult,
    deleteOperation,
    toggleSign,
    addOperation,substractOperation,
    divideOperation, multiplyOperation
  }
}