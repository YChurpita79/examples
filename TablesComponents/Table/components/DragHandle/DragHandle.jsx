/* eslint-disable max-len */
import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./DragGandle.module.less";
import { DraggableIcon } from "icons";
const DragHandle = (props) => {
  const { isSelectable } = props;
  return (
    <div className={cn(styles.HandleWrapper, { [styles.selectable]: isSelectable })} {...props}>
      <DraggableIcon />
    </div>
  );
};

DragHandle.propTypes = {
  isSelectable: PropTypes.bool,
};
export default DragHandle;
