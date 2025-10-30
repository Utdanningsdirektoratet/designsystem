import { PencilWritingIcon } from '@udir-design/icons';
import { Button } from '@udir-design/react/alpha';

export function Home() {
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

export default Home;
