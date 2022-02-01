import React from 'react';
import { Link } from 'react-router-dom';

function ErrorMessage() {
  return (
    <>
     <h3 style={{height:'100vh',paddingTop:'200px',margin:0}}>Произошла ошибка: перейти на <Link to="/">главную страницу</Link></h3>
    </>
  )
}

export default ErrorMessage;
