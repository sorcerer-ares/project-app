import { Children } from "react";
import {Dialog} from  "../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu"

function DropDown({ children }) {
  return (
    <div className="p-10">
      <Dialog>
          <div className="mt-4 space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {children}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => alert("Option 1 clicked")}>
                   Rename
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => alert("Option 2 clicked")}>
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => alert("Option 3 clicked")}>
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => alert("Option 3 clicked")}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </Dialog>
    </div>
  );
}

export default DropDown;
