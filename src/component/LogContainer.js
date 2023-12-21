import React,{useEffect,useState} from 'react';
import '../css/Pagination.css';
import LogTable from './LogTable';

const LogContainer = () => {    
    return (
        <div className='log-container'>
            <LogTable />
        </div>
    )
}

export default LogContainer;