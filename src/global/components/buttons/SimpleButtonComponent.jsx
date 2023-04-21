function SimpleButtonComponent(props) {
    return <button
        id={props.id}
        className={props.className}
        onClick={props.fn}
        disabled={props.disabled}
        >{props.label}</button>
}
export default SimpleButtonComponent;