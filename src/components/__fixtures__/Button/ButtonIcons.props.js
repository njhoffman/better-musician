import React from 'react';
import Icon from '@material-ui/core/Icon';
import {
  AddShoppingCart as AddShoppingCartIcon,
  FileUpload as FileUploadIcon,
  KeyboardVoice as KeyboardVoiceIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@material-ui/icons';

export default [{
  title:'Icon Buttons',
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
  title:'Icon Buttons with Labels (right align)',
  props: [{
    label: 'Default',
    icon: DeleteIcon,
    variant: 'contained',
    color: 'default'
  }, {
    label: 'Primary',
    primary: true,
    icon: <Icon>send</Icon>,
    variant: 'contained'
  }, {
    label: 'Secondary',
    secondary: true,
    icon: FileUploadIcon,
    variant: 'contained'
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
  title:'Icon Buttons with Labels (left align)',
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
    variant: 'contained'
  }, {
    label: 'Secondary',
    secondary: true,
    icon: FileUploadIcon,
    iconAlign: 'left',
    variant: 'contained'
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
