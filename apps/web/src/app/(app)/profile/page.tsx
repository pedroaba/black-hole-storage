import { auth } from '@bhs/auth'
import { getInitialLettersOfUsername } from '@bhs/utils'
import { Pen } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ChangePasswordForm } from './change-password-form'

export const description =
  'A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.'

export default async function Profile() {
  const session = await auth()
  const initialLetters = getInitialLettersOfUsername(
    session?.user?.name ?? undefined,
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Perfil</h1>
        </div>
        <Tabs
          defaultValue="personal-information"
          className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] bg-transparent"
        >
          <TabsList className="grid w-full gap-2 text-sm bg-transparent dark:bg-transparent">
            <TabsTrigger
              value="personal-information"
              className="font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-900 w-full px-10 py-2"
            >
              Informações Pessoais
            </TabsTrigger>

            <TabsTrigger
              value="account"
              className="font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-900 px-10 py-2"
            >
              Conta
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="personal-information"
            className="space-y-4 overflow-y-auto mt-0"
          >
            <Card>
              <CardContent className="flex items-start p-6 justify-between">
                <div>
                  <CardHeader className="text-lg p-0">Avatar</CardHeader>
                  <CardDescription>
                    Por favor, utilize uma imagem de perfil com tamanho máximo
                    de 10 MB.
                  </CardDescription>

                  <Button className="mt-4" variant="secondary">
                    Alterar foto
                  </Button>
                </div>
                <Avatar className="size-16">
                  <AvatarImage src={session?.user?.image ?? '#'} />
                  <AvatarFallback className="uppercase text-xs font-bold font-mono">
                    {initialLetters}
                  </AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-between">
                  <CardHeader className="p-0 text-lg">Informações</CardHeader>
                  <Button size="icon" variant="ghost">
                    <Pen className="size-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label>Nome</Label>
                  <Input
                    placeholder="Nome do usuário"
                    disabled
                    value={session?.user?.name ?? ''}
                  />
                </div>

                <div className="space-y-1 mt-2">
                  <Label>E-mail</Label>
                  <Input
                    placeholder="E-mail do usuário"
                    disabled
                    type="email"
                    value={session?.user?.email ?? ''}
                  />
                </div>
              </CardContent>
            </Card>

            <ChangePasswordForm />
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-between">
                  <CardHeader className="p-0 text-lg">
                    Conta Black Hole
                  </CardHeader>
                </div>

                <CardDescription>
                  Ao deletar sua conta, todos os seus dados serão
                  permanentemente removidos, como se fossem sugados por um
                  buraco negro. Isso inclui arquivos, informações pessoais e
                  configurações, sem possibilidade de recuperação. Se você
                  deseja prosseguir com a exclusão, toque abaixo para confirmar
                  e deixar este universo.
                </CardDescription>

                <div className="flex w-full justify-end items-center">
                  <Button variant="destructive" className="mt-4">
                    Deletar Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
