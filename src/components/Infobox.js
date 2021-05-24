const Infobox = (props) => {


    return (
        <>
            <div
                className={`infobox ${props.active && "infobox-selected"} 
                    ${props.isActiveCases && "infoactivecases"} 
                    ${props.isRecovered && "inforecovered"}
                    ${props.isDeaths && "infodeaths"}`}
                onClick={props.onClick}>
                <p>{props.title}</p>
                <h2 style={{color: `${props.isActiveCases? "red" : props.isRecovered? "#7DD71D" : "grey"}`}}>{props.number}</h2>
                <span>Today: {props.today}</span>
            </div>
        </>
    )
}
export default Infobox;