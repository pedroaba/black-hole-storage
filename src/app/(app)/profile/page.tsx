import { Pen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

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
import { auth } from '@/lib/auth'
import { getInitialLettersFromUsername } from '@/utils/get-initial-letters-from-username'

import { ChangePasswordForm } from './change-password-form'

export default async function Profile() {
  const translations = await getTranslations('Profile')

  const session = await auth()
  const initialLetters = getInitialLettersFromUsername(
    session?.user?.name ?? undefined,
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="bg-muted/40 flex flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">{translations('title')}</h1>
        </div>
        <Tabs
          defaultValue="personal-information"
          className="mx-auto grid w-full max-w-6xl items-start gap-6 bg-transparent md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
        >
          <TabsList className="grid w-full gap-2 bg-transparent text-sm dark:bg-transparent">
            <TabsTrigger
              value="personal-information"
              className="w-full px-10 py-2 font-semibold text-zinc-700 hover:bg-zinc-300 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {translations('tabs.info.title')}
            </TabsTrigger>

            <TabsTrigger
              value="account"
              className="px-10 py-2 font-semibold text-zinc-700 hover:bg-zinc-300 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {translations('tabs.account.title')}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="personal-information"
            className="mt-0 space-y-4 overflow-y-auto"
          >
            <Card>
              <CardContent className="flex items-start justify-between p-6">
                <div>
                  <CardHeader className="p-0 text-lg">
                    {translations('tabs.info.cards.avatar.title')}
                  </CardHeader>
                  <CardDescription>
                    {translations('tabs.info.cards.avatar.description')}
                  </CardDescription>

                  <Button className="mt-4" variant="secondary">
                    {translations('tabs.info.cards.avatar.changeButton.text')}
                  </Button>
                </div>
                <Avatar className="size-16">
                  <AvatarImage src={session?.user?.image ?? '#'} />
                  <AvatarFallback className="font-mono text-xs font-bold uppercase">
                    {initialLetters}
                  </AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-between">
                  <CardHeader className="p-0 text-lg">
                    {translations('tabs.info.cards.info.title')}
                  </CardHeader>
                  <Button size="icon" variant="ghost">
                    <Pen className="size-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label>
                    {translations(
                      'tabs.info.cards.info.form.fields.name.label',
                    )}
                  </Label>
                  <Input
                    placeholder={translations(
                      'tabs.info.cards.info.form.fields.name.placeholder',
                    )}
                    disabled
                    value={session?.user?.name ?? ''}
                  />
                </div>

                <div className="mt-2 space-y-1">
                  <Label>
                    {translations(
                      'tabs.info.cards.info.form.fields.email.label',
                    )}
                  </Label>
                  <Input
                    placeholder={translations(
                      'tabs.info.cards.info.form.fields.email.placeholder',
                    )}
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

                <div className="flex w-full items-center justify-end">
                  <Button variant="destructive" className="mt-4">
                    Deletar Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
