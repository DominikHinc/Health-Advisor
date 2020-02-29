import { APIKEY } from "../constants/APIKEY";

export const getResaultFromServer = async (form) => {
    let response;
    let readableResponse;
    let keysTab = [];
    let url = 'https://getguidelines.com/all?';
    let conditions = '';
    for (var item in form) {
     //console.log(item)
        switch (item) {
            case 'age':
                keysTab = [...keysTab, `age=${form.age}&`]
                break;
            case 'height':
                keysTab = [...keysTab, `m=${form.height / 100}&`]
                break;
            case 'sex':
                keysTab = [...keysTab, `sex=${form.sex ? 'm' : 'f'}&`]
                break;
            case 'weight':
                keysTab = [...keysTab, `kg=${form.weight}&`]
                break;
            case 'isSmoking':
                let packYears = form.packOfSmoking * form.yearsOfSmoking;
                keysTab = [...keysTab, `pack_years=${packYears}&`]
                break;
            case 'dbp':
                keysTab = [...keysTab, `dbp=${form.dbp}&`]
                break;
            case 'sbp':
                keysTab = [...keysTab, `sbp=${form.sbp}&`]
                break;
            case 'other':
                
                form.other.forEach((item,index)=>{
                    if(index === 0){
                        conditions += item
                    }else{
                        conditions += ','+item
                    }
                })
                break;
        }
    }
    keysTab.forEach(item =>{
        url += item;
    })
    if(conditions.length > 0){
        url += 'conditions=' + conditions
        url += `&api_token=${APIKEY}`
    }else{
        url += `api_token=${APIKEY}`
    }
    
    console.log(url)
    //`https://getguidelines.com/all?age=${form.age}&sex=${form.sex ? 'm' : 'f'}&kg=${form.weight}&m=${form.height / 100}&dbp=${form.dbp}&sbp=${form.sbp}&api_token=${APIKEY}`
    try {
        response = await fetch(url);
    } catch (error) {
        return { success: false };
    }
    try {
        readableResponse = await response.json();
    } catch (error) {
        return { success: false };
    }

    ///console.log(readableResponse)
    if (readableResponse.meta.status === 'success') {
        return { success: true, response: readableResponse.data }
    }
}
