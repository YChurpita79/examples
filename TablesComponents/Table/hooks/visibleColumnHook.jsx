/* eslint-disable max-len */

import Checkbox from "view/components/DataEntry/Checkbox/Checkbox";
import MainCheckbox from "view/components/DataDisplay/TablesComponents/Table/components/MainCheckbox/MainCheckbox";
import { isEmpty } from "lodash";
import React from "react";

const visibleColumnHook = ({ tableConfig }) => {
  const {
    isSelectable,
    isShowAllSelectCheckbox,
    inverseSelect,
    mainCheckboxActions,
    setCellSelectProps = () => {},
  } = tableConfig;

  return (hooks) =>
    hooks.visibleColumns.push((columns) => {
      const selectionColumn = [];

      if (isSelectable)
        selectionColumn.push({
          id: "selection",
          disableSortBy: true,

          Header: (props) => {
            let headerChecked = false;
            let headerIsSelective;

            const {
              getToggleAllRowsSelectedProps,
              state: { isAllSelected, isMainCheckboxSelective },
            } = props;
            const { onChange, indeterminate, checked } = getToggleAllRowsSelectedProps();

            if (inverseSelect) {
              headerChecked = !isMainCheckboxSelective && !!isAllSelected;
              headerIsSelective = isMainCheckboxSelective;
            } else {
              headerChecked = checked;
              headerIsSelective = indeterminate;
            }

            if (isShowAllSelectCheckbox) {
              if (!mainCheckboxActions) {
                return (
                  <Checkbox
                    isChecked={headerChecked}
                    isSelective={headerIsSelective}
                    onChange={onChange}
                  />
                );
              }
              if (mainCheckboxActions) {
                return (
                  <MainCheckbox
                    mainCheckboxActions={mainCheckboxActions}
                    checkBoxComponent={
                      <Checkbox
                        isChecked={headerChecked}
                        isSelective={headerIsSelective}
                        onChange={onChange}
                      />
                    }
                  />
                );
              }
            } else {
              return <></>;
            }
          },
          Cell: (props) => {
            const {
              row,
              state: { isAllSelected },
            } = props;

            const selectProps = setCellSelectProps({ row }) || {};
            const canBeSelected = !isEmpty(selectProps) ? selectProps.canBeSelected : true;
            const { checked, onChange } = row.getToggleRowSelectedProps();

            return (
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  disabled={!canBeSelected}
                  isChecked={inverseSelect && isAllSelected ? !checked : checked}
                  onChange={(e) => {
                    if (inverseSelect && isAllSelected) {
                      e.target.checked = !e.target.checked;
                      return onChange(e);
                    }
                    onChange(e);
                  }}
                />
              </div>
            );
          },
        });

      return [...selectionColumn, ...columns];
    });
};

export default visibleColumnHook;
