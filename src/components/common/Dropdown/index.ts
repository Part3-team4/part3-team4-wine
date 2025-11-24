/**
 *
 * Dropdown 루트 컴포넌트.
 *
 * 컴파운드 패턴으로 구성된 드롭다운의 최상위 컨테이너이며
 * 내부에서 Trigger, Menu, Item 등의 서브 컴포넌트와 함께 사용된다.
 *
 * @example
 *     <Dropdown>
 *       <Dropdown.Trigger>
 *        {* Trigger 안에는  Image를 넣거나 Component를 넣는다. *}
 *        <Image src={KebabLg} alt="ss" width={38} height={38} />
 *       </Dropdown.Trigger>
 *
 *       <Dropdown.Menu>
 *         <Dropdown.Item value="edit">
 *           {* button 을 넣거나 *}
 *           <button>수정하기</button>
 *         </Dropdown.Item>
 *         <Dropdown.Item value="del">
 *            {* 링크를 넣을 수 있다. *}
 *           <Link href="#" title="삭제하기">
 *             삭제하기
 *           </Link>
 *         </Dropdown.Item>
 *      </Dropdown.Menu>
 *    </Dropdown>
 */

import DropdownRoot from './Dropdown';
import DropdownTrigger from './DropdownTrigger';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';

const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
  Item: DropdownItem,
});

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
