import { Draft, enableMapSet } from 'immer'
import { atomWithImmer } from 'jotai-immer'
import { atom } from 'jotai'
import { selectAtom } from 'jotai/utils'

import axios from 'axios'

enableMapSet()

interface IFile {
  file: Blob
  filename: string
  filesize: number
  filetype: string
  progress: number
  url?: string
  previewUrl?: string
  isRunning: boolean
  failed: boolean
}

type Files = Map<string, IFile>

export const uploadQueuAtom = atomWithImmer<Files>(new Map())
export const amountOfUploadsAtom = atom((get) => get(uploadQueuAtom).size)

function getUploadById(uploadId: string) {
  return selectAtom(uploadQueuAtom, (state) => {
    const upload = state.get(uploadId)

    if (!upload) {
      throw new Error(`Upload with ID ${uploadId} not found.`)
    }

    return upload
  })
}

function createUpdateUploadDraft(uploadId: string, update: Partial<IFile>) {
  return (draft: Draft<Files>) => {
    const upload = draft.get(uploadId)

    if (!upload) {
      throw new Error(`Upload with ID ${uploadId} not found.`)
    }

    Object.assign(upload, update)
  }
}

export const addUploadAtom = atom(
  null,
  (_, set, file: File, fileId: string) => {
    set(uploadQueuAtom, (draft) =>
      draft.set(fileId, {
        file,
        filename: file.name,
        previewUrl: URL.createObjectURL(file),
        filesize: file.size,
        filetype: file.type,
        progress: 0,
        isRunning: false,
        failed: false,
      }),
    )

    return fileId
  },
)

export const startFileUploadAtom = atom(
  null,
  async (get, set, uploadId: string, signedUrl: string) => {
    set(uploadQueuAtom, (draft) => {
      const fileUpload = draft.get(uploadId)

      if (!fileUpload) return

      fileUpload.isRunning = true
      fileUpload.progress = 0
      fileUpload.failed = false
    })

    const upload = get(getUploadById(uploadId))
    const abortController = new AbortController()

    try {
      await axios.put(signedUrl, upload.file, {
        signal: abortController.signal,
        headers: {
          'Content-Type': upload.file.type,
          'Access-Control-Allow-Origin': '*',
          Accept: '*',
        },
        onUploadProgress(progressEvent) {
          const progress = progressEvent.progress
            ? Math.round(progressEvent.progress * 100)
            : 0

          set(uploadQueuAtom, (draft) => {
            const fileUpload = draft.get(uploadId)

            if (!fileUpload) return

            fileUpload.progress = progress
            fileUpload.isRunning = progress < 100

            console.log(`File Progress: ${progress}%`)
          })
        },
      })
    } catch {
      set(uploadQueuAtom, (draft) => {
        const fileUpload = draft.get(uploadId)
        if (!fileUpload) return
        fileUpload.isRunning = false
        fileUpload.failed = true
      })
    }
  },
)
