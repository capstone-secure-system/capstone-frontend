import React from 'react';
import '../css/LogTable.css'

const LogContainer = () => {
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
            </table>
        </div>
    )
}

export default LogContainer;