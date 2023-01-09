import React from 'react';

const Sqaure = ({val, chooseSquare}) => {
     return (
          <div onClick={chooseSquare} className='drop-shadow-xl bg-slate-800 w-full flex items-center justify-center text-5xl text-cyan-600 font-extrabold font-serif cursor-pointer active:bg-cyan-700'>
               {val}
          </div>
     );
};

export default Sqaure;