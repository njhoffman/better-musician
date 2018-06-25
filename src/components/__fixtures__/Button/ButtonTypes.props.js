import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default [{
  title:'Text Buttons',
  props: [{
    label: 'Default',
    variant: 'text',
    color: 'default'
  }, {
    label: 'Primary',
    primary: true,
    variant: 'text'
  }, {
    label: 'Secondary',
    secondary: true,
    variant: 'text'
  }, {
    label: 'Disabled',
    disabled: true,
    variant: 'text'
  }, {
    label: 'Link',
    href: '#text-link',
    variant: 'text'
  }]
}, {
  title:'Outlined Buttons',
  props: [{
    label: 'Default',
    variant: 'outlined',
    color: 'default'
  }, {
    label: 'Primary',
    variant: 'outlined',
    primary: true
  }, {
    label: 'Secondary',
    variant: 'outlined',
    secondary: true
  }, {
    label: 'Disabled',
    variant: 'outlined',
    disabled: true
  }, {
    label: 'Link',
    variant: 'outlined',
    href: '#text-link'
  }]
}, {
  title:'Contained Buttons',
  props: [{
    label: 'Default',
    variant: 'contained',
    color: 'default'
  }, {
    label: 'Primary',
    variant: 'contained',
    primary: true
  }, {
    label: 'Secondary',
    variant: 'contained',
    secondary: true
  }, {
    label: 'Disabled',
    variant: 'contained',
    disabled: true
  }, {
    label: 'Link',
    variant: 'contained',
    href: '#text-link'
  }]
}, {
  title:'Flat Buttons',
  props: [{
    label: 'Default',
    variant: 'flat',
    color: 'default'
  }, {
    label: 'Primary',
    variant: 'flat',
    primary: true
  }, {
    label: 'Secondary',
    variant: 'flat',
    secondary: true
  }, {
    label: 'Disabled',
    variant: 'flat',
    disabled: true
  }, {
    label: 'Link',
    variant: 'flat',
    href: '#text-link'
  }]
}, {
  title:'Raised Buttons',
  props: [{
    label: 'Default',
    variant: 'raised',
    color: 'default'
  }, {
    label: 'Primary',
    variant: 'raised',
    primary: true
  }, {
    label: 'Secondary',
    variant: 'raised',
    secondary: true
  }, {
    label: 'Disabled',
    variant: 'raised',
    disabled: true
  }, {
    label: 'Link',
    variant: 'raised',
    href: '#text-link'
  }]
}, {
  title:'Float Action Buttons',
  props: [{
    icon: AddIcon,
    variant: 'fab',
    primary: true
  }, {
    icon: EditIcon,
    variant: 'fab',
    secondary: true
  }, {
    icon: DeleteIcon,
    variant: 'fab',
    disabled: true
  }]
}];
