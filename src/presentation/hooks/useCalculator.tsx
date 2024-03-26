import { useRef, useState, useEffect } from 'react';

enum Operator {
  add = '+',
  substract = '-',
  multiply = 'x',
  divide = '÷'
}



export const useCalculator = () => {

  const [formula, setFormula] = useState('')
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');
  const lasOperation = useRef<Operator>();

  useEffect(() => {
    if (lasOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lasOperation.current} ${number}`)
    } else {
      setFormula(number)
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPreviousNumber(`${subResult}`)
  }, [formula]);
  
  
  // reset to cero 
  const clean = () => {
   setNumber('0');
   setPreviousNumber('0');
   lasOperation.current = undefined;
   setFormula('0')
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
    calculateResult();
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

    const result = calculateSubResult();
    setFormula(`${result}`);
    lasOperation.current = undefined;
    setPreviousNumber('0')

  }

  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValue] = formula.split(' ')
    const num1 = Number(firstValue);
    const num2 = Number(secondValue);
    if(isNaN(num2)) return num1

    switch (lasOperation.current) {
     case Operator.add:
       return num1 + num2;
     case Operator.substract:
       return num1-num2;
     case Operator.multiply:
       return num1 * num2;
     case Operator.divide:
       return num1/num2;
     default: throw new Error('Operation not found')
    }
  }
  
  
  return {
    // Props
    number,
    previousNumber,
    formula,
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