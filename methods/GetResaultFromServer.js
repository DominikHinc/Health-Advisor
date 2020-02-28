import { APIKEY } from "../constants/APIKEY";

export const getResaultFromServer = async (form) => {
    let response;
    let readableResponse;

    try {
        response = await fetch(`https://getguidelines.com/all?age=${form.age}&sex=${form.sex ? 'm' : 'f'}&kg=${form.weight}&m=${form.height / 100}&dbp=${form.dbp}&sbp=${form.sbp}&api_token=${APIKEY}`);
    } catch (error) {
        return {success:false};
    }
    try {
        readableResponse = await response.json();
    } catch (error) {
        return {success:false};
    }

    ///console.log(readableResponse)
    if (readableResponse.meta.status === 'success') {
        return {success:true,response:readableResponse.data}
    }
}
