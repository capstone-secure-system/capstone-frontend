import React,{useEffect,useState} from 'react';
import '../css/Pagination.css';
import axios from 'axios';
import LogTable from './LogTable';

const LogContainer = () => {
    const itemsPerPage = 8;
    const [logs,setLogs] = useState([]);
    const [pageCount,setPageCount] = useState(0);

    const fetchLogs = async () => {
        try {
            const response = await axios.get("http://localhost:3000/fallen");
            setLogs(response.data);
            setPageCount(Math.ceil(logs.length/itemsPerPage));
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    }

    useEffect(() => {
        fetchLogs();
    },[]);
    
    return (
        <div className='log-container'>
            <LogTable logs={logs} pageCount={pageCount} />
        </div>
    )
}

export default LogContainer;