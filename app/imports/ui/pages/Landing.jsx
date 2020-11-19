import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing-background'>
          <Grid container centered stackable relaxed columns={3}>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='users' inverted/>
              <Header as='h1' inverted>Multiple Users</Header>
              <Header as='h3' inverted>
                All users are welcome to the Study Dojo!
                Become a &quot;Grasshopper&quot; to receive training for all your ICS courses. Become a &quot;Sensei&quot; to help fellow Grasshoppers.
              </Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='calendar' inverted/>
              <Header as='h1' inverted>Schedule Training</Header>
              <Header as='h3' inverted>
                Need help? Looking for some training partners?
                Schedule a training session with your fellow Sensei and Grasshoppers. Become a ICS master!
              </Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='angle double up' inverted/>
              <Header as='h1' inverted>Rank Up</Header>
              <Header as='h3' inverted>
                Move your way up the ranks. Earn points by training and helping other Grasshoppers.
                Do you have what it takes to become a ICS Master?
              </Header>
            </Grid.Column>

          </Grid>
        </div>
    );
  }
}

export default Landing;
