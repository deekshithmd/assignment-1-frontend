import React from 'react'
import "./table.css"
import { ReactComponent as Add } from "../../assets/icons/plus.svg"
import { ReactComponent as Delete } from "../../assets/icons/delete.svg"
import { useMember } from '../../contexts/context'
import { Modal } from '../Modal'
import { deleteMember } from '../../services/services'
import { useState } from 'react'

export const Table = () => {
    const { memberData, setMemberData, setOpenModal, openModal } = useMember()
    const [showCompanyFilters,setShowCompanyFilters]=useState(false);
    const [showStatusFilters,setShowStatusFilters]=useState(false);

    const handleDeleteMember = async (member) => {
        const data = await deleteMember(member?._id);
        setMemberData(data)
    }

    return <div className='container'>
        <div className='header'><h1 className='heading'>Team Members</h1> <button onClick={() => setOpenModal(!openModal)}>Add Member<Add style={{ height: '20px', width: '20px', marginLeft: '5px' }} /></button></div>
        <div className='filter-container'><span className='filter'>Company</span><span className='filter'>Status</span></div>
        <div className='table-container'>
            <div className='table-row'>
                <input type="checkbox" />
                <span>Name</span>
                <span>Company</span>
                <span>Status</span>
                <span>Last Updated</span>
                <span>Notes</span>
                <span></span>
            </div>

            {
                memberData?.map(data => {
                    return (
                        <div className='table-row'>
                            <input type="checkbox" />
                            <span>{data?.name}</span>
                            <span>{data?.company}</span>
                            <span>{data?.status}</span>
                            <span>{data?.lastUpdated}</span>
                            <span>{data?.notes}</span>
                            <span onClick={() => handleDeleteMember(data)}><Delete /></span>
                        </div>
                    )
                })}

        </div>
        {
            openModal && <Modal />
        }
    </div>
}