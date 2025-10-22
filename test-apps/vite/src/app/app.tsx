import { PencilWritingIcon } from '@udir-design/icons';
import { Button } from '@udir-design/react/alpha';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

export function App() {
  return (
    <div>
      <h1>Test app for SPA setup with @udir-design/react</h1>
      <Button>
        <PencilWritingIcon aria-hidden />
        Click me
      </Button>
    </div>
  );
}

export default App;
