import blueShuriken from "../../assets/images/blue_shuriken.png";

import useStyles from "./styles";

const ShurikenSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.spinner} src={blueShuriken} alt="" />
    </div>
  );
};

export default ShurikenSpinner;
