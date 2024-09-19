import { auth } from '@bhs/auth'
import { getInitialLettersOfUsername } from '@bhs/utils'
import { Pen } from 'lucide-react'
import Link from 'next/link'

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
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              Informações Pessoais
            </Link>
          </nav>

          <div className="space-y-4 overflow-y-auto max-h-screen">
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

            <Card>
              <CardContent className="p-6 mb-4">
                <div className="mb-4 flex justify-between items-center">
                  <CardHeader className="p-0 text-lg">Senha</CardHeader>
                  <Button variant="secondary">Alterar senha</Button>
                </div>

                <div className="space-y-1">
                  <Label>Nova senha</Label>
                  <Input placeholder="nova senha" disabled type="password" />
                </div>

                <div className="space-y-1 mt-2">
                  <Label>Confirme sua senha</Label>
                  <Input
                    placeholder="confirmPassword"
                    disabled
                    type="password"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
