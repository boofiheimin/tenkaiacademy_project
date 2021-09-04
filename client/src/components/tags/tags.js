import { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Tabs, Tab, AppBar } from "@material-ui/core";
import TagsPanel from "./tagPanel/tagsPanel";

import useStyles from "./styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const Tags = ({ tags, ...props }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Video Tags" {...a11yProps(0)} />
          <Tab label="Clip Tags" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TagsPanel
          {...props}
          tags={tags.filter((tag) => !tag.isClip)}
          isClip={false}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TagsPanel {...props} tags={tags.filter((tag) => tag.isClip)} isClip />
      </TabPanel>
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
