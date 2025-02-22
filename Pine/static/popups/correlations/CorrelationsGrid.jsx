// eslint-disable-next-line no-unused-vars
import scrollbarSize from "dom-helpers/scrollbarSize";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import Select, { createFilter } from "react-select";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import MultiGrid from "react-virtualized/dist/commonjs/MultiGrid";

import { BouncerWrapper } from "../../BouncerWrapper";
import { exports as gu } from "../../dtale/gridUtils";
import { renderCodePopupAnchor } from "../CodePopup";
import CorrelationsCell from "./CorrelationsCell";

require("./CorrelationsGrid.css");

function filterData({ col1, col2 }, data) {
  let updatedData = data;
  if (!_.isNull(col1)) {
    updatedData = _.filter(data, { column: col1.value });
  }
  if (!_.isNull(col2)) {
    updatedData = _.map(updatedData, r => _.pick(r, ["column", col2.value]));
  }
  return updatedData;
}

function buildState({ correlations, columns, col1, col2 }, filter = true) {
  const state = {
    correlations: _.clone(correlations),
    columns: _.map(columns, column => ({ value: column })),
    col1: col1 ? { value: col1 } : null,
    col2: col2 ? { value: col2 } : null,
  };
  if (filter) {
    state.correlations = filterData(state, correlations);
  }
  return state;
}

class CorrelationsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = buildState(props, false);
    this._cellRenderer = this._cellRenderer.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.correlations, prevProps.correlations)) {
      this.setState(buildState(this.props));
    }
  }

  _cellRenderer(cellProps) {
    const mainProps = _.pick(this.props, [
      "hasDate",
      "selectedDate",
      "rolling",
      "useRolling",
      "window",
      "minPeriods",
      "buildTs",
      "buildScatter",
      "selectedCols",
    ]);
    const props = _.assignIn(mainProps, this.state, cellProps);
    return <CorrelationsCell {...props} />;
  }

  renderSelect(prop, otherProp) {
    const { correlations } = this.props;
    const { columns } = this.state;
    const finalOptions = _.isNull(this.state[otherProp]) ? columns : _.reject(columns, this.state[otherProp]);
    const onChange = selected => {
      const filterState = {
        [prop]: selected,
        [otherProp]: this.state[otherProp],
      };
      this.setState({
        [prop]: selected,
        correlations: filterData(filterState, correlations),
      });
    };
    return (
      <div className="input-group mr-3">
        <Select
          className="Select is-clearable is-searchable Select--single"
          classNamePrefix="Select"
          options={_.sortBy(finalOptions, o => _.toLower(o.value))}
          getOptionLabel={_.property("value")}
          getOptionValue={_.property("value")}
          value={this.state[prop]}
          onChange={onChange}
          noOptionsText={() => "No columns found"}
          isClearable
          filterOption={createFilter({ ignoreAccents: false })} // required for performance reasons!
        />
      </div>
    );
  }

  render() {
    const { correlations, columns, col1, col2 } = this.state;
    return (
      <BouncerWrapper showBouncer={_.isEmpty(this.props.correlations)}>
        <b>Correlation Matrix</b>
        <small className="pl-3">(Click on any cell to view the details of that correlation)</small>
        <AutoSizer className="correlations-grid" disableHeight>
          {({ width }) => [
            <div key={0} style={{ width }} className="row pl-5 pt-3 pb-3 correlations-filters">
              <span className="pl-3 mb-auto mt-auto">View correlation for</span>
              <div className="col-auto">{this.renderSelect("col1", "col2")}</div>
              <span className="mb-auto mt-auto">vs.</span>
              <div className="col-auto">{this.renderSelect("col2", "col1")}</div>
              <div className="col text-right">{renderCodePopupAnchor(this.props.gridCode, "Correlations")}</div>
            </div>,
            <MultiGrid
              key={1}
              {...gu.buildGridStyles(this.props.darkMode)}
              scrollToColumn={0}
              scrollToRow={0}
              cellRenderer={this._cellRenderer}
              fixedColumnCount={1}
              fixedRowCount={1}
              rowCount={(_.isNull(col1) ? _.size(correlations) : 1) + 1}
              columnCount={(_.isNull(col2) ? _.size(columns) : 1) + 1}
              height={300}
              columnWidth={100}
              rowHeight={gu.ROW_HEIGHT}
              width={width}
            />,
          ]}
        </AutoSizer>
      </BouncerWrapper>
    );
  }
}
CorrelationsGrid.displayName = "CorrelationsGrid";
CorrelationsGrid.propTypes = {
  correlations: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.string),
  hasDate: PropTypes.bool,
  selectedDate: PropTypes.string,
  selectedCols: PropTypes.arrayOf(PropTypes.string),
  buildTs: PropTypes.func,
  buildScatter: PropTypes.func,
  rolling: PropTypes.bool,
  useRolling: PropTypes.bool,
  window: PropTypes.number,
  minPeriods: PropTypes.number,
  gridCode: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default CorrelationsGrid;
