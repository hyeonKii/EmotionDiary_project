import axios from "axios";
import { URL } from "./url";
import * as endpoint from "./constants/userEndpoints";
import { useMutation } from "react-query";


interface CertificateEmail {
  email: string
}

interface EmailCheck {
  email: string,
  target: string,
  code: string,

}


async function certifyEmail(userData: CertificateEmail) {
  return await axios.post(URL + endpoint.USER_EMAIL_SEND, userData);
}


async function emailCheck(userData: EmailCheck) {
  return await axios.post(URL + endpoint.USER_EMAIL_CHECK, userData);
}



export const useRequestCertifyEmail = (userData: CertificateEmail, options?:any) =>
      useMutation(() => certifyEmail(userData), options);
  

export const useRequestEmailCheck = (userData: EmailCheck, options?: any) =>
    useMutation(() => emailCheck(userData), options);