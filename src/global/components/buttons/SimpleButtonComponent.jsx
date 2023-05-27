import { Button } from "@mui/material";

function SimpleButtonComponent({ label, id, className, fn, disabled }) {
  return (
    <Button variant="contained" id={id} className={className} onClick={fn} disabled={disabled} style={{ border: "none", outline: "none" }}>
      {label}
    </Button>
  );
}
export default SimpleButtonComponent;
