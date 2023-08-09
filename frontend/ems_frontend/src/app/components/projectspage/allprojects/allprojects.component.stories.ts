import { Meta, StoryObj } from '@storybook/angular';

import { AllprojectsComponent } from './allprojects.component';

type ComponentWithCustomControls = AllprojectsComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Allprojects',
  component: AllprojectsComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Allprojects` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Allprojects: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
