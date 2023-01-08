import React from 'react';

const Sqaure = ({val, chooseSquare}) => {
     return (
          <div onClick={chooseSquare} className='border-2 w-full flex items-center justify-center text-5xl font-serif cursor-pointer active:bg-cyan-700'>
               {val}
          </div>
     );
};

export default Sqaure;