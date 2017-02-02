import React from 'react';
import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { Row, Column } from 'react-foundation';
import  ButtonLoader from 'components/ButtonLoader';
import { browserHistory } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';
import css from './StatsView.scss';

export const StatsView = (props) => {
  const user = props.user && props.user.get('attributes') ? props.user.get('attributes') : null;
  let disabled = props.api.isFetching;
  const redirectSettings = () => browserHistory.push('/settings');
  const redirectFields = () => browserHistory.push('/fields');
  const redirectProfile = () => browserHistory.push('/profile');

  const textColor = props.muiTheme.palette.textColor;

  return (
    <Column small={12} medium={8} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.statsContainer}>
          <Tabs>
            <Tab
              data-route="/stats"
              label="Stats">
              <form className={css.statsForm}>
                <h3>These Are Your Stats</h3>
              </form>
            </Tab>
            <Tab
              data-route="/stats"
              value="stats"
              onActive={redirectProfile}
              label="Stats">
            </Tab>
            <Tab
              data-route="/settings"
              onActive={redirectSettings}
              label="Settings">
            </Tab>
            <Tab
              data-route="/fields"
              onActive={redirectFields}
              label="Fields">
            </Tab>
          </Tabs>
        </div>
      </Paper>
    </Column>
  );
};
export default muiThemeable()(StatsView);
