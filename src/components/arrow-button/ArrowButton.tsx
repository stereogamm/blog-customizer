import arrow from 'src/images/arrow.svg';
import arrowStyle from './ArrowButton.module.scss';
import clsx from 'clsx';




/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type Props = {
	onClick: OnClick;
	isOpen?: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: Props) => {


	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(arrowStyle.container, { [arrowStyle.container_open]: isOpen })}
			onClick={() => {
				onClick();
			  }}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(arrowStyle.arrow, { [arrowStyle.arrow_open]: isOpen })}/>
		</div>
	);
};

