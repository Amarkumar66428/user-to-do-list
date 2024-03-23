import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(0 0 0 / 75%)',
    },
};

const UserDetails = ({ open, setOpen, id }) => {

    const [userData, setUserData] = useState([])

    function closeModal() {
        setOpen(false);
        setUserData([])
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                console.log('data: ', data);
                setUserData(data)
            } catch (error) {
                console.log('error: ', error);
            }
        }
        fetchData();
    }, [id])

    return (
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            style={customStyles}
            appElement={document.getElementById('root')}
        >
            <div className="card shadow">
                <div className="close-btn">
                    <button className="button" onClick={closeModal}>
                        <span className="X"></span>
                        <span className="Y"></span>
                        <div className="close">Close</div>
                    </button>
                </div>
                <div className="card-body">
                    <h2>User Details</h2>
                    <ul>
                        <li>Name: {userData?.name}</li>
                        <li>Username: {userData?.username}</li>
                        <li>Email: {userData?.email}</li>
                        <li>Phone: {userData?.phone}</li>
                        <li>Website: {userData?.website}</li>
                        <li>Company: {userData?.company?.name}</li>
                        <li>Address: {userData?.address?.city}</li>
                    </ul>
                </div>
            </div>
        </Modal>
    )
}

export default UserDetails
