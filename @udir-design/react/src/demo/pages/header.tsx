import { LeaveIcon, PersonIcon } from '@udir-design/icons';
import { Avatar } from 'src/components/avatar/Avatar';
import { Badge } from 'src/components/badge/Badge';
import { Button } from 'src/components/button/Button';
import { Divider } from 'src/components/divider/Divider';
import { Dropdown } from 'src/components/dropdown/Dropdown';
import { Header } from 'src/components/header';

type Props = {
  applicationName: string;
};

export const HeaderDemo = ({ ...props }: Props) => {
  return (
    <Header {...props}>
      <Header.UserButton
        avatar={<Avatar aria-hidden>SH</Avatar>}
        data-show="md"
        popovertarget="usermenu2"
        userRole="Admin"
        username="Stian Hansen"
      />
      <Dropdown id="usermenu2" placement="bottom-end">
        <Dropdown.List>
          <Dropdown.Item>
            <Dropdown.Heading>Bytt profil</Dropdown.Heading>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dropdown.Button>
              <Avatar aria-hidden>
                <PersonIcon />
              </Avatar>
              Grålum skole <Badge count={10} maxCount={9} />
            </Dropdown.Button>
          </Dropdown.Item>
          <Divider />
          <Dropdown.Item>
            <Button variant="tertiary">
              <LeaveIcon aria-hidden />
              Logg ut
            </Button>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Header>
  );
};
