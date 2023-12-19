import React,{useEffect,useState} from 'react';
import '../css/LogTable.css'
import axios from 'axios';
import SnapShotDetail from '../modal/SnapShotDetail';

const LogContainer = () => {
    const [logs,setLogs] = useState([]);
    const [log,setLog] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = (log) => {
        setLog(log);
        setShowModal(true);
    }

    const fetchLogs = async () => {
        try {
            const response = await axios.get("http://localhost:3000/fallen");
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    }

    useEffect(() => {
        fetchLogs();
    },[]);

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
    
    return (
        <div className='log-container'>
            <table className="log-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상황</th>
                        <th>날짜</th>
                        <th>탐지된 인원</th>
                        <th>상세보기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        logs.map((log,index) => (
                            <tr key={index}>
                                <td>{log.snapShotId}</td>
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
            </table>

            {showModal && (
                <SnapShotDetail log={log} showModal={showModal} setShowModal = {setShowModal}/>
            )}
        </div>
    )
}

export default LogContainer;