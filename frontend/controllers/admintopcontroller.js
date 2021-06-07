import { makeRequest, onRequestFailed } from "../utilities/serviceHandler.js";
import { getHeader } from '../utilities/sessionJanitor.js';

export default function getCompanyName(){
    makeRequest('/company/get','POST',getHeader(),'{}',(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }else{
            console.log(data['companyname'])
            document.getElementById('companyname').textContent = data['companyname']
        }
    
    },()=>{alert('Serve not found')})
   
}