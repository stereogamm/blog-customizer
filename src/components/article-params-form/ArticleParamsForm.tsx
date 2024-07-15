import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useEffect, useRef } from 'react';
import { RadioGroup } from '../radio-group/RadioGroup'
import { Select } from '../select';
import { fontFamilyOptions,
		OptionType,
		fontColors,
		fontSizeOptions,
		backgroundColors,
		contentWidthArr,
		defaultArticleState,
		ArticleStateType, } from 'src/constants/articleProps';
import { Separator } from '../separator/Separator';

const formTitle = 'задайте параметры';
const fontFieldTitle = 'шрифт';
const fontSizeFieldTitle = 'размер шрифта';
const fontColorFieldTitle = 'цвет шрифта';
const backgroundColorField = 'цвет фона';
const contentWidth = 'ширина контента';

export interface ArticleProps {
	setChangeArticle: (param: ArticleStateType) => void;
	articleOptions: ArticleStateType;
}

export const ArticleParamsForm: React.FC<ArticleProps> = ({
	setChangeArticle,
	articleOptions,
}) => {

const [isVisible, setVisible] = useState(false)
const [selectedFontOption, setSelectedFontOption] = useState<OptionType>(defaultArticleState.fontFamilyOption);
const [selectedFontSizeOption, setSelectedFontSizeOption] = useState<OptionType>(defaultArticleState.fontSizeOption);
const [selectedFontColorsOption, setSelectedFontColorsOption] = useState<OptionType>(defaultArticleState.fontColor);
const [selectedBackgroundColorOption, setselectedBackgroundColorOption] = useState<OptionType>(defaultArticleState.backgroundColor);
const [selectedContentWidthOption, setselectedContentWidthOption] = useState<OptionType>(defaultArticleState.contentWidth);
const menuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
	setSelectedFontOption(articleOptions.fontFamilyOption);
	setSelectedFontSizeOption(articleOptions.fontSizeOption);
	setSelectedFontColorsOption(articleOptions.fontColor);
	setselectedBackgroundColorOption(articleOptions.backgroundColor);
	setselectedContentWidthOption(articleOptions.contentWidth);
}, [articleOptions]);

const toggleVisibilitySideMenu = () => {
	setVisible((prev) => !prev);
}

const useOutsideClickClose = ({
    isOpen,
    rootRef,
    onClose,
    onChange,
  }: {
    isOpen: boolean;
    rootRef: React.RefObject<HTMLDivElement>;
    onClose?: () => void;
    onChange?: (newValue: boolean) => void;
  }) => {
    useEffect(() => {
      const clickOutsideMenu = (event: MouseEvent) => {
        const target = event.target as Node;
        if (isOpen && rootRef.current && !rootRef.current.contains(target)) {
          if (onClose) onClose();
          if (onChange) onChange(false);
        }
      };
      	document.addEventListener('mousedown', clickOutsideMenu);
      return () => {
        	document.removeEventListener('mousedown', clickOutsideMenu);
      };
    }, [isOpen, rootRef, onClose, onChange]);
  };

  useOutsideClickClose({
    isOpen: isVisible,
    rootRef: menuRef,
    onClose: () => {
      setVisible(false);
    },
    onChange: (newValue: boolean) => {
      setVisible(newValue);
    },
  });

const selectedDropDownChanged = (option: OptionType) => {
	setSelectedFontOption(option);
}

const selectedFontSizeChanged = (option: OptionType) => {
    setSelectedFontSizeOption(option);
  };

const selectedFontColorsChanged = (option: OptionType) => {
	setSelectedFontColorsOption(option);
}

const selectedBackgroundColorChanged = (option: OptionType) => {
	setselectedBackgroundColorOption(option);
}

const selectedContentWidthChanged = (option: OptionType) => {
	setselectedContentWidthOption(option);
}

const handleApply = () => {
	const newState = {
		fontFamilyOption: selectedFontOption,
		fontSizeOption: selectedFontSizeOption,
		fontColor: selectedFontColorsOption,
		backgroundColor: selectedBackgroundColorOption,
		contentWidth: selectedContentWidthOption,
	};
	setChangeArticle(newState);
}

const handleReset = () => {
	setSelectedFontOption(defaultArticleState.fontFamilyOption);
	setSelectedFontSizeOption(defaultArticleState.fontSizeOption);
	setSelectedFontColorsOption(defaultArticleState.fontColor);
	setselectedBackgroundColorOption(defaultArticleState.backgroundColor);
	setselectedContentWidthOption(defaultArticleState.contentWidth);
	setChangeArticle(defaultArticleState);
}

	return (
		<>
			<ArrowButton onClick={toggleVisibilitySideMenu} isOpen={isVisible}/>
			{isVisible && (
			<aside className={clsx(styles.container, {[styles.container_open]: isVisible })} ref={menuRef}>
				<ArrowButton onClick={toggleVisibilitySideMenu} isOpen={isVisible}/>
				<form className={styles.form}
						onSubmit={(event) => { event.preventDefault(); handleApply()}}
						onReset={(event) => { event.preventDefault(); handleReset()}}>
					<h2 className={styles.header}>{(formTitle.toLocaleUpperCase())}</h2>
					<div className={styles.spacing}></div>
						<Select
						selected={selectedFontOption}
						options={fontFamilyOptions}
						placeholder=''
						onChange={selectedDropDownChanged}
						title={fontFieldTitle}
						/>
					<div className={styles.spacing}></div>
					<RadioGroup
						name="fontSize"
						options={fontSizeOptions}
						selected={selectedFontSizeOption}
						onChange={selectedFontSizeChanged}
						title={fontSizeFieldTitle}
					/>
					<div className={styles.spacing}></div>
					<Select
						selected={selectedFontColorsOption}
						options={fontColors}
						placeholder=''
						onChange={selectedFontColorsChanged}
						title={fontColorFieldTitle}
					/>
					<div className={styles.spacing}></div>
					<Separator/>
					<div className={styles.spacing}></div>
					<Select
						selected={selectedBackgroundColorOption}
						options={backgroundColors}
						placeholder=''
						onChange={selectedBackgroundColorChanged}
						title={backgroundColorField}
					/>
					<div className={styles.spacing}></div>
					<Select
						selected={selectedContentWidthOption}
						options={contentWidthArr}
						placeholder=''
						onChange={selectedContentWidthChanged}
						title={contentWidth}
					/>
					<div className={styles.spacing}></div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
			)}
		</>
	);
};

