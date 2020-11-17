import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders cards with the info in pages/ListStudySessions.jsx. */
class StudySession extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.studySession.topic}</Card.Header>
            <Card.Header>{this.props.studySession.date} - {this.props.studySession.time}</Card.Header>
            <Card.Header>{this.props.studySession.course} - {this.props.studySession.status}</Card.Header>
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
