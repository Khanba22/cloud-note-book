import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./StyleSheets/writingpage.css"
import Back from "./images/backbutton.png"
import Save from "./images/saveicon.png"
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'
import { HexColorPicker } from 'react-colorful'
import colorPicker from "./images/icons8-color-picker-60.png"
function WritingPage() {

    const location = useLocation()

    const data = location.state
    const navigate = useNavigate()

    const [toggle, setToggle] = useState(false)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [note, setNote] = useState({
        _id: data._id,
        username: data.username,
        title: data.title,
        content: data.content
    })
    const [colorState, setColor] = useState(` rgb(255, 0, 0)`)

    const handleTitle = (e) => {
        setNote({
            ...note,
            title: e.target.value
        })
    }

    const saveChanges = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }
        await fetch("/cloudnotebook/notes", options).then((data) => {
            data.json()
        }).then((res) => { console.log(res) })
        // console.log(data)
        // console.log(note._id)
    }



    useEffect(() => {
        const contentStateJSON = data.content
        if (contentStateJSON !== null) {
            const parsedContentState = JSON.parse(contentStateJSON);
            const newContentState = convertFromRaw(parsedContentState);
            const newEditorState = EditorState.createWithContent(newContentState);
            setEditorState(newEditorState);
        }
    }, [data.content])

    

    const customStyleMap = {
        UPPERCASE: {
            textTransform: 'uppercase',
        },
        LOWERCASE: {
            textTransform: "lowercase",
        },
        BACKGROUND: {
            backgroundColor: colorState,
            borderRadius: "0.3px",
        },
        COLOR: {
            color: colorState,
        }
    };
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
        const contentState = editorState.getCurrentContent();
        const contentStateJSON = JSON.stringify(convertToRaw(contentState));
        setNote({
            ...note,
            content: contentStateJSON,
        })
    };

    const handleBoldClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
        handleEditorChange(newEditorState);
    };

    const handleItalicClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
        handleEditorChange(newEditorState);
    };

    const handleUnderlineClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
        handleEditorChange(newEditorState);
    };

    const handleUpperCase = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'UPPERCASE');
        setEditorState(newEditorState);
    };
    const handleStrikeThrough = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH");
        handleEditorChange(newEditorState);
    }
    const toggleBackgroundColor = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, "BACKGROUND");
        handleEditorChange(newEditorState);
    }
    const toggleTextColor = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, "COLOR");
        handleEditorChange(newEditorState);
    }
    const selectColor = (color) => {
        setColor(color)
    }
    return (
        <>
            <nav>
                <div className="brand-name" style={{ position: "relative", top: "10px", margin: "10px 50px" }}><h2>C</h2><h2>loud</h2><h2>N</h2><h2>otebook</h2></div>
                <div className="nav-links">
                    <a href="/">Product</a>
                    <a href="/">Solutions</a>
                    <a href="/">Design</a>
                    <a href="/">Enterprise</a>
                </div>
            </nav>
            <div className="editor-screen">
                <div className='editor-panel'>
                    <div className="toolbar">
                        <button onClick={() => { saveChanges(); navigate(-1) }}><img src={Back} alt="" /></button>
                        <button onClick={saveChanges}><img src={Save} alt="" /></button>
                        <button onClick={handleBoldClick}><b>B</b></button>
                        <button onClick={handleItalicClick}><p><i>i</i></p></button>
                        <button onClick={handleUnderlineClick}><p style={{ textDecoration: "underline" }}>A</p></button>
                        <button onClick={handleStrikeThrough}><strike>S</strike></button>
                        <button onClick={handleUpperCase}>U</button>
                        <button onClick={toggleTextColor}><p style={{ color: colorState }}>G</p></button>
                        <button onClick={toggleBackgroundColor}><div style={{backgroundColor:colorState}} id='background-selector'><p >B</p></div></button>
                        <button onClick={() => { setToggle(!toggle) }}><img src={colorPicker} alt="" /></button>
                        {toggle ?<section className='colorPicker'> <HexColorPicker color={colorState} onChange={selectColor} /> </section>: <></>}
                    </div>
                    <div className="editor">
                        <input type="text" value={note.title} onChange={handleTitle} className="title-input" />
                        <Editor
                            editorState={editorState}
                            onChange={handleEditorChange}
                            customStyleMap={customStyleMap}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default WritingPage
