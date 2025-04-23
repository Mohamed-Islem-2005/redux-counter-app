import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="text-5xl font-bold mb-8">Counter</div>
      
      <p className="text-6xl font-semibold">{count}</p>
      
      <div className="flex space-x-4 mt-6">
        <button
          className="w-24 h-24 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition duration-300"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="w-24 h-24 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition duration-300"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>

      <div className="mt-6">
        <button
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full mb-4"
          onClick={resetAll}
        >
          Reset All
        </button>

        <div className="flex items-center">
          <input
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
            className="w-32 p-2 border-2 border-gray-300 rounded-lg mr-4 text-xl text-center"
            placeholder="Enter Amount"
          />
          <button
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition duration-300"
            onClick={() => dispatch(incrementByAmount(addValue))}
          >
            Add Amount
          </button>
        </div>
      </div>
    </section>
  );
};

export default Counter;
