// import React, { Fragment } from 'react';
// import { Menu, Transition } from '@headlessui/react';
//
// const SimpleDropdownMenu = ({
//     optionClicked,
//     list,
//     buttonElement,
//     buttonClass = '',
//     className,
//     menuClassName,
//     disabled = false,
//     itemClassName = '',
// }) => {
//     return (
//         <div className={className || ''}>
//             <Menu>
//                 {({ open, close }) => (
//                     <>
//                         <Menu.Button
//                             disabled={disabled}
//                             className={`m-0 p-0 ${buttonClass || ''}`}
//                         >
//                             {buttonElement}
//                         </Menu.Button>
//                         <Transition
//                             show={open}
//                             enter="transition duration-200 ease-out"
//                             enterFrom="transform scale-95 opacity-0"
//                             enterTo="transform scale-100 opacity-100"
//                             leave="transition duration-175 ease-out"
//                             leaveFrom="transform scale-100 opacity-100"
//                             leaveTo="transform scale-95 opacity-0"
//                         ></Transition>
//
//                         <Menu.Items
//                             onMouseLeave={close}
//                             className={`absolute left-0 flex  flex-col font-satoshi ${
//                                 menuClassName || ''
//                             }`}
//                         >
//                             {list.map((item) => (
//                                 <Menu.Item
//                                     disabled={item.disabled}
//                                     as="div"
//                                     key={`key_${item.action}`}
//                                     onClick={(ev) =>
//                                         optionClicked(item.action, ev)
//                                     }
//                                     className={`min-w-20 z-130 cursor-pointer space-y-3 rounded-sm bg-white p-2 text-black
//                                         shadow-md ui-active:bg-algray-100  ui-not-active:bg-white `}
//                                 >
//                                     <div
//                                         className={`${itemClassName} ${
//                                             item.disabled ? 'opacity-50' : ''
//                                         }`}
//                                     >
//                                         {item.label}
//                                     </div>
//                                 </Menu.Item>
//                             ))}
//                         </Menu.Items>
//                     </>
//                 )}
//             </Menu>
//         </div>
//     );
// };
//
// export default SimpleDropdownMenu;
