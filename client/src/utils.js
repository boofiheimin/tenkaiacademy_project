/* eslint-disable import/prefer-default-export */
import { useLocation } from "react-router-dom";

export const useQuery = () => new URLSearchParams(useLocation().search);
