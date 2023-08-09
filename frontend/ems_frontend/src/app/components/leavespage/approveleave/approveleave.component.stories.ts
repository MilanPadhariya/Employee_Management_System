import { Meta, StoryObj } from '@storybook/angular';

import { ApproveleaveComponent } from './approveleave.component';

type ComponentWithCustomControls = ApproveleaveComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Approveleave',
  component: ApproveleaveComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Approveleave` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Approveleave: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
