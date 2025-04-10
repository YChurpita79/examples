import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./SelectedAllMobileRow.module.less";
import Button from "view/components/Buttons/Button/Button";
const SelectAllMobileRow = ({ tableConfig: { classes = {} }, toggleAllRowsSelected }) => {
  const { selectedAllMobileRowWrapper = "" } = classes;

  return (
    <div className={cn(styles.mobileRowWrapper, selectedAllMobileRowWrapper)}>
      <Button
        color="primary"
        onClick={() => {
          toggleAllRowsSelected();
        }}
        fullWidth={true}
      >
        Select Fields
      </Button>
    </div>
  );
};

SelectAllMobileRow.propTypes = {
  toggleAllRowsSelected: PropTypes.func,
  classes: PropTypes.object,
};
export default SelectAllMobileRow;
