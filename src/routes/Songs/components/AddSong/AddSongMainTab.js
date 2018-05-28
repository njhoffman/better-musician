import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import FormField, { RenderStars } from 'components/Field';
import { Row, Column } from 'react-foundation';
import PropTypes from 'prop-types';

/* eslint-disable no-multi-spaces */
import {
  artistLastNames  as artistLastNamesSelector,
  artistFirstNames as artistFirstNamesSelector,
  artistsMatched   as artistsMatchedSelector,
  instruments      as instrumentsSelector,
  genres           as genresSelector
} from 'selectors/songs';
/* eslint-enable no-multi-spaces */

import { maxDifficulty as maxDifficultySelector } from 'selectors/users';
import css from './AddSong.scss';

export const AddSongMainTab = (props) => {
  const {
    lastActiveField,
    textStyle,
    textInputStyle,
    modalView,
    matchedArtist,
    activeField,
    theme: { instrumental: { textColor } }
  } = props;

  const renderImage = () => {
    const artistPicture = matchedArtist && matchedArtist.pictures && matchedArtist.pictures[0]
      ? 'artists/' + matchedArtist.pictures[0]
      : 'artists/unknown_artist.png';
    if (activeField === 'artist' || lastActiveField === 'artist') {
      if (matchedArtist) {
        return (
          <Row className={css.imageFrame}>
            <Column>
              <img src={artistPicture} />
              <div>{matchedArtist.fullName}</div>
              { !modalView.isView() && <Button variant='raised' color='secondary'>Change Picture</Button> }
            </Column>
          </Row>
        );
      } else {
        return (
          <Row className={css.imageFrame}>
            <Column>
              <img src='/artists/unknown_artist.png' />
              <div>Unknown Artist</div>
              { !modalView.isView() && <Button variant='raised' color='secondary'>Change Picture</Button>}
            </Column>
          </Row>
        );
      }
    } else if (activeField === 'instrument' || lastActiveField === 'instrument') {
      return (
        <Row className={css.imageFrame}>
          <Column>
            <img src='/instruments/unknown_instrument.png' />
            <div>Unknown Instrument</div>
            { !modalView.isView() && <Button variant='raised' color='secondary'>Add Picture</Button> }
          </Column>
        </Row>
      );
    }
  };

  const renderStars = (number) => {
    return (
      <RenderStars
        starColor={props.theme.instrumental.starColor}
        number={number}
        style={{ float: 'right', display: 'inline-block' }} />
    );
  };

  const textProps = {
    disabled       : modalView.isView(),
    underlineShow  : !modalView.isView(),
    style          : textStyle,
    inputStyle     : textInputStyle
  };

  const className = css[modalView.getName() + 'Field'];

  return (
    <div>
      <Row>
        <Column>
          { renderImage() }
        </Column>
      </Row>
      {modalView.isView() &&
        <Row>
          <FormField
            name='title'
            type='text'
            className={className}
            {...textProps}
            label='Song Title' />
          <FormField
            name='artist.fullName'
            type='text'
            className={className}
            {...textProps}
            label='Song Artist' />
        </Row>
      }
      {!modalView.isView() &&
        <div>
          <Row>
            <FormField
              name='title'
              type='text'
              className={className}
              {...textProps}
              small={8}
              centerOnSmall
              style={{ ...textStyle, ...{ width: '100%' } }}
              label='Song Title' />
          </Row>
          <Row>
            <FormField
              name='artist.lastName'
              type='autocomplete'
              className={className}
              {...textProps}
              {...{} /* dataSource={props.artistLastNames} */}
              label='Last Name / Band' />
            <FormField
              name='artist.firstName'
              type='autocomplete'
              {...textProps}
              {...{} /* dataSource={props.artistFirstNames} */}
              label='First Name' />
          </Row>
        </div>
      }
      <Row>
        <FormField
          name='genre.name'
          type='autocomplete'
          label='Song Genre'
          className={className}
          {...textProps}
          {...{} /* dataSource={props.genres} */} />
        <FormField
          name='instrument.name'
          type='autocomplete'
          className={className}
          {...textProps}
          {...{} /* dataSource={props.instruments} */}
          label='Instrument' />
      </Row>
      <Row>
        {/* <FormField */}
        {/*   name='difficulty' */}
        {/*   type='slider' */}
        {/*   min={1} */}
        {/*   max={props.maxDifficulty} */}
        {/*   step={1} */}
        {/*   className={css.difficulty} */}
        {/*   disabled={modalView.isView()} */}
        {/*   textColor={textColor} */}
        {/*   label='Difficulty' /> */}
        {/* <FormField */}
        {/*   name='progress' */}
        {/*   type='slider' */}
        {/*   min={0} */}
        {/*   max={4} */}
        {/*   step={1} */}
        {/*   className={css.progress} */}
        {/*   valueDisplay={renderStars} */}
        {/*   disabled={modalView.isView()} */}
        {/*   textColor={textColor} */}
        {/*   label='Progress' /> */}
      </Row>
    </div>
  );
};

AddSongMainTab.propTypes = {
  lastActiveField : PropTypes.string.isRequired,
  textStyle       : PropTypes.object.isRequired,
  textInputStyle  : PropTypes.object.isRequired,
  modalView       : PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  matchedArtist   : PropTypes.object,
  activeField     : PropTypes.string,
  artistLastNames : PropTypes.any.isRequired,
  artistFirstNames: PropTypes.any.isRequired,
  genres          : PropTypes.any.isRequired,
  instruments     : PropTypes.any.isRequired,
  maxDifficulty   : PropTypes.number
};

const mapStateToProps = (state) => ({
  // activeField      : state.form.addSongForm ? state.form.addSongForm.active : null,
  // matchedArtist    : artistsMatchedSelector(state),
  // maxDifficulty    : maxDifficultySelector(state),
  // genres           : genresSelector(state),
  // instruments      : instrumentsSelector(state),
  // artistFirstNames : artistFirstNamesSelector(state),
  // artistLastNames  : artistLastNamesSelector(state)
});

export default connect(mapStateToProps)(AddSongMainTab);
