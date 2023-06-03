import { Button } from "@mui/material";

function SimpleButtonComponent({ label, id, className, fn, disabled, endIcon, colorButton, colorFont }) {
  return (
    <Button variant="contained" id={id} className={className} onClick={fn} endIcon={endIcon ? endIcon : null}
      disabled={disabled} style={{ border: "none", outline: "none", backgroundColor: colorButton, color: colorFont }}>
      {label}
    </Button>
  );
}
export default SimpleButtonComponent;
