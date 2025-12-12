import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/AppSidebar";
import { Outlet } from "react-router";
function App() {
  return (
    <>
      <div className="w-full">
        <div className="min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4">
              <SidebarTrigger />
              <Outlet />
            </main>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
}

export default App;
