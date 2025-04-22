import { useState } from 'react';
import './index.css';

function App() {
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [termYears, setTermYears] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [mortgageType, setMortgageType] = useState('Repayment');
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [totalRepayment, setTotalRepayment] = useState('');

  // State to track if the fields are valid or not
  const [errors, setErrors] = useState({
    mortgageAmount: false,
    termYears: false,
    interestRate: false,
    mortgageType: false,
  });

  // Check if the fields are valid
  const validateFields = () => {
    setErrors({
      mortgageAmount: !mortgageAmount,
      termYears: !termYears,
      interestRate: !interestRate,
      mortgageType: !mortgageType,
    });
    return mortgageAmount && termYears && interestRate && mortgageType;
  };

  const calculateRepayment = () => {
    if (!validateFields()) {
      return; // Prevent calculation if any field is invalid
    }

    const principal = parseFloat(mortgageAmount);
    const years = parseFloat(termYears);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payments = years * 12;

    if (mortgageType === 'Repayment') {
      const x = Math.pow(1 + rate, payments);
      const monthly = (principal * rate * x) / (x - 1);
      setRepaymentAmount(monthly.toFixed(2));
      setTotalRepayment((monthly * payments).toFixed(2));
    } else {
      const monthly = principal * rate;
      setRepaymentAmount(monthly.toFixed(2));
      setTotalRepayment((monthly * payments + principal).toFixed(2));
    }
  };

  const clearAll = () => {
    setMortgageAmount('');
    setTermYears('');
    setInterestRate('');
    setMortgageType('Repayment');
    setRepaymentAmount('');
    setTotalRepayment('');
    setErrors({
      mortgageAmount: false,
      termYears: false,
      interestRate: false,
      mortgageType: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#E4F4FD] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="p-8 w-full md:w-1/2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Mortgage Calculator</h1>
            <button 
              onClick={clearAll}
              className="text-sm text-[#133041] hover:text-blue-900 cursor-pointer"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-1 text-gray-700'}`}>
                Mortgage Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">£</span>
                <input
                  type="number"
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
              {errors.mortgageAmount && (
                <p className="text-red-500 text-xs mt-1">This field is required</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 text-gray-700'}`}>
                Mortgage Term
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="number"
                    value={termYears}
                    onChange={(e) => setTermYears(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 pr-12"
                    placeholder=""
                    required
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">years</span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 pr-12"
                    placeholder=""
                    required
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">%</span>
                </div>
              </div>
              {(errors.termYears || errors.interestRate) && (
                <p className="text-red-500 text-xs mt-1">This field is required</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${errors.mortgageType ? 'text-red-500' : 'text-gray-700'}`}>
                Mortgage Type
              </label>
              <div className="space-x-4">
                <label className="cursor-pointer w-full">
                  <div
                    className={`flex items-center w-full py-2 px-4 rounded-md border ${
                      mortgageType === 'Repayment' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mortgageType"
                      value="Repayment"
                      checked={mortgageType === 'Repayment'}
                      onChange={(e) => setMortgageType(e.target.value)}
                      className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-[#D8DB2F] checked:border-[#D8DB2F] mr-3"
                      required
                   />
                    <span>Repayment</span>
                  </div>
                </label>
                <label className="cursor-pointer w-full">
                  <div
                    className={`flex items-center w-full py-2 px-4 rounded-md border ${
                      mortgageType === 'Interest Only' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mortgageType"
                      value="Interest Only"
                      checked={mortgageType === 'Interest Only'}
                      onChange={(e) => setMortgageType(e.target.value)}
                      className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:bg-[#D8DB2F] checked:border-[#D8DB2F] checked:ring-2 checked:ring-[#D8DB2F] mr-3"
                      required
                   />
                    <span>Interest Only</span>
                  </div>
                </label>
              </div>
              {errors.mortgageType && (
                <p className="text-red-500 text-xs mt-1">This field is required</p>
              )}
            </div>

            <button
              onClick={calculateRepayment}
              className="w-full md:w-3/5 bg-[#D8DB2F] hover:bg-[#D8DB2F] text-[#133041] py-2 px-4 rounded-full flex items-center justify-center space-x-2 cursor-pointer"
            >
              <img
                src="https://i.postimg.cc/DyBXMkZN/Vector-1.png"
                alt="Calculator Icon"
                className="h-5 w-5"
              />
              <span>Calculate Repayment</span>
            </button>
          </div>
        </div>

        <div className="bg-[#133041] text-white p-8 w-full md:w-1/2 flex flex-col rounded-bl-lg rounded-s-lg">
          {!repaymentAmount ? (
            <div className="flex flex-col items-center justify-center h-full rounded-lg overflow-hidden">
              <div
                className="bg-[url('https://i.postimg.cc/3J9XQHkp/layer.webp')] bg-cover bg-center h-48 w-full md:h-64"
              ></div>
              <div className="text-center mt-8 p-4">
                <h1 className="text-xl font-bold">Results shown here</h1>
                <p className='text-sm text-gray-300'>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-center">
              <h1 className="text-3xl font-bold mb-4">Your Results</h1>
              <p className="text-sm text-gray-300 mb-8">
                Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.
              </p>
              <div className="bg-[#1E3A5F] p-6 rounded-lg border-t-4 border-t-[#D8DB2F]">
                <p className="text-sm text-gray-300 mb-1">Your monthly repayments</p>
                <h2 className="text-5xl font-bold text-[#D8DB2F] mb-6">£{repaymentAmount}</h2>
                <div className="pt-4 border-t border-gray-600">
                  <div className="flex flex-col justify-between py-3">
                    <span className="text-sm text-gray-300">Total you'll repay over the term</span>
                    <span className="text-lg font-semibold">£{totalRepayment}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
