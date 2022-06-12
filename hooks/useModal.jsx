import { useState } from "react";

export function useModal(){
    const [modal, setModal] = useState(false);
    const [textModal, setTextModal] = useState(null);
    const [successModal, setSuccessModal] = useState(false);
    const [route, setRoute] = useState(null);
    
    return ({modal, textModal, successModal, route, setModal, setTextModal, setSuccessModal, setRoute});
}