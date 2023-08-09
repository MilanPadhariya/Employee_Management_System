import { Meta, StoryObj } from '@storybook/angular';

import { AdduserComponent } from './adduser.component';

type ComponentWithCustomControls = AdduserComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Adduser',
  component: AdduserComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Adduser` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Adduser: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
