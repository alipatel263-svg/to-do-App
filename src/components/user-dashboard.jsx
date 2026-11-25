import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToShare } from "../slicers/share-slicer";
import { store } from "../store/store";

export function UserDashboard() {

    let dispatch = useDispatch();

    function handleSharedClick(appointment){
        alert('Appointment Shared');
        dispatch(AddToShare(appointment));
    }

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);

    const formik_add = useFormik({
        initialValues: {
            title: '',
            description:'',
            date: new Date(),
            user_id: cookies['userid']
        },
        onSubmit: (appointment)=>{
            axios.post('http://localhost:3000/appointments', appointment)
            .then(()=>{
                LoadAppointments();
            })

        }
    })




    const [appointments, setAppointments] = useState([{ title: '', description: '', date: '', user_id: '' }]);
    const [editFormData, setEditFormData] = useState({id:'', title: '', description: '', date: '', user_id: '' });
    const [deleteFormData, setDeleteFormData] = useState({id:'', title: '', description: '', date: '', user_id: '' });
    const [searchString, setSearchString] = useState('');
    
    
    const formik_edit = useFormik({
        initialValues:{
        id: editFormData.id,   
        title: editFormData.title,
        description: editFormData.description,
        date: editFormData.date,
        user_id: editFormData.user_id
     }, 
        onSubmit: (appointment)=>{
            axios.put(`http://localhost:3000/appointments/${appointment.id}`,appointment)
            .then(()=>{
                LoadAppointments();
            })
        }, 
        enableReinitialize:true
    })

    let navigate = useNavigate();

    function handleSignout() {
        removeCookie('userid');
        navigate('/');
    }

    const LoadAppoinments = useCallback(()=>{
        axios.get(`http://localhost:3000/appointments`)
            .then(response => {
                var filteredAppointments = response.data.filter(appointment => appointment.user_id===cookies['userid'])
                setAppointments(filteredAppointments);
            })
    },[cookies])   

    useEffect(() => {
        LoadAppoinments();
    }, [])

    const handleEditClick = useCallback((id)=>{
         axios.get(`http://localhost:3000/appointments/${id}`)
        .then(response=>{
            setEditFormData(response.data);
        })
    })

    const handleDeleteClick = useCallback((id)=>{
         axios.get(`http://localhost:3000/appointments/${id}`)
        .then(response=>{
            setDeleteFormData(response.data);
            
        })
    })

    function ConfirmDelete(id){
        axios.delete(`http://localhost:3000/appointments/${id}`)
        .then(()=>{
            LoadAppoinments();
        })
    }

    const filteredAppointments = useMemo(()=>{
         return appointments.filter(appointment => appointment.title.toLowerCase().includes(searchString.toLowerCase()));
    },[searchString, appointments])

   const handleSearchChange = useCallback((e)=>{
        setSearchString(e.target.value);
   })

    return (
        <div className="row p-3" >
            <div className="col-2 bg-light" style={{ height: '600px' }}>
                <div className="fs-3 fw-bold  text-primary">Workspace</div>
                <div className="mb-2 mt-2" >
                    <span className="bi bi-person-fill fs-5 text-primary">{cookies["userid"]}</span>
                    <button onClick={handleSignout} className="btn btn-link text-danger fs-6">signout</button>
                </div>
                <div className="mt-4">
                    <Link className="bi bi-pencil-square text-decoration-none" >Appointments</Link>
                </div>
                <div className="mt-4">
                    <Link className="bi bi-calendar-date text-decoration-none" >Calendar</Link>
                </div>
            </div>
            <div className="col-10 ">
                <div className="d-flex p-2 justify-content-between">
                    <div>
                        <div className="input-group">
                            <input type="text" onChange={handleSearchChange} placeholder="search appointments" className="form-control" />
                            <button className="btn btn-warning bi bi-search"></button>
                        </div>
                    </div>
                    <div >
                        <button data-bs-toggle="offcanvas" data-bs-target="#shared" className="bi bi-share btn btn-warning mx-2 position-relative"> Shared<span className="badge bg-danger rounded rounded-circle position-absolute">{store.getState().sharedAppointmentsCount}</span></button>
                        <div className="offcanvas offcanvas-end " id="shared">
                            <div className="offcanvas-header">
                                <h3>Shared Appointments</h3>
                                <button  className="btn btn-close" data-bs-dismiss="offcanvas"></button>
                            </div>
                            <div className="offcanvas-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>User</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            store.getState().sharedAppointments.map(appointment=><tr key={appointment.id}>
                                                <td>{appointment.title}</td>
                                                <td>{appointment.user_id}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <button data-bs-toggle="modal" data-bs-target="#addNew" className="btn btn-primary bi bi-plus-circle">New Appointment</button>
                        <div className="modal fade" id="addNew">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <form onSubmit={formik_add.handleSubmit}>
                                        <div className="modal-header">
                                            <h3>Add New Appointment</h3>
                                        </div>
                                        <div className="modal-body">
                                            <dl>
                                                <dt>Title</dt>
                                                <dd><input type="text" name="title" onChange={formik_add.handleChange} className="form-control" /></dd>
                                                <dt>Description</dt>
                                                <dd>
                                                    <textarea rows={4} cols={40} name="description" onChange={formik_add.handleChange} className="form-control"></textarea>
                                                </dd>
                                                <dt>Date</dt>
                                                <dd>
                                                    <input type="date" name="date" onChange={formik_add.handleChange} className="form-control" />
                                                </dd>
                                            </dl>
                                        </div>
                                        <div className="modal-footer">
                                            <button data-bs-dismiss="modal" className="btn btn-primary">Add</button>
                                            <button data-bs-dismiss="modal" className="btn btn-warning " >Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <table className="table table caption-top">
                        <caption>Your Appointments</caption>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (filteredAppointments.length===0)?
                              <tr>
                                <td colSpan={4}> No Appointments Available</td>
                              </tr>
                              :
                                filteredAppointments.map(appointment =>
                                    <tr key={appointment.title}>
                                        <td>{appointment.title}</td>
                                        <td>{appointment.description}</td>
                                        <td>{appointment.date}</td>
                                        <td>
                                            <button onClick={()=>{handleSharedClick(appointment)}} className="btn btn-dark bi bi-share"></button>
                                            <button onClick={()=>handleEditClick(appointment.id)} data-bs-toggle="modal" data-bs-target="#edit" className="btn btn-warning bi bi-pencil mx-2"></button>

                                            <div className="modal fade" id="edit">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <form onSubmit={formik_edit.handleSubmit}>
                                                            <div className="modal-header">
                                                                <h3>Edit Appointment</h3>
                                                            </div>
                                                            <div className="modal-body">
                                                                <dl>
                                                                    <dt>Title</dt>
                                                                    <dd><input type="text" name="title" onChange={formik_edit.handleChange} value={formik_edit.values.title} className="form-control" /></dd>
                                                                    <dt>Description</dt>
                                                                    <dd>
                                                                        <textarea rows={4} cols={40} name="description" onChange={formik_edit.handleChange} value={formik_edit.values.description}  className="form-control"></textarea>
                                                                    </dd>
                                                                    <dt>Date</dt>
                                                                    <dd>
                                                                        <input type="date" name="date" onChange={formik_edit.handleChange}  value={formik_edit.values.date} className="form-control" />
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button data-bs-dismiss="modal" className="btn btn-success">Save</button>
                                                                <button data-bs-dismiss="modal" className="btn btn-warning " >Cancel</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                            <button onClick={()=>handleDeleteClick(appointment.id)} data-bs-toggle="modal" data-bs-target="#delete" className="btn btn-danger bi bi-trash"></button>
                                            <div className="modal fade" id="delete">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h2>Are you sure, want to Delete</h2>
                                                        </div>
                                                        <div className="modal-body">
                                                            {deleteFormData.title}
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button onClick={()=>ConfirmDelete
                                                                (deleteFormData.id)} data-bs-dismiss="modal" className="btn btn-danger mx-2">Yes</button>
                                                            <button  data-bs-dismiss="modal" className="btn btn-warning">No</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
