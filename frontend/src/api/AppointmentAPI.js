import api from '../lib/axios';

export default {
    create(data){
        return api.post('/appointments', data);
    },
    getAppointmentsByDate(date){
        return api.get(`/appointments?date=${date}`);
    }
}