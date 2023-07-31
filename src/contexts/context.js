import React, { createContext, useContext, useState } from "react";
import { getMembers } from "../services/services";

const MemberContext = createContext({})

const MemberContextProvider = ({ children }) => {
    const [memberData, setMemberData] = useState([])
    const [openModal, setOpenModal] = useState(false)

    React.useEffect(() => {
        (async () => {
            const data = await getMembers();
            setMemberData(data)
        })()
    }, [])

    return (
        <MemberContext.Provider value={{ memberData, setMemberData, openModal, setOpenModal }}>
            {children}
        </MemberContext.Provider>
    )
}

const useMember = () => useContext(MemberContext)

export { useMember, MemberContextProvider }