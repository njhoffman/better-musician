/* eslint-disable */
import Loadable from 'react-loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

export default Loadable({
  loader: () => import('./components/FieldsView'),
  loading: LoadingIndicator
});
/* eslint-enable */
