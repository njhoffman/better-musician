import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default [{
  title:'Text Buttons',
  props: [{
    label: 'Default'
  }, {
    label: 'Primary',
    primary: true
  }, {
    label: 'Secondary',
    secondary: true
  }, {
    label: 'Disabled',
    disabled: true
  }, {
    label: 'Link',
    href: '#text-link'
  }]
}, {
  title:'Outlined Buttons',
  props: [{
    label: 'Default',
    variant: 'outlined'
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
    variant: 'contained'
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
