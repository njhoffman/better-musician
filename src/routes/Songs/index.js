/* eslint-disable */
import Loadable from 'react-loadable';
import LoadingIndicator from '../../components/LoadingIndicator';

// export { default } from './default';

export default Loadable({
  loader: () => import('./components/SongsView'),
  loading: LoadingIndicator
});
