import type { Meta, StoryObj } from '@storybook/react';
import PageHeader from './index';
import MultipleSelectFilter from '../multiple-select-filter';

const meta: Meta<typeof PageHeader> = {
    title: 'Components/Phase II/PageHeader',
    component: PageHeader
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
    args: {
        title: 'NFL Player Props',
        description:
            'Place smarter bets with Pine Sports NFL Player Props Sheets',
        action: (
            <>
                <MultipleSelectFilter
                    title="Select Sheet"
                    options={[
                        {
                            label: 'All Games',
                            value: 'Game'
                        }
                    ]}
                />
            </>
        )
    }
};
