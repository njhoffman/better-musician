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
  title:'standard Buttons',
  props: [{
    label: 'Default',
    variant: 'standard'
  }, {
    label: 'Primary',
    variant: 'standard',
    primary: true
  }, {
    label: 'Secondary',
    variant: 'standard',
    secondary: true
  }, {
    label: 'Disabled',
    variant: 'standard',
    disabled: true
  }, {
    label: 'Link',
    variant: 'standard',
    href: '#text-link'
  }]
}, {
  title:'Float Action Buttons',
  props: [{
    icon: AddIcon,
    variant: 'filled',
    primary: true
  }, {
    icon: EditIcon,
    variant: 'filled',
    secondary: true
  }, {
    icon: DeleteIcon,
    variant: 'filled',
    disabled: true
  }]
}];
