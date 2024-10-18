import { CloudUpload } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { ToolbarForm } from './toolbar-form'

export const metadata: Metadata = {
  title: 'File List',
}

export default async function Home() {
  const t = await getTranslations('Home')

  return (
    <div className="flex h-full flex-col p-8">
      <ToolbarForm />

      <div className="flex w-full flex-1 flex-col items-center justify-center text-zinc-400 dark:text-zinc-700">
        <CloudUpload className="mb-4 size-16" />
        <h2 className="mb-2 text-2xl font-semibold">
          {t('emptyFileList.title')}
        </h2>
        <p className="mb-6 max-w-md text-center">
          {t('emptyFileList.description')}
        </p>
        <Button
          asChild
          className="cursor-pointer text-zinc-400 dark:text-zinc-400"
          variant="secondary"
        >
          <Label htmlFor="uploads">
            {t('emptyFileList.uploadButton.text')}
          </Label>
        </Button>
      </div>
    </div>
  )
}
