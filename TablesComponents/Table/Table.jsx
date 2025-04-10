/* eslint-disable max-len */
import React, { useMemo, useState, useEffect } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTable, useSortBy, useExpanded, useRowSelect, useColumnOrder } from "react-table";
import cn from "classnames";
import PropTypes from "prop-types";

import DraggableTableRow from "./components/DraggableTableRow/DraggableTableRow";
import StaticTableRow from "./components/StaticTableRow/StaticTableRow";
import HeaderCell from "./components/HeaderCell/HeaderCell";
import visibleColumnHook from "./hooks/visibleColumnHook";
import styles from "./Table.module.less";
import { useScreenSize } from "utility/hooks";
import SelectAllMobileRow from "./components/SelectAllForMobile/SelectedAllMobileRow";

const Table = ({ tableConfig }) => {
  const {
    isSelectable,
    setTableState,
    isHideHeaderRow,
    defaultSort,
    initSortBy,
    fetchData,
    columnsSetting,
    columns,
    data,
    setData,
    isShowGapBetweenRows,
    isShowRowBorder,
    classes = {},
    mobileActionsComponent,
  } = tableConfig;
  const MobileActionsComponent = mobileActionsComponent;

  const {
    tableWrapper = "",
    tableHeaderWrapper = "",
    tableHeader = "",
    tableHeaderCellWrapper = "",
    tableBody = "",
    staticTableRowWrapper = "",
  } = classes;

  const { isMobile } = useScreenSize();
  const [activeId, setActiveId] = useState();
  const [expandedRowId, setExpandedRowId] = useState(null);

  const items = useMemo(() => data?.map(({ id }) => id), [data]);
  const visibleHook = visibleColumnHook({ tableConfig });

  const defauktColumnsSetting = useMemo(
    () =>
      columns.map(({ accessor, isVisible }) => ({
        accessor,
        isVisible,
      })),
    [columns],
  );

  const filterColumns = columnsSetting ? columnsSetting : defauktColumnsSetting;

  const tableInitialState = useMemo(() => {
    let tableInitialState = {
      isAllSelected: false,
    };

    if (initSortBy) {
      tableInitialState.sortBy = [
        {
          id: initSortBy.sortBy,
          desc: initSortBy.sortDirection === "Desc",
        },
      ];
    }
    return tableInitialState;
  }, [initSortBy]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    setHiddenColumns,
    setColumnOrder,
    rows,
    state,
    toggleAllRowsSelected,
    dispatch,
    prepareRow,
  } = useTable(
    {
      initialState: tableInitialState,
      columns,
      data,
      autoResetSelectedRows: false,
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
    },
    useSortBy,
    useExpanded,
    useRowSelect,
    useColumnOrder,
    visibleHook,
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  useEffect(() => {
    if (filterColumns) {
      setColumnOrder(filterColumns.map(({ id }) => id));

      const columnVisibility = filterColumns
        .filter(({ isVisible }) => !isVisible)
        .map(({ accessor }) => accessor);

      setHiddenColumns(columnVisibility);
    }
  }, [filterColumns, setColumnOrder, setHiddenColumns]);

  const { sortBy } = state;

  useEffect(() => {
    setTableState &&
      setTableState({ state, toggleAllRowsSelected, dispatch, setExpandedRowId, expandedRowId });
  }, [state, setTableState, toggleAllRowsSelected, expandedRowId]);

  useEffect(() => {
    if (!sortBy.length) {
      fetchData([defaultSort]);
      return;
    }

    const [sorting] = sortBy;
    const sortDirection = sorting.desc ? "Desc" : "Asc";
    if (sorting.id !== initSortBy.sortBy || sortDirection !== initSortBy.sortDirection) {
      fetchData(sortBy);
    }
  }, [sortBy, fetchData, defaultSort]);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((data) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row = rows.find(({ original }) => original.id === activeId);
    prepareRow(row);
    return row;
  }, [activeId, rows, prepareRow]);

  const isHeaderRowShouldBeHidden = isHideHeaderRow ? isHideHeaderRow : isMobile;

  const isShowMobileSelectAllRow = isHeaderRowShouldBeHidden && isMobile && isSelectable;

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <table
        className={cn(styles.tableWrapper, tableWrapper, {
          [styles.showGap]: isShowGapBetweenRows,
        })}
        {...getTableProps()}
      >
        {isShowMobileSelectAllRow && (
          <thead className={styles.selectAllMobileRow}>
            <tr className={styles.selectAllMobileRow}>
              {MobileActionsComponent ? (
                <MobileActionsComponent
                  tableConfig={tableConfig}
                  toggleAllRowsSelected={toggleAllRowsSelected}
                />
              ) : (
                <SelectAllMobileRow
                  tableConfig={tableConfig}
                  toggleAllRowsSelected={toggleAllRowsSelected}
                />
              )}
            </tr>
          </thead>
        )}

        {!isHeaderRowShouldBeHidden && (
          <thead className={cn(styles.tableHeaderWrapper, tableHeaderWrapper)}>
            {headerGroups.map((headerGroup) => {
              const getRepeat = () => {
                return headerGroup?.headers
                  .map((item, index) => {
                    if (index === 0 && isSelectable) return " 20px";
                    return " 1fr";
                  })
                  .join("");
              };

              return (
                <tr
                  style={{ gridTemplateColumns: ` ${getRepeat()}` }}
                  className={cn(styles.tableHeader, tableHeader, {
                    [styles.isShowGapBetweenRows]: isShowGapBetweenRows,
                    [styles.isShowRowBorder]: isShowRowBorder,
                  })}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        className={cn(styles.tableHeaderCellWrapper, tableHeaderCellWrapper)}
                        {...column.getHeaderProps([{ ...column.getSortByToggleProps() }])}
                      >
                        <HeaderCell tableConfig={tableConfig} column={column} />
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
        )}
        <tbody
          className={cn(styles.tableBody, tableBody, { [styles.showGap]: isShowGapBetweenRows })}
          {...getTableBodyProps()}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <DraggableTableRow
                  tableConfig={tableConfig}
                  collapsedRowId={expandedRowId}
                  setCollapsedRowId={setExpandedRowId}
                  key={row.original.id}
                  row={row}
                />
              );
            })}
          </SortableContext>
        </tbody>
      </table>
      <DragOverlay>
        {activeId && (
          <table className={cn(styles.staticTableRowWrapper, staticTableRowWrapper)}>
            <tbody>
              <StaticTableRow tableConfig={tableConfig} row={selectedRow} />
            </tbody>
          </table>
        )}
      </DragOverlay>
    </DndContext>
  );
};

Table.propTypes = {
  tableConfig: PropTypes.object,
};
export default Table;
