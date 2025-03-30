
import axios from '../ultis/instance'


export const getAllDoctor = async () => {

    try {
        const res = await axios.get('api/v1/getAllDoctors')

        console.log('check data doctor', res)
    } catch (error) {
        console.log(error)
    }
}

