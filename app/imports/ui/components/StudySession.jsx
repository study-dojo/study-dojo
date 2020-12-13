import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
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
    const topic = _.pluck(this.props.studySession, 'topic');
    const className = _.pluck(this.props.studySession, 'className');
    const sessionDate = _.pluck(this.props.studySession, 'sessionDate');
    const sessionTime = _.pluck(this.props.studySession, 'sessionTime');
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{topic}</Card.Header>
            <Card.Header>{className}</Card.Header>
            <Card.Header>{sessionDate} - {sessionTime}</Card.Header>
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

/** Takes in an array. */
StudySession.propTypes = {
  studySession: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySession);
