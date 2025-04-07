
import axios from '../ultis/instance'


export const getAllDoctor = async () => {

    try {
        return axios.get('api/v1/getAllDoctors');


    } catch (error) {
        console.log(error)
    }
}
export const fetchAllClinic = () => {

    return axios.get('/api/v1/get-all-clinic')

}
export const fetchSpecialty = () => {

    return axios.get('/api/v1/fetch-specialty-infor')
}
export const fetchDetailDoctor = (id) => {


    return axios.get(`/api/v1/get-details-doctor?id=${id}`)
}
