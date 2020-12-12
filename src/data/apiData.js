import axios from 'axios';

const baseUrl = 'https://covid19.mathdro.id/api/';

export const getdata = async () => {
    try{
        const {data} = await axios.get(baseUrl + 'daily');
        return data;
    }catch(error) {
        throw error;
    }
}

export const getPieData = async () => {
    try{
        const {data} = await axios.get(baseUrl);
        return data;
    }catch(error){
        throw error;
    }
}