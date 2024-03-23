import React, { useEffect, useState } from 'react'
import { LuEye } from "react-icons/lu";
import UserDetails from '../../../component/userdetailsModal';
import { CiSearch } from "react-icons/ci";
import { ImFileEmpty } from "react-icons/im";
import useApi from '../../../hooks/userdetailsApi';

const TodoList = () => {

    const [userData, setUserData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [id, setId] = useState(null);
    const { data, loading } = useApi(`https://jsonplaceholder.typicode.com/users`);

    useEffect(() => {
        if (searchData.length === 0) {
            setUserData(data)
        }
    }, [searchData, data])

    const openUserDetails = (id) => {
        console.log('id: ', id);
        setId(id)
        setOpen(true)
    }

    const pagination = (id) => {
        setPage(id)
    }

    const search = () => {
        const filteredData = userData.filter(user => user.name.toLowerCase().includes(searchData.toLowerCase()));
        setUserData(filteredData);
    }

    return (
        <section>
            {loading ? <div className="loader">
                <h4>Loading...</h4>
            </div> :
                <div className='container'>
                    <div className='todo-main'>
                        <div className="searchBar">
                            <div>
                                <div className="searchBox">
                                    <input className="searchInput" type="text" placeholder="Search by name" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                                    <button className="searchButton" onClick={search}>
                                        <CiSearch size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table_box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>City</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {userData?.length ? (
                                    userData?.map((user) => (
                                        <tbody key={user?.id}>
                                            <tr>
                                                <td>{user?.id}</td>
                                                <td>{user?.name}</td>
                                                <td>{user?.username}</td>
                                                <td>{user?.email}</td>
                                                <td>{user?.address?.city}</td>
                                                <td className="eye-action" onClick={() => openUserDetails(user?.id)}>
                                                    <LuEye size={20} color="green" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                ) : (
                                    <div className='no-data'>
                                        <ImFileEmpty size={20} color='white' />
                                        <h4>No data found</h4>
                                    </div>
                                )}
                            </table>
                        </div>
                        <div className="pagination_box">
                            <ul className="pagination">
                                <li className={page === 1 ? 'active' : ''} onClick={() => pagination(1)}>
                                    1
                                </li>
                                <li className={page === 2 ? 'active' : ''} onClick={() => pagination(2)}>
                                    2
                                </li>
                                <li className={page === 3 ? 'active' : ''} onClick={() => pagination(3)}>
                                    3
                                </li>
                                <li className={page === 4 ? 'active' : ''} onClick={() => pagination(4)}>
                                    4
                                </li>
                                <li className={page === 5 ? 'active' : ''} onClick={() => pagination(5)}>
                                    5
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
            <UserDetails open={open} setOpen={setOpen} id={id} />
        </section>
    )
}

export default TodoList
