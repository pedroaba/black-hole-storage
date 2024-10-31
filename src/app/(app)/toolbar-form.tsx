'use client'

import {
  CloudUpload,
  LayoutGrid,
  List,
  LoaderCircle,
  Search,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { useTranslations } from 'next-intl'
import { ChangeEvent } from 'react'
import { trpc } from '@/lib/trpc/react'
import { cn } from '@/lib/utils'
import { addUploadAtom, startFileUploadAtom } from '@/store/uploads'
import { useSetAtom } from 'jotai'

export function ToolbarForm() {
  const t = useTranslations('Home.toolbar')
  const { isPending, mutateAsync } = trpc.getSignedUrl.useMutation()
  const addUploadOnQueu = useSetAtom(addUploadAtom)
  const startUploadOfFile = useSetAtom(startFileUploadAtom)

  async function handleUploadFile(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const files = event.currentTarget.files
    if (!files || files?.length === 0) {
      return
    }

    const file = files[0]

    const { fileId, signedUrl } = await mutateAsync({
      filename: file.name,
      filetype: file.type,
      filesize: file.size,
    })

    const fileIdOnQueu = addUploadOnQueu(file, fileId)
    startUploadOfFile(fileIdOnQueu, signedUrl)
  }

  return (
    <form className="flex items-center gap-4">
      <div className="flex w-full items-center rounded-md border border-zinc-200 px-4 shadow-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-zinc-950 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-within:ring-zinc-300">
        <Search className="size-4" />
        <Input
          disabled={isPending}
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
        <Label
          htmlFor="uploads"
          className={cn(
            'h-12 cursor-pointer',
            isPending && 'w-32 cursor-not-allowed opacity-60',
          )}
        >
          {isPending ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <>
              {t('uploadButton')}
              <CloudUpload className="ml-2 size-4" />
              <input
                type="file"
                multiple
                id="uploads"
                className="hidden"
                disabled={isPending}
                onChange={handleUploadFile}
              />
            </>
          )}
        </Label>
      </Button>
    </form>
  )
}
