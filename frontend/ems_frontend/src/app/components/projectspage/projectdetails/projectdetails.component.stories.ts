import { Meta, StoryObj } from '@storybook/angular';

import { ProjectdetailsComponent } from './projectdetails.component';

type ComponentWithCustomControls = ProjectdetailsComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Projectdetails',
  component: ProjectdetailsComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Projectdetails` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Projectdetails: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
