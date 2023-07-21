import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Rodal from "rodal";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Index() {
    const [vis, setVis] = useState(false)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState()
    const [users, setUsers] = useState([])
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [age, setAge] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        getStudents()
    }, [])
    function getStudents(){
        axios({
            url:"http://localhost:8080/api/user",
            method:"GET"
        }).then((res)=>{
            setUsers(res.data)
        })
    }
    function addUser() {
        if (edit) {
            axios({
                url: "http://localhost:8080/api/user/edit/"+id,
                method: "PUT",
                data: {
                    firstName: firstname,
                    lastName: lastname,
                    age
                }
            }).then((res) => {
                getStudents()
                setEdit(false)
                toggle()
                toast.warn("successfully edited!")
            })
        } else {
            axios({
                url: "http://localhost:8080/api/user",
                method: "POST",
                data: {
                    firstName: firstname,
                    lastName: lastname,
                    age
                }
            }).then((res) => {
                toggle();
                getStudents()
                toast.success("successfully added!")
            })
        }
    }

    function toggle() {
        setVis(p => !p)
        setFirstname("")
        setAge("")
        setLastname("")
    }

    function deleteStudent(id) {
        axios({
            url: "http://localhost:8080/api/user/" + id,
            method: "delete"
        }).then(() => {
           getStudents()
        })
    }

    function editStudent(item) {
        setEdit(true)
        toggle()
        setId(item.id)
        setFirstname(item.firstName)
        setLastname(item.lastName)
        setAge(item.age)
    }
    return (
        <div className={"container"}>
            <div className={"d-flex justify-content-center my-2"}>
                <button onClick={toggle} className={"btn btn-outline-primary"}>➕</button>
            </div>
            <div className={"d-flex flex-wrap gap-2"} style={{flexWrap:"wrap"}}>{
                users.map(item => <div className={"card col-3 my-2"}>
                    <div className="card-header d-flex flex-column align-items-center">
                        <b><i>firstname: {item.firstName}</i></b><br/>
                        <b><i>lastname: {item.lastName}</i></b>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <button onClick={() => deleteStudent(item.id)} className={"btn btn-outline-danger"}>❌</button>
                        <button onClick={() => editStudent(item)} className={"btn btn-outline-warning "}>✏️</button>
                    </div>
                </div>)
            }</div>
            <ToastContainer/>
            <Rodal visible={vis} onClose={toggle}>
                <input placeholder={"firstname"} value={firstname} onChange={e => setFirstname(e.target.value)}
                       className={"form-control w-100 my-2"} type="text"/>
                <input placeholder={"lastname"} value={lastname} onChange={e => setLastname(e.target.value)}
                       className={"form-control w-100 my-2"} type="text"/>
                <input placeholder={"age"} value={age} onChange={e => setAge(e.target.value)}
                       className={"form-control my-2 w-100"} type="text"/>
                <button className={"btn btn-outline-warning w-100 mb-1"} onClick={addUser}>Add user</button>
            </Rodal>
        </div>
    );
}

export default Index;