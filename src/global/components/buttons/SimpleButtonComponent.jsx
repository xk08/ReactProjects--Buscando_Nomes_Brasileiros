function SimpleButtonComponent(props) {
    return <button onClick={props.fn}>{props.label}</button>
}
export default SimpleButtonComponent;