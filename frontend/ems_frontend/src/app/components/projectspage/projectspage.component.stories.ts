import { Meta, StoryObj } from '@storybook/angular';

import { ProjectspageComponent } from './projectspage.component';

type ComponentWithCustomControls = ProjectspageComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Projectspage',
  component: ProjectspageComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Projectspage` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Projectspage: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
