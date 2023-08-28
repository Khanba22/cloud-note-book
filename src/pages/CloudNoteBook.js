import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./StyleSheets/cloudnotebook.css"
import edit from "./images/edit.png"
import cross from './images/cross.png'
import share from "./images/paper-plane.png"
import plus from "./images/plus.png"

function CloudNoteBook(props) {

    const location = useLocation()

    // Retrieved Data From The Login Page
    const userData = location.state

    const sampleData = { _id: 0, title: "", content: "" }

    const [data, setData] = useState([sampleData])
    const [nickname, setNickname] = useState("")
    const [loaded, setLoaded] = useState(false)

    const renderNotes = async () => {
        setLoaded(false)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }

        await fetch("https://cloudnotebook-2uop.onrender.com/cloudnotebook", options).then((response => response.json())).then((response) => {
            setData(response.notes)
            setNickname(response.nickname)
        })
        setLoaded(true)
    }

    const deleteNote = async (e) => {
        if (e.target.className === "iconbutton") {
            const el = e.target.parentElement
            el.className = `note close`
        } else if (e.target.className === "icon") {
            const el = e.target.parentElement.parentElement
            el.className = "note close"
        }

        const noteData = {
            username: userData.username,
            _id: e.target.alt
        }
        if (noteData._id !== undefined) {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noteData)
            }
            await fetch("https://cloudnotebook-2uop.onrender.com/cloudnotebook/delete", options).then((res) => {
                console.log(res.json())
            }).catch((err) => {
                alert(`${err.status} ${err.message}`)
            })
        }
        setLoaded(false)
        //TODO
    }

    const shareNote = async (e) => {
        console.log(e.target.alt)
        navigator.clipboard.writeText(`https://cloudnotebook-2uop.onrender.com/cloudnotebook/share?username=${userData.username}&id=${e.target.alt}`)
        alert("link Copied")
    }

    useEffect(() => {
        if (!loaded) {
            renderNotes()
        }
    })

    return (
        <><nav>
            <div className="brand-name">
                <h2>C</h2>
                <h2>loud</h2>
                <h2>N</h2>
                <h2>otebook</h2>
            </div>
            <div className="nav-links">
                <a href="/">Product</a>
                <a href="/">Solutions</a>
                <a href="/">Design</a>
                <Link to="/">Log Out</Link>
            </div>
        </nav>
            <div className="notebox">
                <h1 id='login-heading'>{`Welcome ${nickname}`}</h1>
                <div className="note-scroll">
                    <Link state={{
                        username: userData.username,
                        _id: null,
                        title: "Title",
                        content: null
                    }} style={{ fontSize: "0.6em",width:"90%" }} to="/cloudnotebook/notes"> <div className='note' id='newnote'>
                            <img src={plus} alt="" />
                            <h2>
                                <h2>Create New Note</h2>
                            </h2>
                        </div></Link>
                    {data.map(el => {
                        const prop = { username: userData.username, _id: el._id, title: el.title, content: el.content }
                        return <>
                            <div className={`note`} key={el._id}>
                                <h2>{`${el.title.substring(0, 20)} ${el.title.length > 20 ? "..." : ""}`}</h2>
                                <p></p>
                                <div className="notebook-button-box">
                                    <button className='iconbutton' onClick={deleteNote} ><img className='icon' src={cross} alt={el._id} /></button>
                                    <button className='iconbutton' ><Link state={prop} to="/cloudnotebook/notes"><img className='icon' src={edit} alt="" /></Link></button>
                                    <button className='iconbutton' alt={el._id} ><img onClick={shareNote} className='icon' src={share} alt={el._id} /></button>
                                </div>
                            </div>
                        </>
                    })
                    }
                </div>
            </div>
        </>

    )
}

export default CloudNoteBook
