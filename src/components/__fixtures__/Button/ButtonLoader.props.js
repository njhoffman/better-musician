import React from 'react';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

export default [{
  title:'Loader Buttons',
  props: [{
    icon: DeleteIcon,
    color: 'default'
  }, {
    icon: DeleteIcon,
    primary: true
  }, {
    icon: <Icon>alarm</Icon>,
    secondary: true
  }, {
    icon: AddShoppingCartIcon,
    disabled: true
    // missing input:label >Icon combo
  }, {
    icon: AddShoppingCartIcon,
    href: '#text-link'
  }]
}, {
  title:'Loader Buttons with Labels (right align)',
  props: [{
    label: 'Default',
    icon: DeleteIcon,
    variant: 'contained',
    color: 'default'
  }, {
    label: 'Primary',
    primary: true,
    icon: <Icon>send</Icon>,
    variant: 'contained',
  }, {
    label: 'Secondary',
    secondary: true,
    icon: FileUploadIcon,
    variant: 'contained',
  }, {
    label: 'Disabled',
    disabled: true,
    icon: KeyboardVoiceIcon,
    variant: 'contained'
  }, {
    label: 'Link',
    icon: SaveIcon,
    variant: 'contained',
    href: '#text-link'
  }]
}, {
  title:'Loader Buttons with Labels (left align)',
  props: [{
    label: 'Default',
    icon: DeleteIcon,
    iconAlign: 'left',
    variant: 'contained',
    color: 'default'
  }, {
    label: 'Primary',
    primary: true,
    icon: <Icon>send</Icon>,
    iconAlign: 'left',
    variant: 'contained',
  }, {
    label: 'Secondary',
    secondary: true,
    icon: FileUploadIcon,
    iconAlign: 'left',
    variant: 'contained',
  }, {
    label: 'Disabled',
    disabled: true,
    icon: KeyboardVoiceIcon,
    iconAlign: 'left',
    variant: 'contained'
  }, {
    label: 'Link',
    icon: SaveIcon,
    iconAlign: 'left',
    variant: 'contained',
    href: '#text-link'
  }]
}];
