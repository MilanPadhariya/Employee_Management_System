import { Meta, StoryObj } from '@storybook/angular';

import { ErrorpageComponent } from './errorpage.component';

type ComponentWithCustomControls = ErrorpageComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Errorpage',
  component: ErrorpageComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Errorpage` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Errorpage: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
