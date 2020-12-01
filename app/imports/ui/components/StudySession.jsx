import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { StudySessions } from '../../api/studySession/StudySessions';

/** Renders cards with the info in pages/ListStudySessions.jsx. */
class StudySession extends React.Component {
  handleClick(e, documentId) {
    e.preventDefault();
    swal({
      title: 'Do you want to delete study session?',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            StudySessions.collection.remove(documentId);
            swal('Study session deleted');
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
            <Button icon floated='right' onClick={ e => this.handleClick(e, this.props.studySession._id)}>
              <Icon name='trash'/>
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
