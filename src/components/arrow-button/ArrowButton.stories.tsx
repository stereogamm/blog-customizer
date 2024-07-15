import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

//скорее всего здесь должна быть какая-то логика для рендера комп в сторибуке
export const ArrowButtonStory: Story = {
	render: () => {
		return (
			<>
				<ArrowButton onClick={() => alert('клик на кнопку открытия')}/>
			</>
		);
	},
};
