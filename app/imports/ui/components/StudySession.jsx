import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders cards with the info in pages/ListStudySessions.jsx. */
class StudySession extends React.Component {
  handleClick() {
    swal({
      title: 'Do you want to delete study session?',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            swal('Study session deleted');
          } else {
            swal('Study session not deleted');
          }
        });
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.studySession.topic}</Card.Header>
            <Card.Header>{this.props.studySession.sessionDate} - {this.props.studySession.sessionTime}</Card.Header>
            <Card.Header>{this.props.studySession.className} - {this.props.studySession.status}</Card.Header>
          </Card.Content>

          <Card.Content extra>
            <Button floated='right' icon onClick={this.handleClick}>
              <Icon name='trash' />
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
StudySession.propTypes = {
  studySession: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySession);
