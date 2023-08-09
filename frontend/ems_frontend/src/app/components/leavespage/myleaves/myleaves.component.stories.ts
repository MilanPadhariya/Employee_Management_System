import { Meta, StoryObj } from '@storybook/angular';

import { MyleavesComponent } from './myleaves.component';

type ComponentWithCustomControls = MyleavesComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Myleaves',
  component: MyleavesComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Myleaves` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Myleaves: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
