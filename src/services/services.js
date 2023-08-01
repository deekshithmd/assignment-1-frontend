import axios from 'axios';

const API_ENDPOINT = "http://localhost:5000/api";

export const getMembers = async () => {
    try {
        const res = await axios.get(`${API_ENDPOINT}/`)
        return res?.data
    }
    catch (e) {
        console.log("Error white getting", e)
    }
}

export const addMember = async ({ member }) => {
    try {
        const res = await axios.post(`${API_ENDPOINT}/add`, member)
        return res.data
    }
    catch (e) {
        console.log("Error while adding", e);
    }
}

export const deleteMember = async (id) => {
    try {
        const res = await axios.delete(`${API_ENDPOINT}/delete/${id}`);
        return res.data;
    }
    catch (e) {
        console.log("Error while deleting", e)
    }
}