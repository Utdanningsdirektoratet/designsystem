import { Button, Heading } from '@udir-design/react/alpha';

export default function Home() {
  return (
    <div>
      <Heading level={1}>
        Test app for Next.js setup with @udir-design/react
      </Heading>
      <Button onClick={() => console.log('clicked')}>Click me</Button>
    </div>
  );
}
