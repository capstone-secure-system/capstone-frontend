import React,{useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import '../css/LogTable.css';
import SnapShotDetail from '../modal/SnapShotDetail';
import axios from 'axios';
import TableHead from './TableHead';
import io from 'socket.io-client';

const LogTable = () => {
    const itemsPerPage = 8;
    const [currentPage,setCurrentPage] = useState(0);
    const [log,setLog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentItems,setCurrentItems] = useState([]);

    const [logs,setLogs] = useState([]);
    const [pageCount,setPageCount] = useState(0);

    const fetchLogs = async () => {
        try {
            const response = await axios.get("http://13.209.176.7:3000/fallen");
            setLogs(response.data);
            setPageCount(Math.ceil(response.data.length/itemsPerPage));
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    }

    useEffect(() => {
        fetchLogs();
    },[]);

    useEffect(() => {
        if (Array.isArray(logs)) {
            const newCurrentItems = logs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            setCurrentItems(newCurrentItems);
        }
    },[logs,currentPage]);

    useEffect(() => {
        const socket = io('http://13.209.176.7:5050');

        socket.on('data',newData => {
            setLogs(newData);
        });

        return () => socket.disconnect();
    },[]);

    const handleShowModal = (log) => {
        setLog(log);
        setShowModal(true);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    }

    return (
        <div>
        <table className="log-table">
            <TableHead />
            <tbody>
                {
                    currentItems.map((log,index) => (
                        <tr key={index}>
                            <td>{log.snapshotId}</td>
                            <td>{log.label}</td>
                            <td>{formatDate(log.createdAt)}</td>
                            <td>{log.detectedNum}</td>
                            <td>
                                <button onClick = {() => handleShowModal(log)}>상세보기</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

            {showModal && (
                <SnapShotDetail log={log} showModal={showModal} setShowModal = {setShowModal}/>
            )}
        </table>
        <div className='pagination-container'>
        <ReactPaginate
                previousLabel={'이전'}
                nextLabel={'다음'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
        />
        </div>
        </div>
    );
}

export default LogTable;