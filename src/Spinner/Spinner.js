import React from 'react';
import './spinner.scss';
import { Audio ,Puff,BallTriangle,Oval} from  'react-loader-spinner'

function Spinner() {
    
  return( 
  <div className='loading'>    
   <BallTriangle color="#00BFFF" height={80} width={80} />        
  </div>
  );
}

export default Spinner;
