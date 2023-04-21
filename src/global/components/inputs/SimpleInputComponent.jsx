import styles from './Input.module.css'

function SimpleInputComponent(props) {
    return <div>
        <input
            type={props.type}
            id={props.id}
            className={[props.className]}
            value={props.value}
            onClick={props.fnOnClick}
            onChange={props.fnOnChange}
            onKeyUp={props.fnOnKeyUp}
            onFocus={props.fnOnFocus}
            onBlur={props.fnOnBlur}
            disabled={props.disabled}
            readOnly={props.readOnly}
            />
            <br />
            <small className={styles.small}>{props.smallDescription}</small>
    </div>
}
export default SimpleInputComponent;