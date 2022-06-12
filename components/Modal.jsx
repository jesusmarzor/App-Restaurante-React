import { Button } from "components/Button";

export function Modal({success, text, setModal, router, route}) {
    const clickModal = () => {
        setModal(false);
        (route !== null) &&  router.push(route);
    }
    return (
         <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
            <div className="m-auto max-w-xl max-h-80 bg-white p-5 rounded-xl">
                <header className="text-center font-bold mb-5 text-3xl">
                    {(success) ? "Enhorabuena" : "Error"}
                </header>
                <div>
                    <p className="text-center text-gray-600 font-normal">
                        {text}
                    </p>
                </div>
                <footer className="mt-5 text-right">
                    <Button onclick={clickModal} backgroundColor={(success) ? "bg-lime-600" : "bg-red-500"}>Aceptar</Button>
                </footer>
            </div>
        </div>
    );
}