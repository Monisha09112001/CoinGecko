import { Outlet } from "react-router";

export default function IndexScreen() {
  return (
    <>
      <div className="p-3">
        <Outlet />
      </div>
    </>
  );
}
