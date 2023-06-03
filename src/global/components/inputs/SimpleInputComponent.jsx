import styles from "./Input.module.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function SimpleInputComponent(props) {
  return (
    <>
      <TextField type={props.type} id={props.id} className={props.className} value={props.value} onClick={props.fnOnClick} onChange={props.fnOnChange} onKeyUp={props.fnOnKeyUp} onFocus={props.fnOnFocus} onBlur={props.fnOnBlur} disabled={props.disabled} readOnly={props.readOnly} label={props.label} variant={props.variant} fullWidth={props.fullWidth} margin={props.margin} />
      <br />
      <small className={styles.small}>{props.smallDescription}</small>
    </>
  );
}

export default SimpleInputComponent;
