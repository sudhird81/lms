import React from 'react'
import { useContext } from 'react';
import { titleContext } from '../../App';
import AuthUser from '../../Pages/AuthUser'

const Holidaylist = () => {

const {http}= AuthUser();

const [isAdmin] = sessionStorage.getItem('superUser');


  return (
    <div>Holidaylist</div>
  )
}

export default Holidaylist