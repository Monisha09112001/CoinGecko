import { Outlet } from "react-router";

export default function IndexScreen() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}
