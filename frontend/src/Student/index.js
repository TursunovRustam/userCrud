import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Rodal from "rodal";
import axios from "axios";
function Index() {
    const [vis, setVis] = useState(false)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState()
    const [a, setA] = useState([])
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
            setA(res.data)
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
            })
        }
    }

    function toggle() {
        setVis(p => !p)
        setFirstname("")
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
        <div>
            <Rodal visible={vis} onClose={toggle}>
                    <input placeholder={"firstname"} value={firstname} onChange={e => setFirstname(e.target.value)}
                           className={"form-control w-100 my-2"} type="text"/>
                    <input placeholder={"lastname"} value={lastname} onChange={e => setLastname(e.target.value)}
                           className={"form-control w-100 my-2"} type="text"/>
                    <input placeholder={"age"} value={age} onChange={e => setAge(e.target.value)}
                           className={"form-control my-2 w-100"} type="text"/>
                <button className={"btn btn-outline-primary w-100 mb-1"} onClick={addUser}>Add user</button>
            </Rodal>
            <button onClick={toggle} className={"btn btn-outline-primary float-end"}>Add user</button>
            <div className={"d-flex flex-wrap gap-2"}>{
                a.map(item => <div className={"card col-3 my-2"}>
                    <div className="card-header">
                        <button onClick={() => deleteStudent(item.id)} className={"btn btn-dark w-25"}>delete</button>
                        <button onClick={() => editStudent(item)} className={"btn btn-dark w-25"}>edit</button>
                        {item.firstName}
                    </div>
                    <div className="card-footer">{item.lastName}</div>
                </div>)
            }</div>
        </div>
    );
}

export default Index;