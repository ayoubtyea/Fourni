import { useState } from 'react';
import './index.css';

function App() {
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [termYears, setTermYears] = useState('25');
  const [interestRate, setInterestRate] = useState('5.25');
  const [mortgageType, setMortgageType] = useState('Repayment');
  const [repaymentAmount, setRepaymentAmount] = useState('');

  const calculateRepayment = () => {
    if (mortgageAmount && termYears && interestRate) {
      const principal = parseFloat(mortgageAmount);
      const years = parseFloat(termYears);
      const rate = parseFloat(interestRate) / 100 / 12;
      const payments = years * 12;
      
      if (mortgageType === 'Repayment') {
        const x = Math.pow(1 + rate, payments);
        const monthly = (principal * rate * x) / (x - 1);
        setRepaymentAmount(monthly.toFixed(2));
      } else {
        const monthly = principal * rate;
        setRepaymentAmount(monthly.toFixed(2));
      }
    }
  };
  const clearAll = () => {
    setMortgageAmount('');
    setTermYears('25');
    setInterestRate('5.25');
    setMortgageType('Repayment');
    setRepaymentAmount('');
  };

  return (
    <div className="min-h-screen bg-[#E4F4FD] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Calculator Form Section */}
        <div className="p-8 w-full md:w-1/2">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Mortgage Calculator</h1>
            <button 
              onClick={clearAll}
              className="text-sm text-[#133041] hover:text-blue-900 cursor-pointer
"
            >
              Clear All
            </button>
          </div>
          
          
          <div className="space-y-6">
            {/* Mortgage Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mortgage Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">£</span>
                <input
                  type="number"
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Mortgage Term and Interest Rate */}
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Mortgage Term</label>
  <div className="grid grid-cols-2 gap-4">
    {/* Term Years Input */}
    <div className="relative">
      <input
        type="number"
        value={termYears}
        onChange={(e) => setTermYears(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        placeholder="25"
      />
      <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 bg-[#E4F4FD]">years</span>
    </div>

    {/* Interest Rate Input */}
    <div className="relative">
      <input
        type="number"
        step="0.01"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  pr-10"
        placeholder="5.25"
      />
      <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 bg-[#E4F4FD]">%</span>
    </div>
  </div>
</div>

            {/* Mortgage Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mortgage Type</label>
              <div className="space-x-4">
                {/* Repayment Option */}
                <label className="cursor-pointer flex items-center w-full">
                  <input
                    type="radio"
                    name="mortgageType"
                    value="Repayment"
                    checked={mortgageType === 'Repayment'}
                    onChange={(e) => setMortgageType(e.target.value)}
                    className="mr-2"
                  />
                  <div
                    className={`py-2 px-4 rounded-md border text-center ${
                      mortgageType === 'Repayment' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    Repayment
                  </div>
                </label>

                {/* Interest Only Option */}
                <label className="cursor-pointer flex items-center">
                  <input
                    type="radio"
                    name="mortgageType"
                    value="Interest Only"
                    checked={mortgageType === 'Interest Only'}
                    onChange={(e) => setMortgageType(e.target.value)}
                    className="mr-2"
                  />
                  <div
                    className={`py-2 px-4 rounded-md border text-center ${
                      mortgageType === 'Interest Only' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    Interest Only
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">Calculate Repayments</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">£</span>
                <input
                  type="text"
                  value={repaymentAmount}
                  readOnly
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <button
              onClick={calculateRepayment}
              className="w-full bg-[#D8DB2F] hover:bg-[#D8DB2F] text-[#133041] py-2 px-4 rounded-full flex items-center justify-center space-x-2 cursor-pointer
"
            >
              <span>Calculate Repayment</span>
            </button>
          </div>
        </div>

        <div className="bg-[#133041] text-white p-8 w-full md:w-1/2 flex flex-col justify-center">
          <div
            className="bg-[url('https://i.postimg.cc/3J9XQHkp/layer.webp')] bg-cover bg-center h-64 w-full rounded-bl-lg"
          ></div>

          <div className="mt-4 text-center mt-12">
            <h1 className="text-xl font-bold">Results shown here</h1>
            <p className='text-sm'>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
