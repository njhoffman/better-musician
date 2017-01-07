import React from 'react';
import { Paper } from 'material-ui';
import { Row, Column } from 'react-foundation';
import  ButtonLoader from 'components/ButtonLoader';
import { Field, reduxForm } from 'redux-form';
import { RenderSelectField, RenderTextField, RenderSliderField } from 'components/Field';
import css from './ProfileView.scss';

export const ProfileView = (props) => {
  const user = props.user.get('attributes');
  let disabled =  false;
  // (
  //   this.props.auth.getIn(["user", "isSignedIn"]) ||
  //   this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
  // );
  return (
    <Column small={8} centerOnSmall={true}>
      <Paper zDepth={5}>
        <div className={css.profileContainer}>
          <h3>Update Your Profile</h3>
          <form
            style={{clear: "both", overflow: "hidden"}} >
            <Field
              name="firstName"
              component={RenderTextField}
              label="First Name" />
            <Field
              name="lastName"
              component={RenderTextField}
              label="Last Name" />
            <Field
              name="points"
              component={RenderTextField}
              label="Points" />
            <ButtonLoader
              type="submit"
              onClick={props.updateProfile}
              className='update-profile-submit'
              disabled={disabled}
              primary={true}>
            </ButtonLoader>
          </form>
        </div>
      </Paper>
    </Column>
  );
};
const updateProfileForm = reduxForm({ form: 'updateProfileForm' })(ProfileView);
export default updateProfileForm;
