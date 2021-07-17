import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getStream } from "../../actions/StreamsActions";

import StreamEdit from "../../components/StreamEdit/StreamEdit";

const StreamEditContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stream } = useSelector((state) => state.streams);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getStream(id));
  }, [dispatch, id]);

  const goBack = () => {
    navigate(`/streams/${id}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return <StreamEdit stream={stream} goBack={goBack} onSubmit={onSubmit} />;
};

export default StreamEditContainer;
