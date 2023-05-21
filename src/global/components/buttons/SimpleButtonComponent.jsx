// import "./SimpleButtonComponent.module.css";

function SimpleButtonComponent({ label, id, className, fn, disabled }) {
    return <button
        id={id}
        className={className}
        onClick={fn}
        disabled={disabled}
    >{label}</button>
}
export default SimpleButtonComponent;