import React, { useState } from "react";
import "./modal.css"
import { useMember } from "../../contexts/context";
import { addMember } from "../../services/services";

export const Modal = () => {
    const { setOpenModal } = useMember()
    // const [name, setName] = useState('');
    // const [company, setCompany] = useState('');
    // const [status, setStatus] = useState('');
    // const [lastUpdated, setLastUpdated] = useState('');
    const [memberInfo, setMemberInfo] = useState({
        name: '',
        company: '',
        status: '',
        lastUpdated: '',
        notes: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const member = {
            name: memberInfo?.name,
            company: memberInfo?.company,
            status: memberInfo?.status,
            lastUpdated: memberInfo?.lastUpdated,
            notes: memberInfo?.notes
        }
        const res = await addMember({ member })
        console.log("respose", res)
    }

    const handleReset = () => {
        setMemberInfo({
            name: '',
            company: '',
            status: '',
            lastUpdated: '',
            notes: ''
        })
        setOpenModal(false)
    }
    return (
        <div className="modal-container">
            <form onSubmit={handleSubmit}>
                <div className="header"><h3>Add Members</h3><h2 onClick={() => setOpenModal(false)}>X</h2></div>
                <label for="name">Name</label>
                <input type="text" name="name" onChange={e => setMemberInfo(prev => ({ ...prev, name: e.target.value }))} />
                <label for="company">Company</label>
                <input type="text" name="company" onChange={e => setMemberInfo(prev => ({ ...prev, company: e.target.value }))} />
                <label for="status">Status</label>
                <input type="text" name="status" onChange={e => setMemberInfo(prev => ({ ...prev, status: e.target.value }))} />
                <label for="last">Last Updated</label>
                <input type="text" name="last" onChange={e => setMemberInfo(prev => ({ ...prev, lastUpdated: e.target.value }))} />
                <label for="note">Notes</label>
                <input type="text" name="note" onChange={e => setMemberInfo(prev => ({ ...prev, notes: e.target.value }))} />
                <div className="button-container"><button className="cancel" type="reset" onClick={handleReset}>Cancel</button><button type="submit">Save</button></div>
            </form>
        </div>
    )
}