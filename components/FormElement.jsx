export function FormElement({label, id, type, errors = null, handleChange, options = null, optionsDisabled, accept = null, value, min=null, step=null, disabled, full=false}){
    return(
        <div className={`flex flex-col ${(!full) && 'sm:w-9/12'} w-full`}>
        <label className="font-bold text-lg" htmlFor={id}>{label}:</label>
        {
            (options === null)
            ?
                (type === "textarea")
                ?
                    <textarea className={`p-2 m-2 border rounded-lg border-black ${(disabled && "bg-slate-300")} ${(errors) && "border-red-600"}`} onChange={handleChange} id={id} type={type} name={id} accept={accept} defaultValue={value} disabled={disabled} min={min}/>
                :
                    <input className={`p-2 m-2 border rounded-lg ${(disabled && "bg-slate-300")} ${(type !== "file") ? "h-8 border-black" : "cursor-pointer border-gray-100"} ${(errors) && "border-red-600"}`} onChange={handleChange} id={id} type={type} name={id} accept={accept} defaultValue={(value) && value} disabled={disabled} step={step} min={min}/>
            :
                (type === "select")
                ?
                    <select className={`p-2 m-2 bg-gray-100 ${(disabled && "bg-slate-300")}`} onChange={handleChange} id={id} defaultValue={value} disabled={disabled}>
                    {
                        options.map( option => {
                            return <option key={option} defaultValue={option}>{option}</option>
                        })
                    }
                    </select>
                :
                    <>
                        {
                            options.map( (option, index) => {
                                return (
                                    <div key={option} className="flex items-center">
                                        <input onChange={handleChange} type={type} name={id} id={option} disabled={(optionsDisabled && optionsDisabled[index])} defaultValue={option} checked={((value !== null) ? value.includes(option) : null)}/> 
                                        <label className="ml-2 cursor-pointer" htmlFor={option}>{option}</label>
                                    </div>
                                )
                            })
                        }                        
                    </>
        }
        {(errors) && <p><small className="text-red-600">{errors[0]}</small></p>}
        </div>
    )
}