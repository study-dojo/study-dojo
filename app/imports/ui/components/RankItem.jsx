import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RankItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.email}</Table.Cell>
          <Table.Cell>{this.props.stuff.points}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RankItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RankItem);
