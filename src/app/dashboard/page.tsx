"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { AppSidebar } from "@/components/sidebar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function DocumentStorage() {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-start justify-center p-8">
          <div className="w-full max-w-5xl">
            <h1 className="text-2xl font-bold mb-8 text-center">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle>Card 1</CardTitle>
                </CardHeader>
                <CardContent />
                <CardFooter />
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle>Card 2</CardTitle>
                </CardHeader>
                <CardContent />
                <CardFooter />
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle>Card 3</CardTitle>
                </CardHeader>
                <CardContent />
                <CardFooter />
              </Card>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle>Card 1</CardTitle>
                </CardHeader>
                <CardContent />
                <CardFooter />
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle>Card 2</CardTitle>
                </CardHeader>
                <CardContent />
                <CardFooter />
              </Card>

              <Card className="bg-white shadow-md">
                <CardHeader>
                  <CardTitle>Card 3</CardTitle>
                </CardHeader>
                <CardContent />
                <CardFooter />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
