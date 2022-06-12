export function Counter({counter,  setCounter}){
    const add1 = (e) => {
        e.preventDefault();
        setCounter( prevCounter => prevCounter+1);
    }
    const remove1 = (e) => {
        e.preventDefault();
        setCounter( prevCounter => {
            return (prevCounter > 1 ) ? prevCounter-1 : prevCounter;
        });
    }
    return (
        <div className="flex justify-center items-center my-5">
            <button onClick={remove1} className={`w-10 h-10 text-xl ${ (counter > 1) ? 'bg-slate-300' : 'bg-slate-100'} rounded-full`}>-</button>
            <span className="mx-3 text-xl">{counter}</span>
            <button onClick={add1} className="w-10 h-10 text-xl bg-slate-300 rounded-full">+</button>
        </div>
    )
}