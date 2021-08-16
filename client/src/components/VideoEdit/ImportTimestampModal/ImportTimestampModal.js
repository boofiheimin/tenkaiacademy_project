import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  Typography,
  Button,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { hhmmssRegEx } from "../../../helper";

import useStyles from "./styles";

const koroTimeParser = (time) => {
  const hPosition = time.indexOf("h");
  const mPosition = time.indexOf("m");
  const sPosition = time.indexOf("s");
  let currentHead = 0;
  let h = 0;
  let m = 0;
  let s = 0;
  if (hPosition > 0) {
    h = time.substring(currentHead, hPosition);
    currentHead = hPosition + 1;
  }
  if (mPosition > 0) {
    m = time.substring(currentHead, mPosition);
    currentHead = mPosition + 1;
  }
  if (sPosition > 0) {
    s = time.substring(currentHead, sPosition);
    currentHead = sPosition + 1;
  }
  return parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10);
};

const ImportTimestampModal = ({ onImportTimestamp }) => {
  const classes = useStyles();
  const [openTSTimport, setOpenTSImport] = useState(false);
  const [value, setValue] = useState("");
  const [errorValidate, setErrorValidate] = useState(false);
  const [mode, setMode] = useState(false);

  const openYT = () => {
    setOpenTSImport(true);
    setMode(true);
  };

  const openKoro = () => {
    setOpenTSImport(true);
    setMode(false);
  };

  const onCloseImportTSModal = () => {
    setOpenTSImport(false);
  };

  const onTextareaChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    const raws = value.split(/\n/);
    const trimmed = raws.map((raw) => raw.trim());

    const processed = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const t of trimmed) {
      if (mode) {
        const time = t.substring(0, 8);
        const match = time.match(hhmmssRegEx);

        if (match === null) {
          setErrorValidate(true);
          return;
        }
        const desc = t.substring(9, t.length).trim();
        processed.push({
          timestamp: moment.duration(time).asSeconds(),
          description: desc,
        });
      } else {
        const desc = t.substring(0, t.lastIndexOf(" ") + 1);
        const time = t.substring(t.lastIndexOf(" ") + 1, t.length);
        console.log(desc, koroTimeParser(time));

        processed.push({
          timestamp: koroTimeParser(time),
          description: desc,
        });
      }
    }
    setErrorValidate(false);
    setValue("");
    onImportTimestamp(processed);
    setOpenTSImport(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={openYT}>
        Import YT
      </Button>
      <Button variant="outlined" onClick={openKoro}>
        Import Koro
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openTSTimport}
        onClose={onCloseImportTSModal}
      >
        <DialogTitle>
          <Typography variant="h5">Import Timestamp</Typography>
        </DialogTitle>
        <DialogContent className={classes.importTSModal}>
          <Typography>{`format per line: ${
            mode ? "00:00:00 description" : "description 0h00m00s"
          }`}</Typography>
          {errorValidate && (
            <Alert variant="filled" severity="error">
              Invalid Format
            </Alert>
          )}

          <div className={classes.textAreaContainer}>
            <TextareaAutosize
              className={classes.textarea}
              minRows={9}
              onChange={onTextareaChange}
              value={value}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onSubmit}>
            Import
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCloseImportTSModal}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ImportTimestampModal.propTypes = {
  onImportTimestamp: PropTypes.func,
};
ImportTimestampModal.defaultProps = {
  onImportTimestamp: () => {},
};

export default ImportTimestampModal;
