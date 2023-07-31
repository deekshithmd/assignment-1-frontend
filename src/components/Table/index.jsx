import React from 'react'
import "./table.css"
import { ReactComponent as Add } from "../../assets/icons/plus.svg"
import { useMember } from '../../contexts/context'
import { Modal } from '../Modal'

export const Table = () => {
    const { memberData, setOpenModal, openModal } = useMember()
    return <div className='container'>
        <div className='header'><h1 className='heading'>Team Members</h1> <button onClick={() => setOpenModal(!openModal)}>Add Member<Add style={{ height: '20px', width: '20px' }} /></button></div>
        <table className='table'>
            <thead>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>Name</td>
                    <td>Company</td>
                    <td>Status</td>
                    <td>Last Updated</td>
                    <td>Notes</td>
                </tr>
            </thead>
            <tbody>
                {
                    memberData?.map(data => {
                        return (
                            <tr key={data?._id}>
                                <input type='checkbox' />
                                <td>{data?.name}</td>
                                <td>{data?.company}</td>
                                <td>{data?.status}</td>
                                <td>{data?.lastUpdated}</td>
                                <td>{data?.notes}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {
            openModal && <Modal />
        }
    </div>
}