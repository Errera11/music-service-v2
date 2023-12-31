import React, {useEffect, useRef, useState} from 'react';
import DropDownItem from "@/components/dropdown/dropdownItem/DropDownItem";
import DropdownActiveItem from "@/components/dropdown/dropDownActiveItem/DropdownActiveItem";
import styles from './dropdown.module.scss';
import ChevronDownSvg from "@/assets/svg/ChevronDownSvg";

interface IProps {
    items: {
        id: string | number,
        title: string
    }[] | [] | undefined,
    title: string
    onAppendItem: (id: any) => void
    onRemoveItem: (id: any) => void
    selectedItems: {
        id: string | number,
        title: string
    }[] | [] | undefined
}

const Dropdown: React.FC<IProps> = ({items, title, selectedItems, onRemoveItem, onAppendItem}) => {

        const [isDropdown, setIsDropdown] = useState(false);
        const dropDownRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const listener = (e: MouseEvent) => {
                if (e.target instanceof HTMLElement &&
                    dropDownRef.current
                    && !dropDownRef.current.contains(e.target))
                    setIsDropdown(false);
            }

            document.addEventListener('click', listener)
            return () => document.removeEventListener('click', listener)
        }, [])

        return (
            <div ref={dropDownRef} className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.selectedItems}>
                        {selectedItems?.length ? selectedItems.map(item => <div key={item.id}
                                                                                className={styles.selectedItem}>
                            <DropdownActiveItem onRemove={onRemoveItem}
                                                title={item.title} id={item.id}/>
                        </div>) : <span>{title}</span>}
                    </div>
                    <span className={styles.expandList}
                          onClick={() => setIsDropdown(prev => !prev)}><ChevronDownSvg width={'25px'}
                                                                                       height={'25px'}/></span>
                </div>
                {isDropdown &&
                    <div className={styles.itemsToSelect}>
                        <ul >
                            {selectedItems && items && items.length ? items.map(item => <div
                                    onClick={() => onAppendItem(item)}>
                                    <DropDownItem isSelected={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                                                  id={item.id}
                                                  title={item.title}/>
                                </div>)
                                :
                                <span>There are no genres created</span>
                            }
                        </ul>
                    </div>

                }
            </div>
        )
            ;
    }
;

export default Dropdown;