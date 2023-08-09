import { Meta, StoryObj } from '@storybook/angular';

import { LeavespageComponent } from './leavespage.component';

type ComponentWithCustomControls = LeavespageComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Leavespage',
  component: LeavespageComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Leavespage` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Leavespage: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
