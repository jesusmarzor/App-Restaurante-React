import { dateObject, dateString, hourObject, hourString } from "utils/functions";
import { FormElement } from "./FormElement";
import { Button } from "./Button";
import { AuthConsumer } from "contexts/AuthContext";

export function FormReservation({action, reservation = null, handleSubmit, date, setDate, setHour, setName, setNumber, diners, setDiners, setTables, updateKeyReservation, deleteReservation, errors, loading}) {
    const {user: authUser} = AuthConsumer();
    const changeDate = (e) => {
        const newDate = e.target.value;
        setDate(dateObject(new Date(newDate)))
    }
    const changeHour = (e) => {
        setHour(hourObject(e.target.value));
    }
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changeNumber = (e) => {
        setNumber(e.target.value);
    }
    const changeDiners = (e) => {
        setDiners(e.target.value);
    }
    const changeTables = (e) => {
        setTables(e.target.value);
        
    }
    return(
        <div className="max-w-xl mx-auto">
            <h1 className="text-center font-bold text-2xl">{action} reserva</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center" method="post">
                <FormElement label="Fecha" type="date" id="date" errors={(errors) && errors.date} handleChange={changeDate} value={(reservation && reservation.date) ? dateString(reservation.date) : ((date) && dateString(date))} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Hora" id="hour" type="select" errors={(errors) && errors.hour} options={['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']} handleChange={changeHour} value={(reservation && reservation.hour) && hourString(reservation.hour)} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Nombre" id="name" type="text" errors={(errors) && errors.name} handleChange={changeName} value={(reservation) && reservation.name} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Número de teléfono" id="number" type="text" errors={(errors) && errors.number} handleChange={changeNumber} value={(reservation) && reservation.number} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Comensales" id="diners" type="number" errors={(errors) && errors.diners} handleChange={changeDiners} value={(reservation && reservation.diners) ? reservation.diners : diners} min={1} disabled={(action === "ver") ? true : false}/>
                {
                    
                    (action !== "ver") 
                    ?
                    <div className="flex items-center justify-around w-full mt-5">
                        <Button type="submit" loading={loading}>Aceptar</Button>
                    </div>
                    :
                    <>
                        <p className="py-2 my-2 text-left sm:w-9/12 w-full font-bold text-lg">Estado: <span className="font-normal">{(reservation.paid) ? "Todo pagado" : "Pendiente de pago"}</span></p>
                    </>
                }
            </form>
                {
                    (action === "ver" && authUser && authUser.role !== 'cocinero') &&
                        <div className="flex items-center justify-around w-full my-5">
                            <Button href={`/reservation/edit/${reservation.id}`} backgroundColor="bg-cyan-500">Editar</Button>
                            <Button href={`/reservation/activate/${reservation.id}`}>Activación</Button>
                            <Button onclick={() => deleteReservation(reservation.id)} backgroundColor="bg-red-500">Borrar</Button>
                        </div>
                }
        </div>
    )
}