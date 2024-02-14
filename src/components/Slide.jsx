import React from "react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";
import MultipleChoice from "./MultipleChoice";
import TextAnswer from "./TextAnswer";
import Range from "./Range";
import Classify from "./Classify/Classify";
import UserChoice from "./UserChoice";
import DragText from "./DragText/DragText";
import OrderList from "./OrderList";
import Mnemonic from "./Mnemonic";
import Declarative from "./Declarative";
import TagIt from "./TagIt/TagIt";
import SubmitForm from "./SubmitForm";
import ModalThumbnail from "./ModalThumbnail";

const Slide = (props) => {
  const { slideId, currentSlide, content } = props;

  let displayClass = "content ";

  if (slideId === currentSlide) {
    displayClass += "shown";
  } else {
    displayClass += "hidden";
  }

  switch (content.type) {
    case "multipleChoice":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <div className="text">{ReactHtmlParser(content.text)}</div>
          <ModalThumbnail
            {...props}
            imageUrl={content.image}
            alt={content.imageAlt}
          />
          <MultipleChoice {...props} />
        </div>
      );

    case "textAnswer":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <div className="text">{ReactHtmlParser(content.text)}</div>
          <TextAnswer {...props} />
        </div>
      );

    case "range":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <div className="text">{ReactHtmlParser(content.text)}</div>
          <Range {...props} />
        </div>
      );

    case "classify":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <div className="text">{ReactHtmlParser(content.text)}</div>
          <Classify {...props} />
        </div>
      );

    case "dragText":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <div className="text">{ReactHtmlParser(content.text)}</div>
          <DragText {...props} />
        </div>
      );

    case "userChoice":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <UserChoice {...props} />
        </div>
      );

    case "orderList":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <OrderList {...props} display="shown" />
        </div>
      );

    case "mnemonic":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <Mnemonic {...props} />
        </div>
      );

    case "tagIt":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <div className="text">{ReactHtmlParser(content.text)}</div>
          <TagIt {...props} />
        </div>
      );

    case "submitForm":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <SubmitForm {...props} />
        </div>
      );

    case "declarative":
      return (
        <div className={displayClass} id={"s" + slideId}>
          <Declarative {...props} />
          <ModalThumbnail
            {...props}
            imageUrl={content.image}
            alt={content.imageAlt}
          />
        </div>
      );

    default:
      return (
        <div className={displayClass} id={"s" + slideId}>
          <p>Error</p>
        </div>
      );
  }
};

Slide.propTypes = {
  slideId: PropTypes.number.isRequired,
  currentSlide: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
};

export default Slide;
