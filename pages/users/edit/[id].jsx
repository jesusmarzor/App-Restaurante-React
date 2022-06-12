import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getCookie } from "cookies-next";
import showObject from "services/showObject";
import putObject from "services/putObject";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import { AuthConsumer } from "contexts/AuthContext";
import { ButtonBack } from "components/ButtonBack";
import { FormUser } from "components/FormUser";

export default function EditUser({user, response, message}){
    const {user: authUser, loginAuth} = AuthConsumer();
    const router = useRouter();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [newName, setNewName] = useState((user) && user.name);
    const [newEmail, setNewEmail] = useState((user) && user.email);
    const [newPassword, setNewPassword] = useState(null);
    const [newRole, setNewRole] = useState((user) &&user.role);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        let data = {
            name: newName,
            email: newEmail,
            password: newPassword,
        };
        if(authUser && (authUser.role === 'admin' || authUser.role === 'dueño')){
            data.role = newRole;
        }
        const token = getCookie('auth_token');
        await putObject('user', user.id, data, token)
        .then( async ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            (response) && setRoute(`/users/${user.id}`);
            if(response && authUser.id === user.id){
                await showObject('user', authUser.id, token)
                .then( ({response, user}) => {
                    (response) && loginAuth(user);
                })
            }
        })
        
    }
    useEffect( () => {
        if(!user){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/");
        }  
    },[])
    return(
        <>
            <Head><title>CRUD | Editar</title></Head>
            {(user) &&
                <>
                    <ButtonBack/>
                    <FormUser action="editar" user={{id: user.id, name: newName, email: newEmail, role: newRole, image: user.image}} handleSubmit={handleSubmit} setName={setNewName}  setEmail={setNewEmail} setPassword={setNewPassword} setRole={setNewRole} errors={errors} loading={loading}/>
                </>
            }
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}


export async function getServerSideProps({req, params}){
    const token = req.cookies.auth_token;
    let data = await showObject('user', params.id, token);
    return {
        props: data
    }
}