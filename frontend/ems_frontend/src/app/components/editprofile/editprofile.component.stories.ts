import { Meta, StoryObj } from '@storybook/angular';

import { EditprofileComponent } from './editprofile.component';

type ComponentWithCustomControls = EditprofileComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Editprofile',
  component: EditprofileComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Editprofile` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Editprofile: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
