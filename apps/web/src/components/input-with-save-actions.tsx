import { Check, PenLine, X } from 'lucide-react'
import { type ComponentProps, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

type InputWithSaveActionsProps = Omit<ComponentProps<'input'>, 'disabled'> & {
  label?: string
  value?: string
  onInputValueSubmit?: (value: string) => Promise<void>
}

export function InputWithSaveActions({
  name,
  id,
  label,
  value,
  onInputValueSubmit = async (_) => console.log(_),
  ...inputRest
}: InputWithSaveActionsProps) {
  const [isInputDisabled, setIsInputDisabled] = useState(true)
  const [inputValue, setInputValue] = useState<string>(value ?? '')

  function handleToggleInputDisabled() {
    if (!isInputDisabled) {
      setInputValue(value ?? '')
    }

    setIsInputDisabled((state) => !state)
  }

  async function handleSubmitInputValue() {
    await onInputValueSubmit(inputValue)

    setIsInputDisabled(true)
  }

  return (
    <div className="w-full space-y-1">
      {label && (
        <Label className="text-lg" htmlFor={id}>
          {label}
        </Label>
      )}
      <div className="flex w-full gap-2">
        <Input
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
          id={id}
          name={name}
          {...inputRest}
          disabled={isInputDisabled}
        />
        <Button
          variant="outline"
          size="icon"
          className=""
          onClick={handleToggleInputDisabled}
        >
          {isInputDisabled ? (
            <PenLine className="size-4" />
          ) : (
            <X className="size-4" />
          )}
        </Button>
        {!isInputDisabled && (
          <Button
            variant="outline"
            size="icon"
            className=""
            onClick={handleSubmitInputValue}
          >
            <Check className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
