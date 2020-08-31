import React from 'react';
import { useHistory } from "react-router-dom";
import './ForgetPassword.css'
import KeyPassword from '../KeyPassword/KeyPassword';
import {
    Link
} from "react-router-dom";

function Forgotpassword(props) {
    let history = useHistory();

    // function to send the confirmation code to email
    function onSendToMail(e) {
        e.preventDefault();

        const { sendToMailInput } = e.target.elements;
        const email  = sendToMailInput.value;
        console.log(email)
        

        fetch('/api/users/forgotPassword', {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const { success } = data;
                const { error } = data;
                const { info } = data;
                if (success) {
              
                   return(history.push(`/KeyPassword/${email}`))
                    // history.push("/KeyPassword")

                        // <KeyPassword email={email}/>
                }
                else {
                    alert(error)
                }
            });
    }


    return (
        <div className='forgotpassword'>
            <h2>Password Reset</h2>
            <form id="sendToMailForm" onSubmit={onSendToMail} >
                <input className="sendToMailInput" name="sendToMailInput" placeholder="1. enter your login Emailadress"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
    

}
export default Forgotpassword;