import { CloudUpload, LayoutGrid, List, Search } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export async function ToolbarForm() {
  const t = await getTranslations('Home.toolbar')

  return (
    <form className="flex items-center gap-4">
      <div className="flex w-full items-center rounded-md border border-zinc-200 px-4 shadow-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-zinc-950 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-within:ring-zinc-300">
        <Search className="size-4" />
        <Input
          placeholder={t('searchInput.placeholder')}
          className="h-12 border-none font-semibold shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="flex items-center justify-center rounded-md border px-1.5 dark:border-zinc-800">
        <span className="sr-only">Layout</span>
        <ToggleGroup type="single" defaultValue="cards" className="h-12">
          <ToggleGroupItem value="cards">
            <LayoutGrid className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list">
            <List className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Button asChild variant="outline" className="bg-transparent">
        <Label htmlFor="uploads" className="h-12 cursor-pointer">
          {t('uploadButton')}
          <CloudUpload className="ml-2 size-4" />
          <input type="file" multiple id="uploads" className="hidden" />
        </Label>
      </Button>
    </form>
  )
}
