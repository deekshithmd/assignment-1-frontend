import React, { useEffect } from "react";
import "./table.css";
import { ReactComponent as Add } from "../../assets/icons/plus.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import Down from "../../assets/icons/caret-down.svg";
import Up from "../../assets/icons/caret-up.svg";
import { useMember } from "../../contexts/context";
import { Modal } from "../Modal";
import { deleteMember } from "../../services/services";
import { useState } from "react";

export const Table = () => {
    const { memberData, setMemberData, setOpenModal, openModal } = useMember();
    const [showCompanyFilters, setShowCompanyFilters] = useState(false);
    const [showStatusFilters, setShowStatusFilters] = useState(false);
    const [companyList, setCompanyList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);

    useEffect(() => {
        const companies = memberData.reduce(
            (result, member) =>
                result?.includes(member?.company)
                    ? result
                    : [...result, member?.company],
            ["All"]
        );
        setCompanyList(companies);
    }, [memberData]);

    useEffect(() => {
        setFilteredMembers(memberData);
        const filter1 = [];
        for (let value of memberData) {
            if (
                selectedCompany.includes(value.company) ||
                selectedCompany.includes("All")
            ) {
                filter1.push(value);
            }
        }

        const filter2 = [];
        for (let value of memberData) {
            if (selectedStatus.includes(value.status)) {
                filter2.push(value);
            }
        }

        const finalFiltered = filter2?.length > 0 ? filter2 : filter1;

        finalFiltered?.length > 0
            ? setFilteredMembers(finalFiltered)
            : setFilteredMembers(memberData);
    }, [selectedCompany, selectedStatus]);

    const handleCompanySelection = (e, value) => {
        if (value === "All") {
            setSelectedCompany((prev) => [...prev, "All"]);
            e.target.checked
                ? memberData?.map((m) =>
                    setSelectedCompany((prev) => [...prev, m?.company])
                )
                : setSelectedCompany([]);
        } else if (value !== "All") {
            if (e.target.checked) {
                setSelectedCompany((prev) => [...prev, value]);
            } else {
                let filtered1 = selectedCompany,
                    filtered2 = [];
                if (selectedCompany?.includes("All")) {
                    filtered1 = selectedCompany?.filter((c) => c !== "All");
                }
                filtered2 = filtered1?.filter((c) => c !== value);
                setSelectedCompany(filtered2);
            }
        }

        // if (
        //     selectedCompany?.includes("All") &&
        //     selectedCompany?.length < companyList?.length
        // ) {
        //     setSelectedCompany(selectedCompany?.filter((c) => c !== "All"));
        // }
    };
    console.log(selectedCompany);

    const handleStatusSelection = (e, value) => {
        e.target.checked
            ? setSelectedStatus((prev) => [...prev, value])
            : setSelectedStatus(selectedStatus?.filter((s) => s !== value));
    };

    const handleDeleteMember = async (member) => {
        const data = await deleteMember(member?._id);
        setMemberData(data);
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="heading">Team Members</h1>{" "}
                <button onClick={() => setOpenModal(!openModal)}>
                    Add Member
                    <Add style={{ height: "20px", width: "20px", marginLeft: "5px" }} />
                </button>
            </div>
            <div className="filter-container">
                <div className="filter">
                    <span
                        className="filter-header"
                        onClick={() => setShowCompanyFilters(!showCompanyFilters)}
                    >
                        Company
                        {showCompanyFilters ? (
                            <img src={Up} className="icon" alt="icon" />
                        ) : (
                            <img src={Down} className="icon" alt="icon" />
                        )}
                    </span>
                    {showCompanyFilters && (
                        <div className="company-filters">
                            {companyList?.map((company, index) => (
                                <span className="filter-item" key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectedCompany?.includes(company)}
                                        onChange={(e) => handleCompanySelection(e, company)}
                                    />
                                    <span>{company}</span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="filter">
                    <span
                        className="filter-header"
                        onClick={() => setShowStatusFilters(!showStatusFilters)}
                    >
                        Status
                        {showStatusFilters ? (
                            <img src={Up} className="icon" alt="icon" />
                        ) : (
                            <img src={Down} className="icon" alt="icon" />
                        )}
                    </span>
                    {showStatusFilters && (
                        <div className="company-filters">
                            <span className="filter-item">
                                <input
                                    type="checkbox"
                                    checked={selectedStatus?.includes("Active")}
                                    onChange={(e) => handleStatusSelection(e, "Active")}
                                />
                                <span>Active</span>
                            </span>
                            <span className="filter-item">
                                <input
                                    type="checkbox"
                                    checked={selectedStatus?.includes("Closed")}
                                    onChange={(e) => handleStatusSelection(e, "Closed")}
                                />
                                <span>Closed</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="table-container">
                <div className="table-row">
                    <input
                        type="checkbox"
                        checked={selectedCompany?.includes("All")}
                        onChange={() => { }}
                    />
                    <span>Name</span>
                    <span>Company</span>
                    <span>Status</span>
                    <span>Last Updated</span>
                    <span>Notes</span>
                    <span></span>
                </div>

                {(filteredMembers?.length > 0 ? filteredMembers : memberData)?.map(
                    (data) => {
                        return (
                            <div className="table-row" key={data?._id}>
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedCompany?.includes(data?.company) ||
                                        selectedCompany?.includes("All")
                                    }
                                />
                                <span>{data?.name}</span>
                                <span>{data?.company}</span>
                                <span>{data?.status}</span>
                                <span>{data?.lastUpdated}</span>
                                <span>{data?.notes}</span>
                                <span onClick={() => handleDeleteMember(data)}>
                                    <Delete />
                                </span>
                            </div>
                        );
                    }
                )}
            </div>
            {openModal && <Modal />}
        </div>
    );
};
