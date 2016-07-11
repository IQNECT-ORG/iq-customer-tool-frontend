import IndexPage from '../../components/pages/Index';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';

DecoratedComponent = IndexPage;
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;