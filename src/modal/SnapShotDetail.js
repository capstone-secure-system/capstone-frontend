import React from 'react';
import { Modal,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SnapShotDetail = ({log,showModal,setShowModal}) => {
    return (
        <div>
            <Modal show={showModal}>
                <Modal.Header>
                <Modal.Title>스냅샷 이미지</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {log.imgUrl && <img src={log.imgUrl} alt="스냅샷 이미지" style={{ maxWidth: '100%' }} />}
                </Modal.Body>
                <Modal.Footer>
                <Button className="btn_close" variant="secondary" onClick={() => setShowModal(false)}>
                    닫기
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SnapShotDetail;