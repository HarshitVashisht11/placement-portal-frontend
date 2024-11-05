"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { api } from "@/lib/api"

interface Item {
  value: string;
  label: string;
}
const frameworks: Item[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function Combobox(
  {
    itemList, className, placeholder, onChange

  }: {
    itemList: Item[];
    className: string;
    placeholder: string;
    onChange: any;
  }
) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [itemsList, setItemsList] = useState<Item[]>([
    {
      value: "hi",
      label: "hello"
    }
  ])

  const [search, setSearch] = useState<string>("");

  const handleCompanyList = useCallback((e: any) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    console.log(searchTerm);
    if (searchTerm != "" && searchTerm != null) {
      const timeout = setTimeout(async () => {
        try {
          const response = await api.get(`/companyList?q=${search}`);
          if (response.status === 200) {
            let partialItems: Item[] = []
            response.data.companies.map((company: any) => (
              partialItems.push({
                value: company.id,
                label: company.name
              })
            ))
            setItemsList(partialItems);
          }
        } catch (error) {
          console.error("error fetching company list:", error);
        }
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setItemsList([]);
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? itemsList.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-2">
        <Command>
          <CommandInput className="w-full" placeholder={placeholder} onChangeCapture={(e) => handleCompanyList(e)} />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {itemsList.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onChange(currentValue)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
