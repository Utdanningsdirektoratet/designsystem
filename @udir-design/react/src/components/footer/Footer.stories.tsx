import type { Meta, StoryObj } from '@storybook/react-vite';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import { Footer } from './';

const meta: Meta<typeof Footer> = {
  component: Footer,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'fullscreen',
    customStyles: {
      padding: 0,
    },
  },
  decorators: [withResponsiveDataSize],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Preview: Story = {
  render: (args) => (
    <Footer {...args}>
      <Footer.List>
        <Footer.Item href="#">Om tjenesten</Footer.Item>
        <Footer.Item href="#">Kontakt oss</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href="#">Lenke</Footer.Item>
        <Footer.Item href="#">Lenke</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href="#">Personvernerklæring</Footer.Item>
        <Footer.Item href="#">Informasjonskapsler</Footer.Item>
        <Footer.Item href="#">Tilgjengelighetserklæring</Footer.Item>
      </Footer.List>
    </Footer>
  ),
};

export const Udirno: Story = {
  render: () => (
    <Footer>
      <Footer.List>
        <Footer.Item href="#">Om tjenesten</Footer.Item>
        <Footer.Item href="#">Kontakt oss</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href="#">Høringer</Footer.Item>
        <Footer.Item href="#">Presse</Footer.Item>
        <Footer.Item href="#">Nyhetsvarsel</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href="#">Personvernerklæring</Footer.Item>
        <Footer.Item href="#">Informasjonskapsler</Footer.Item>
        <Footer.Item href="#">Tilgjengelighetserklæring</Footer.Item>
      </Footer.List>
      <Footer.List variant="social">
        <Footer.Item href="#">
          <LinkedIn aria-hidden />
          <span>LinkedIn</span>
        </Footer.Item>
        <Footer.Item href="#">
          <Facebook aria-hidden />
          <span>Facebook</span>
        </Footer.Item>
        <Footer.Item href="#">
          <Instagram />
          <span>Instagram</span>
        </Footer.Item>
      </Footer.List>
    </Footer>
  ),
};

export const Tjeneste: Story = {
  render: () => (
    <Footer>
      <Footer.List>
        <Footer.Item href="#">Om tjenesten</Footer.Item>
        <Footer.Item href="#">Kontakt oss</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href="#">Personvernerklæring</Footer.Item>
        <Footer.Item href="#">Informasjonskapsler</Footer.Item>
        <Footer.Item href="#">Tilgjengelighetserklæring</Footer.Item>
      </Footer.List>
    </Footer>
  ),
};

const Facebook = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
    >
      <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
    </svg>
  );
};

const Instagram = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0,0,256,256"
      fill="#1A1A1A"
    >
      <g
        fill="#1a1a1a"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
      >
        <g transform="scale(8,8)">
          <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path>
        </g>
      </g>
    </svg>
  );
};

const LinkedIn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0,0,256,256"
      fill="#1A1A1A"
    >
      <g
        fill="#1a1a1a"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
      >
        <g transform="scale(5.12,5.12)">
          <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z"></path>
        </g>
      </g>
    </svg>
  );
};
