import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';
import Header from '../components/Header';

function ErrorPage() {
  const error = useRouteError();

  let title = 'Ocorreu um erro!';
  let message = 'Algo deu errado!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Página não encontrada';
    message = 'Desculpe, a página que você está procurando não existe ou foi removida.';
  }

  return (
    <>
      <Header />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;