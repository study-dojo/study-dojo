import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ReportItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.reportedProfiles.user}</Table.Cell>
          <Table.Cell>{this.props.reportedProfiles.reportReason}</Table.Cell>
          <Table.Cell>{this.props.reportedProfiles.reportDescription}</Table.Cell>
          <Table.Cell>{this.props.reportedProfiles.reportBy}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ReportItemAdmin.propTypes = {
  reportedProfiles: PropTypes.object.isRequired,
};

export default ReportItemAdmin;
