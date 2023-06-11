'use client';

import Navbar from './Navbar';

interface DrawerProps {
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
        <div className="h-full bg-neutral-content py-8">{children}</div>
        <label
          htmlFor="my-drawer-2"
          className="btn-primary drawer-button btn lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu h-full w-80 bg-base-100">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li>
                  <a>level 2 item 1</a>
                </li>
                <li>
                  <a>level 2 item 2</a>
                </li>
                <li>
                  <details open>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>level 3 item 1</a>
                      </li>
                      <li>
                        <a>level 3 item 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
