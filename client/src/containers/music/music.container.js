import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Music from "../../components/music/music";

import {
  getMusicRecords,
  getPaginatedMusicRecords,
} from "../../actions/musicRecords.actions";

const MusicContainer = () => {
  const dispatch = useDispatch();
  const {
    paginatedData: musicRecords,
    total,
    data,
  } = useSelector((state) => state.musicRecords);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [noScuff, setNoScuff] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getPaginatedMusicRecords(search, noScuff, limit, page));
  }, [search, page, limit, noScuff]);

  useEffect(() => {
    if (musicRecords) {
      setLoading(false);
    }
  }, [musicRecords]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (text, noScuffInput) => {
    setSearch(text);
    setNoScuff(noScuffInput);
    setPage(0);
  };

  const handleAddAllToQueue = (text, noScuffInput) => {
    dispatch(getMusicRecords(text, noScuffInput));
  };

  return (
    <Music
      loading={loading}
      musicRecords={musicRecords}
      rowsPerPage={limit}
      page={page}
      recordCount={total}
      queueList={data}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSearch={handleSearchChange}
      onAddAllToQueue={handleAddAllToQueue}
    />
  );
};

export default MusicContainer;
