import React from 'react'
import { Link } from 'react-router-dom'
import "../StyleSheets/successpage.css"

function SuccessPage(props) {
    return (
        <>
            <div className="screen">
                <div className="screen__content">
                    <h1 style={{margin:"15px"}} id='success-heading'><h2>Welcome</h2><h2>{props.heading}</h2></h1>
                    <img className='image' src={"https://png.pngtree.com/png-clipart/20230304/ourmid/pngtree-green-check-mark-circle-illustrations-transparent-png-image_6629072.png"} alt="" />
                        <Link state={props.details} to={props.to} className="button success__submit button__text" >
                            <span className="button__text"><Link className="button__text" state={props.details} to={props.to}>Continue</Link></span>
                        </Link>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
      </>
    )
}

export default SuccessPage
