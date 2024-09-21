import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <div>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
}