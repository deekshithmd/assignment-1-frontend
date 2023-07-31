import React, { useState } from "react";
import "./modal.css"
import { useMember } from "../../contexts/context";
import { addMember } from "../../services/services";

export const Modal = () => {
    const { setOpenModal } = useMember()
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');
    const [notes, setNotes] = useState('')

    const handleSubmit = async () => {
        const member = {
            name,
            company,
            status,
            lastUpdated,
            notes
        }
        const res = await addMember({ member })
        console.log("respose", res)
    }
    return (
        <div className="modal-container">
            <form onSubmit={handleSubmit}>
                <div className="header"><h3>Add Members</h3><h2 onClick={() => setOpenModal(false)}>X</h2></div>
                <label for="name">Name</label>
                <input type="text" name="name" onChange={e => setName(e.target.value)} />
                <label for="company">Company</label>
                <input type="text" name="company" onChange={e => setCompany(e.target.value)} />
                <label for="status">Status</label>
                <input type="text" name="status" onChange={e => setStatus(e.target.value)} />
                <label for="last">Last Updated</label>
                <input type="text" name="last" onChange={e => setLastUpdated(e.target.value)} />
                <label for="note">Notes</label>
                <input type="text" name="note" onChange={e => setNotes(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}