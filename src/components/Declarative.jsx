import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

const Declarative = (props) => {
  return <div className="text">{ReactHtmlParser(props.content.text)}</div>;
};

Declarative.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Declarative;
