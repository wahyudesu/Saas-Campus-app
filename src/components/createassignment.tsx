"use client";

import { 
  Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, 
  Button, useDisclosure, Input, 
  Textarea
} from "@nextui-org/react";
import React from "react";
import { savefolders } from "@/lib/action";

export default function FormAssignment() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button 
        variant="solid" 
        className="bg-blue-600 text-white mb-4 font-medium" 
        onPress={onOpen}
      >
        Open Drawer
      </Button>
      <Drawer 
        isOpen={isOpen} 
        placement="right" 
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 mt-4">
                Buat tugas
              </DrawerHeader>
              <DrawerBody>
                <form action={savefolders}>
                  <div className="flex flex-col gap-4">
                    <Input
                      name="name_assignment"
                      label="Nama Tugas"
                      required
                    />
                    <Input
                      name="class_type"
                      label="class_type"
                      required
                    />
                    <Textarea
                      name="description"
                      label="Deskripsi"
                      required
                    />
                    <Input
                      name="assignment_type"
                      label="Tipe Tugas"
                      required
                    />
                    <Input
                      name="due_date"
                      type="datetime-local"
                      placeholder="a"
                      label="Due Date"
                      required
                    />
                    <input 
                      type="hidden" 
                      name="created_at"
                      value={new Date().toISOString()}
                    />
                  </div>
                  
                </form>
              </DrawerBody>
              <DrawerFooter className="mb-2">
                    <Button variant="bordered" onPress={onClose}>
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 text-white font-medium"
                    >
                      Buat tugas
                    </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}