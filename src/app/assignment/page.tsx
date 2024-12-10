"use client"

import Navbar from "@/components/navbar";
import { AppSidebar } from "@/components/sidebar";
import FolderCardList from "@/components/card";
import FormAssignment from "@/components/createassignment";

const FolderPage = () => {

  return (
    <div className="drawer drawer-end">
      <div className="drawer-content">
        <div className="min-h-screen flex">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-start justify-center p-8">
              <div className="w-full max-w-5xl">
                <div className="mb-5">
                  <h1 className="text-2xl font-bold mb-8 text-center">Dashboard</h1>
                  <FormAssignment/>
                </div>
                <FolderCardList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderPage;