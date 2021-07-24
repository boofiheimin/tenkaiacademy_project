/* eslint-disable no-underscore-dangle */
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import momentDurationFormatSetup from "moment-duration-format";
import moment from "moment";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducers from "./reducers";

import App from "./containers/App";
import "@fortawesome/fontawesome-free/js/all";

momentDurationFormatSetup(moment);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
