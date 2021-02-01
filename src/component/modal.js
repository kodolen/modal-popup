import React, { useState, useEffect } from 'react';

const Modal = () => {

    const [open, setOpen] = useState(false)
    const [countries, setCountries] = useState({})

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [country, setCountry] = useState("")

    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/umpirsky/country-list/master/data/nl_NL/country.json')
            .then(res => res.json())
            .then((data) => {
                setCountries(data)
            })
    });

    function onSubmit() {
        setSubmitted(true)
    }

    return (
        <div className="modal-container">
            <span className="button" onClick={() => setOpen(open => !open)}>Press me</span>
            <div className={open ? "modal-wrapper open" : "modal-wrapper"}>
                <div className="modal">
                    <div className="close" onClick={() => setOpen(open => !open)}>X</div>
                    {submitted ?
                        <div className="after-submit">
                            <h2>Your message has been send, {name} thanks!</h2>
                            <p>We will send you an email on {email} and we will hope you have a wonderful day in {country} </p>
                            <h2>Oh.. and This was your message by the way:</h2>
                            <p>{message}</p>
                        </div>
                        :
                        <form>
                            <div className="form-group">
                                <label>Name <br></br>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Email <br></br>
                                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Your message <br></br>
                                    <textarea value={message} onChange={e => setMessage(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Your country <br></br>
                                    <select class="countries" name="country" value={country} onChange={e => setCountry(e.target.value)}>
                                        {Object.values(countries).map((value, index) => {
                                            return (
                                                <option value={value} key={index}>{value}</option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                            <input value="Submit" className="submit" onClick={() => onSubmit()} />
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default Modal;
