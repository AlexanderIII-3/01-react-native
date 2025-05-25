
import axios from '../ultis/instance'

export const handleLoginService = (data) => {
    return axios.post('api/v1/login', data)


}



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
export const getScheduleDoctorByDate = (doctorId, date) => {

    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
export const handleBooking = (data) => {

    return axios.post('/api/patient-booking-appointment', data)
}
export const fetchMedicalHistory = (param) => {

    return axios.get(`/api/v1/get-history?patientId=${param.patientId}`)


}
export const fetchHeathTracking = (patientId) => {
    return axios.get(`/api/v1/get-health-patient?patientId=${patientId}`)
}
export const handleSaveInforPatient = (data) => {

    return axios.post(`/api/save-infor-patient`, data)

}
export const fetchUserBookings = (patientId) => {
    return axios.get(`/api/v1/get-list-booking?patientId=${patientId}`)


};
export const cancelBooking = (bokingId) => {
    return axios.post(`/api/v1/cancel-booking`, { bokingId })
}
export const fetDoctorSpecialty = (router) => {

    return axios.get(`/api/v1/get-all-doctor-province?specialtyId=${router.specialtyId}&province=${router.location}`)
}
export const fetchProvinces = () => {

    return axios.get('/api/v1/get-all-province')
}
export const fetchSpecialtyById = (id) => {
    return axios.get(`/api/v1/get-specialty-by-id?id=${id}`)

}