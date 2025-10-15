import { Header } from 'src/components/header';

type Props = {
  applicationName: string;
};

export const HeaderDemo = ({ ...props }: Props) => {
  return <Header {...props} />;
};
