import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Music from "../../components/music/music";

import { getMusicRecords } from "../../actions/musicRecords.actions";

const MusicContainer = () => {
  const dispatch = useDispatch();
  const musicRecords = useSelector((state) => state.musicRecords);

  useEffect(() => {
    dispatch(getMusicRecords());
  }, [dispatch]);

  return <Music musicRecords={musicRecords} />;
};

export default MusicContainer;
