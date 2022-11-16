import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/material/styles";

interface ButtonLinkProps {
  text: string;
  link: string;
  sx?: SxProps;
}

const ButtonLink = (props: ButtonLinkProps) => {
  return (
    <Button component={Link} to={props.link} sx={props.sx}>
      {props.text}
    </Button>
  );
};

export { ButtonLink };
