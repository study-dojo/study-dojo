import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ReportedUsersAdmin.jsx. */
class MyDojoStuffAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.className}</Table.Cell>
          <Table.Cell>{this.props.stuff.status}</Table.Cell>
          <Table.Cell>{this.props.stuff.owner}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
MyDojoStuffAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default MyDojoStuffAdmin;
