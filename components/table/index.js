import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = ({...props}) => {
  let classes = classNames({
    [`${props.className}`]: props.className
  });

  return (
    <table className={classes}>
      <thead>
        <tr>
          {
            props.columns.map(column => <th key={column}>{column}</th>)
          }
        </tr>
      </thead>
      <tbody>
      {
        props.rows.map((row, idx) => (
          <tr key={idx}>
            {
              row.map((td, i) => <td key={i}>{td}</td>)
            }
          </tr>
        ))
      }
      </tbody>
    </table>
  );
};

export default Table;

Table.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array
};

Table.defaultProps = {
  rows: [],
  columns: []
};
