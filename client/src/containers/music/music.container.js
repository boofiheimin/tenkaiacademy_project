import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Music from "../../components/music/music";

import { getMusicRecords } from "../../actions/musicRecords.actions";

const MusicContainer = () => {
  const dispatch = useDispatch();
  const { data: musicRecords, total } = useSelector(
    (state) => state.musicRecords
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getMusicRecords(search, limit, page));
  }, [search, page, limit]);

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

  const handleSearchChange = (text) => {
    setSearch(text);
    setPage(0);
  };

  return (
    <Music
      loading={loading}
      musicRecords={musicRecords}
      rowsPerPage={limit}
      page={page}
      recordCount={total}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSearch={handleSearchChange}
    />
  );
};

export default MusicContainer;
